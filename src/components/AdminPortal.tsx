"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { ancestorIds, buildAdminTree, findAdminNode, parentAdminId, type AdminNode } from "@/lib/admin-tree";
import {
  loginAdmin,
  logoutAdmin,
  probeSession,
  readLocalContent,
  saveAdminContent,
  type AdminMode,
} from "@/lib/admin-client";
import { pick, ui } from "@/lib/i18n";
import { newId, slugify, today } from "@/lib/markdown";
import { allTopicRows } from "@/lib/query";
import { withBase } from "@/lib/site";
import { bookGenres, projectAreas, projectKinds } from "@/lib/taxonomy";
import type {
  BookReview,
  CustomTopic,
  LocaleText,
  Note,
  NoteSessionSlug,
  ProjectItem,
  Reflection,
  SiteContent,
} from "@/lib/types";

const emptyText = (): LocaleText => ({ zh: "", en: "" });

const initialExpanded = new Set([
  "root",
  "projects",
  "notes",
  "books",
  "reflections",
  "projects/special-needs",
  "projects/mental-health",
  "notes/clinical",
  "notes/clinical/interventions",
]);

export function AdminPortal() {
  const locale = useLocale();
  const t = ui[locale];
  const initial = useContent();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [mode, setMode] = useState<AdminMode>("local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<SiteContent>(() => readLocalContent() ?? initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [selectedId, setSelectedId] = useState("root");
  const [expanded, setExpanded] = useState<Set<string>>(initialExpanded);
  const [folderForm, setFolderForm] = useState<AdminNode | null>(null);

  const tree = useMemo(() => buildAdminTree(draft, locale), [draft, locale]);
  const selected = findAdminNode(tree, selectedId) ?? tree;
  const trailIds = ancestorIds(tree, selected.id) ?? ["root"];
  const trail = trailIds.map((id) => findAdminNode(tree, id)).filter((node): node is AdminNode => Boolean(node));

  useEffect(() => {
    void probeSession().then(({ authed: ok, mode: nextMode }) => {
      setAuthed(ok);
      setMode(nextMode);
    });
  }, []);

  function select(id: string, extra: string[] = []) {
    setSelectedId(id);
    const ids = ancestorIds(tree, id) ?? [];
    setExpanded((prev) => new Set([...prev, ...ids, ...extra, id]));
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const result = await loginAdmin(password);
    if (!result.ok) {
      setError(locale === "en" ? "Incorrect password." : "密碼不正確。");
      return;
    }
    setMode(result.mode);
    setAuthed(true);
  }

  async function save(next = draft) {
    setStatus("saving");
    try {
      const saved = await saveAdminContent(next, mode);
      setDraft(saved);
      setStatus("saved");
      router.refresh();
      setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("error");
    }
  }

  async function logout() {
    await logoutAdmin(mode);
    setAuthed(false);
  }

  function addPage(folder: AdminNode) {
    if (folder.folderType === "project-kind" && folder.allocation?.area && folder.allocation.kind) {
      const next: ProjectItem = {
        id: newId(),
        area: folder.allocation.area,
        kind: folder.allocation.kind,
        slug: `project-${Date.now().toString(36)}`,
        title: emptyText(),
        summary: emptyText(),
        body: emptyText(),
        links: [],
        updatedAt: today(),
      };
      setDraft({ ...draft, projects: [next, ...draft.projects] });
      select(`file/project/${next.id}`, [folder.id]);
      return;
    }
    if (folder.folderType === "note-topic" && folder.allocation?.session && folder.allocation.topic) {
      const next: Note = {
        id: newId(),
        session: folder.allocation.session,
        topic: folder.allocation.topic,
        slug: `note-${Date.now().toString(36)}`,
        title: emptyText(),
        summary: emptyText(),
        body: emptyText(),
        tags: [],
        updatedAt: today(),
      };
      setDraft({ ...draft, notes: [next, ...draft.notes] });
      select(`file/note/${next.id}`, [folder.id]);
      return;
    }
    if (folder.folderType === "book-genre" && folder.allocation?.genre) {
      const next: BookReview = {
        id: newId(),
        genre: folder.allocation.genre,
        slug: `book-${Date.now().toString(36)}`,
        bookTitle: "",
        author: "",
        year: "",
        title: emptyText(),
        summary: emptyText(),
        body: emptyText(),
        rating: 4,
        updatedAt: today(),
      };
      setDraft({ ...draft, books: [next, ...draft.books] });
      select(`file/book/${next.id}`, [folder.id]);
      return;
    }
    if (folder.folderType === "reflections") {
      const next: Reflection = {
        id: newId(),
        slug: `reflection-${Date.now().toString(36)}`,
        date: today(),
        title: emptyText(),
        excerpt: emptyText(),
        body: emptyText(),
      };
      setDraft({ ...draft, reflections: [next, ...draft.reflections] });
      select(`file/reflection/${next.id}`, [folder.id]);
    }
  }

  function createFolder(parent: AdminNode, payload: { title: LocaleText; summary: LocaleText; slug: string }) {
    const session = parent.allocation?.session;
    if (!session) return;
    const slug = slugify(payload.slug || payload.title.en || payload.title.zh);
    if (!slug) return;
    const parentPath = parent.folderType === "note-topic" ? parent.allocation?.topic : undefined;
    const topic: CustomTopic = {
      session,
      slug,
      parent: parentPath,
      title: payload.title,
      summary: payload.summary,
    };
    const path = parentPath ? `${parentPath}/${slug}` : slug;
    setDraft({ ...draft, customTopics: [...draft.customTopics, topic] });
    setFolderForm(null);
    select(`notes/${session}/${path}`, [parent.id]);
  }

  function deleteCustomFolder(node: AdminNode) {
    const session = node.allocation?.session;
    const path = node.allocation?.topic;
    if (!session || !path || !node.isCustom) return;
    const hasNotes = draft.notes.some(
      (note) => note.session === session && (note.topic === path || note.topic.startsWith(`${path}/`)),
    );
    const hasNested = draft.customTopics.some(
      (topic) => topic.session === session && (topic.parent === path || (topic.parent ?? "").startsWith(`${path}/`)),
    );
    if (hasNotes || hasNested) {
      window.alert(t.cannotDeleteFolder);
      return;
    }
    const parts = path.split("/");
    const slug = parts[parts.length - 1];
    const parentPath = parts.length > 1 ? parts.slice(0, -1).join("/") : "";
    setDraft({
      ...draft,
      customTopics: draft.customTopics.filter(
        (topic) => !(topic.session === session && topic.slug === slug && (topic.parent ?? "") === parentPath),
      ),
    });
    select(parentAdminId(tree, node.id) ?? `notes/${session}`);
  }

  function afterDelete(fileId: string) {
    select(parentAdminId(tree, fileId) ?? "root");
  }

  if (authed === null) {
    return <div className="mx-auto max-w-lg px-4 py-24 text-sm text-ink-soft">…</div>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-24">
        <h1 className="font-serif text-3xl">{t.login}</h1>
        <p className="mt-2 text-sm text-ink-soft">
          {locale === "en"
            ? "Password is ADMIN_KEY. Default: MindNoteStudio"
            : "密碼為 ADMIN_KEY。預設：MindNoteStudio"}
        </p>
        <form className="mt-6 grid gap-3" onSubmit={(event) => void login(event)}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t.password}
            className="rounded-xl border border-rule bg-paper-2 px-3 py-2"
          />
          <button type="submit" className="rounded-full bg-night px-5 py-2 text-sm text-paper-2">
            {t.login}
          </button>
          {error ? <p className="text-sm text-rose">{error}</p> : null}
        </form>
      </div>
    );
  }

  const unread = draft.messages.filter((item) => !item.read).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl">{t.admin}</h1>
          <p className="mt-1 text-sm text-ink-soft">{t.adminTreeHelp}</p>
          {mode === "local" ? <p className="mt-1 text-xs text-copper">{t.adminLocalMode}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-soft">
            {status === "saving" ? t.saving : status === "saved" ? t.saved : status === "error" ? t.contactError : ""}
          </span>
          <button type="button" onClick={() => void save()} className="rounded-full bg-night px-4 py-1.5 text-sm text-paper-2">
            {t.save}
          </button>
          <button type="button" onClick={() => void logout()} className="rounded-full border border-rule px-4 py-1.5 text-sm">
            {t.logout}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="h-fit rounded-2xl border border-rule bg-paper-2 p-3 lg:sticky lg:top-4">
          <p className="px-2 pb-2 text-xs font-medium tracking-wide text-ink-soft uppercase">{t.adminFolders}</p>
          <div className="max-h-[70vh] overflow-auto">
            <button
              type="button"
              onClick={() => select("root")}
              className={`mb-1 flex w-full rounded-lg px-2 py-1.5 text-left text-sm ${
                selected.id === "root" ? "bg-paper" : "hover:bg-paper/70"
              }`}
            >
              {tree.label}
            </button>
            <TreeRows
              nodes={tree.children}
              depth={0}
              selectedId={selected.id}
              expanded={expanded}
              unread={unread}
              onSelect={select}
              onToggle={toggle}
            />
          </div>
        </aside>

        <section className="min-w-0">
          <nav className="flex flex-wrap items-center gap-1 text-sm text-ink-soft">
            {trail.map((node, index) => (
              <span key={node.id} className="flex items-center gap-1">
                {index > 0 ? <span>/</span> : null}
                <button type="button" className={node.id === selected.id ? "text-ink" : "hover:text-ink"} onClick={() => select(node.id)}>
                  {node.label}
                </button>
              </span>
            ))}
          </nav>
          {selected.publicPath ? (
            <p className="mt-2 text-xs text-ink-soft">
              {t.publicPath}:{" "}
              <a className="text-teal" href={withBase(selected.publicPath)} target="_blank" rel="noreferrer">
                {selected.publicPath}
              </a>
            </p>
          ) : null}

          <div className="mt-5">
            {selected.kind === "file" ? (
              <FilePane
                node={selected}
                draft={draft}
                setDraft={setDraft}
                onDeleted={() => afterDelete(selected.id)}
              />
            ) : (
              <FolderPane
                node={selected}
                draft={draft}
                setDraft={setDraft}
                save={() => void save()}
                onOpen={select}
                onAddPage={() => addPage(selected)}
                onAddFolder={() => setFolderForm(selected)}
                onDeleteFolder={() => deleteCustomFolder(selected)}
              />
            )}
          </div>
        </section>
      </div>

      {folderForm ? (
        <FolderDialog parent={folderForm} onClose={() => setFolderForm(null)} onCreate={(payload) => createFolder(folderForm, payload)} />
      ) : null}
    </div>
  );
}

function TreeRows({
  nodes,
  depth,
  selectedId,
  expanded,
  unread,
  onSelect,
  onToggle,
}: {
  nodes: AdminNode[];
  depth: number;
  selectedId: string;
  expanded: Set<string>;
  unread: number;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <>
      {nodes.map((node) => {
        const open = expanded.has(node.id);
        const badge = node.id === "inbox" ? unread : node.kind === "folder" ? node.count : 0;
        return (
          <div key={node.id}>
            <button
              type="button"
              onClick={() => onSelect(node.id)}
              className={`flex w-full items-center gap-1 rounded-lg py-1 pr-2 text-left text-sm ${
                selectedId === node.id ? "bg-paper" : "hover:bg-paper/70"
              }`}
              style={{ paddingLeft: 6 + depth * 12 }}
            >
              {node.kind === "folder" && node.children.length > 0 ? (
                <span
                  className="inline-flex w-4 shrink-0 justify-center text-[10px] text-ink-soft"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggle(node.id);
                  }}
                >
                  {open ? "▾" : "▸"}
                </span>
              ) : (
                <span className="inline-flex w-4 shrink-0 justify-center text-[10px] text-ink-soft">
                  {node.kind === "folder" ? "·" : ""}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate">{node.label}</span>
              {badge ? <span className="shrink-0 text-[10px] text-ink-soft">{badge}</span> : null}
            </button>
            {node.kind === "folder" && open ? (
              <TreeRows
                nodes={node.children}
                depth={depth + 1}
                selectedId={selectedId}
                expanded={expanded}
                unread={unread}
                onSelect={onSelect}
                onToggle={onToggle}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
}

function FolderPane({
  node,
  draft,
  setDraft,
  save,
  onOpen,
  onAddPage,
  onAddFolder,
  onDeleteFolder,
}: {
  node: AdminNode;
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
  save: () => void;
  onOpen: (id: string) => void;
  onAddPage: () => void;
  onAddFolder: () => void;
  onDeleteFolder: () => void;
}) {
  const locale = useLocale();
  const t = ui[locale];

  if (node.folderType === "root") return <Overview draft={draft} />;
  if (node.folderType === "about") return <ProfileEditor draft={draft} setDraft={setDraft} />;
  if (node.folderType === "contact") return <ContactEditor draft={draft} setDraft={setDraft} />;
  if (node.folderType === "inbox") return <MessageInbox draft={draft} setDraft={setDraft} save={save} />;
  if (node.folderType === "backup") return <BackupPanel draft={draft} setDraft={setDraft} />;

  const folders = node.children.filter((child) => child.kind === "folder");
  const files = node.children.filter((child) => child.kind === "file");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {node.canAddPage ? (
          <button type="button" onClick={onAddPage} className="rounded-full bg-night px-4 py-1.5 text-sm text-paper-2">
            {t.newPage}
          </button>
        ) : null}
        {node.canAddFolder ? (
          <button type="button" onClick={onAddFolder} className="rounded-full border border-rule px-4 py-1.5 text-sm">
            {t.newFolder}
          </button>
        ) : null}
        {node.isCustom ? (
          <button type="button" onClick={onDeleteFolder} className="text-sm text-rose">
            {t.deleteFolder}
          </button>
        ) : null}
      </div>

      {folders.length ? (
        <div className="mt-6">
          <p className="text-xs text-ink-soft">{t.subfolders}</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                type="button"
                onClick={() => onOpen(folder.id)}
                className="rounded-2xl border border-rule bg-paper-2 px-4 py-3 text-left hover:border-night/30"
              >
                <p className="font-medium">{folder.label}</p>
                <p className="mt-1 text-xs text-ink-soft">
                  {folder.count} · {t.openFolder}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <p className="text-xs text-ink-soft">{t.files}</p>
        {files.length ? (
          <div className="mt-2 grid gap-1">
            {files.map((file) => (
              <button
                key={file.id}
                type="button"
                onClick={() => onOpen(file.id)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-paper-2"
              >
                <span className="truncate">{file.label}</span>
                {file.publicPath ? <span className="ml-3 shrink-0 text-xs text-ink-soft">{file.publicPath}</span> : null}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-ink-soft">{t.folderEmpty}</p>
        )}
      </div>
    </div>
  );
}

function FilePane({
  node,
  draft,
  setDraft,
  onDeleted,
}: {
  node: AdminNode;
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
  onDeleted: () => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div>
      <p className="mb-4 text-xs text-ink-soft">{t.allocationHint}</p>
      {node.fileType === "project" && node.itemId ? (
        <ProjectForm
          draft={draft}
          setDraft={setDraft}
          id={node.itemId}
          onDeleted={onDeleted}
        />
      ) : null}
      {node.fileType === "note" && node.itemId ? (
        <NoteForm draft={draft} setDraft={setDraft} id={node.itemId} onDeleted={onDeleted} />
      ) : null}
      {node.fileType === "book" && node.itemId ? (
        <BookForm draft={draft} setDraft={setDraft} id={node.itemId} onDeleted={onDeleted} />
      ) : null}
      {node.fileType === "reflection" && node.itemId ? (
        <ReflectionForm draft={draft} setDraft={setDraft} id={node.itemId} onDeleted={onDeleted} />
      ) : null}
    </div>
  );
}

function FolderDialog({
  parent,
  onClose,
  onCreate,
}: {
  parent: AdminNode;
  onClose: () => void;
  onCreate: (payload: { title: LocaleText; summary: LocaleText; slug: string }) => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const [title, setTitle] = useState<LocaleText>(emptyText());
  const [summary, setSummary] = useState<LocaleText>(emptyText());
  const [slug, setSlug] = useState("");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-night/40 px-4">
      <form
        className="w-full max-w-lg rounded-2xl bg-paper p-5 shadow-lg"
        onSubmit={(event) => {
          event.preventDefault();
          onCreate({ title, summary, slug });
        }}
      >
        <h2 className="font-serif text-2xl">{t.newFolder}</h2>
        <p className="mt-1 text-sm text-ink-soft">
          {parent.label}
          {parent.publicPath ? ` · ${parent.publicPath}` : ""}
        </p>
        <div className="mt-4 grid gap-3">
          <Field label={t.folderTitleZh}>
            <input
              value={title.zh}
              onChange={(event) => setTitle({ ...title, zh: event.target.value })}
              className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
            />
          </Field>
          <Field label={t.folderTitleEn}>
            <input
              value={title.en}
              onChange={(event) => {
                const en = event.target.value;
                setTitle({ ...title, en });
                if (!slug) setSlug(slugify(en));
              }}
              className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
            />
          </Field>
          <Field label={t.folderSlug}>
            <input
              value={slug}
              onChange={(event) => setSlug(slugify(event.target.value))}
              className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
            />
          </Field>
          <Bilingual label={t.folderSummary} value={summary} onChange={setSummary} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-rule px-4 py-1.5 text-sm">
            {t.cancel}
          </button>
          <button type="submit" className="rounded-full bg-night px-4 py-1.5 text-sm text-paper-2">
            {t.createFolder}
          </button>
        </div>
      </form>
    </div>
  );
}

function Overview({ draft }: { draft: SiteContent }) {
  const locale = useLocale();
  const t = ui[locale];
  const stats = [
    [t.projects, draft.projects.length],
    [t.notes, draft.notes.length],
    [t.books, draft.books.length],
    [t.reflection, draft.reflections.length],
    [t.unread, draft.messages.filter((item) => !item.read).length],
  ];
  return (
    <div>
      <p className="text-sm text-ink-soft">
        {t.lastSaved}: {draft.updatedAt} · v{draft.version}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(([label, value]) => (
          <div key={String(label)} className="rounded-2xl border border-rule bg-paper-2 px-4 py-5">
            <p className="text-xs text-ink-soft">{label}</p>
            <p className="mt-2 font-serif text-3xl">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">{t.adminTreeHelp}</p>
    </div>
  );
}

function ProfileEditor({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const profile = draft.profile;
  function patch(partial: Partial<typeof profile>) {
    setDraft({ ...draft, profile: { ...profile, ...partial } });
  }
  return (
    <div className="grid gap-4">
      <Field label="Site name">
        <input
          value={profile.siteName}
          onChange={(event) => patch({ siteName: event.target.value })}
          className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
        />
      </Field>
      <Bilingual label="Person name" value={profile.personName} onChange={(personName) => patch({ personName })} />
      <Bilingual label="Tagline" value={profile.tagline} onChange={(tagline) => patch({ tagline })} />
      <Bilingual label="Bio" value={profile.bio} onChange={(bio) => patch({ bio })} />
      <Bilingual label="About (markdown)" value={profile.about} onChange={(about) => patch({ about })} tall />
    </div>
  );
}

function ContactEditor({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const profile = draft.profile;
  function patch(partial: Partial<typeof profile>) {
    setDraft({ ...draft, profile: { ...profile, ...partial } });
  }
  return (
    <div className="grid gap-4">
      <Field label="Email">
        <input
          value={profile.email}
          onChange={(event) => patch({ email: event.target.value })}
          className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
        />
      </Field>
      <Bilingual label="Location" value={profile.location} onChange={(location) => patch({ location })} />
      <Bilingual label="Contact note" value={profile.contactNote} onChange={(contactNote) => patch({ contactNote })} />
    </div>
  );
}

function ProjectForm({
  draft,
  setDraft,
  id,
  onDeleted,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
  id: string;
  onDeleted: () => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const item = draft.projects.find((project) => project.id === id);
  if (!item) return <p className="text-sm text-ink-soft">{t.emptySection}</p>;

  function upsert(next: ProjectItem) {
    setDraft({
      ...draft,
      projects: draft.projects.map((project) => (project.id === next.id ? next : project)),
    });
  }

  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Select
          label="Area"
          value={item.area}
          onChange={(area) => upsert({ ...item, area: area as ProjectItem["area"] })}
          options={projectAreas.map((area) => ({ value: area.slug, label: pick(area.title, locale) }))}
        />
        <Select
          label="Kind"
          value={item.kind}
          onChange={(kind) => upsert({ ...item, kind: kind as ProjectItem["kind"] })}
          options={projectKinds.map((kind) => ({ value: kind.slug, label: pick(kind.title, locale) }))}
        />
      </div>
      <Field label="Slug">
        <input
          value={item.slug}
          onChange={(event) => upsert({ ...item, slug: slugify(event.target.value) })}
          className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
        />
      </Field>
      <Bilingual label="Title" value={item.title} onChange={(title) => upsert({ ...item, title })} />
      <Bilingual label="Summary" value={item.summary} onChange={(summary) => upsert({ ...item, summary })} />
      <Bilingual label="Body (markdown)" value={item.body} onChange={(body) => upsert({ ...item, body })} tall />
      <button
        type="button"
        className="w-fit text-sm text-rose"
        onClick={() => {
          setDraft({ ...draft, projects: draft.projects.filter((project) => project.id !== item.id) });
          onDeleted();
        }}
      >
        {t.delete}
      </button>
    </div>
  );
}

function NoteForm({
  draft,
  setDraft,
  id,
  onDeleted,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
  id: string;
  onDeleted: () => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const item = draft.notes.find((note) => note.id === id);
  const topicOptions = useMemo(
    () =>
      allTopicRows(draft).map((row) => ({
        value: `${row.session.slug}::${row.path}`,
        label: `${pick(row.session.title, locale)} / ${pick(row.topic.title, locale)}`,
      })),
    [draft, locale],
  );
  if (!item) return <p className="text-sm text-ink-soft">{t.emptySection}</p>;

  function upsert(next: Note) {
    setDraft({
      ...draft,
      notes: draft.notes.map((note) => (note.id === next.id ? next : note)),
    });
  }

  return (
    <div className="grid gap-3">
      <Select
        label="Topic"
        value={`${item.session}::${item.topic}`}
        onChange={(value) => {
          const [session, topic] = value.split("::");
          upsert({ ...item, session: session as NoteSessionSlug, topic });
        }}
        options={topicOptions}
      />
      <Field label="Slug">
        <input
          value={item.slug}
          onChange={(event) => upsert({ ...item, slug: slugify(event.target.value) })}
          className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
        />
      </Field>
      <Field label="Tags (comma)">
        <input
          value={item.tags.join(", ")}
          onChange={(event) =>
            upsert({
              ...item,
              tags: event.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            })
          }
          className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
        />
      </Field>
      <Bilingual label="Title" value={item.title} onChange={(title) => upsert({ ...item, title })} />
      <Bilingual label="Summary" value={item.summary} onChange={(summary) => upsert({ ...item, summary })} />
      <Bilingual label="Body (markdown)" value={item.body} onChange={(body) => upsert({ ...item, body })} tall />
      <button
        type="button"
        className="w-fit text-sm text-rose"
        onClick={() => {
          setDraft({ ...draft, notes: draft.notes.filter((note) => note.id !== item.id) });
          onDeleted();
        }}
      >
        {t.delete}
      </button>
    </div>
  );
}

function BookForm({
  draft,
  setDraft,
  id,
  onDeleted,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
  id: string;
  onDeleted: () => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const item = draft.books.find((book) => book.id === id);
  if (!item) return <p className="text-sm text-ink-soft">{t.emptySection}</p>;

  function upsert(next: BookReview) {
    setDraft({
      ...draft,
      books: draft.books.map((book) => (book.id === next.id ? next : book)),
    });
  }

  return (
    <div className="grid gap-3">
      <Select
        label="Genre"
        value={item.genre}
        onChange={(genre) => upsert({ ...item, genre: genre as BookReview["genre"] })}
        options={bookGenres.map((genre) => ({ value: genre.slug, label: pick(genre.title, locale) }))}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Book title">
          <input
            value={item.bookTitle}
            onChange={(event) => upsert({ ...item, bookTitle: event.target.value })}
            className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
          />
        </Field>
        <Field label="Author">
          <input
            value={item.author}
            onChange={(event) => upsert({ ...item, author: event.target.value })}
            className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
          />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Year">
          <input
            value={item.year ?? ""}
            onChange={(event) => upsert({ ...item, year: event.target.value })}
            className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
          />
        </Field>
        <Field label="Rating 1–5">
          <input
            type="number"
            min={1}
            max={5}
            value={item.rating ?? 0}
            onChange={(event) => upsert({ ...item, rating: Number(event.target.value) })}
            className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
          />
        </Field>
      </div>
      <Field label="Slug">
        <input
          value={item.slug}
          onChange={(event) => upsert({ ...item, slug: slugify(event.target.value) })}
          className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
        />
      </Field>
      <Bilingual label="Review title" value={item.title} onChange={(title) => upsert({ ...item, title })} />
      <Bilingual label="Summary" value={item.summary} onChange={(summary) => upsert({ ...item, summary })} />
      <Bilingual label="Body (markdown)" value={item.body} onChange={(body) => upsert({ ...item, body })} tall />
      <button
        type="button"
        className="w-fit text-sm text-rose"
        onClick={() => {
          setDraft({ ...draft, books: draft.books.filter((book) => book.id !== item.id) });
          onDeleted();
        }}
      >
        {t.delete}
      </button>
    </div>
  );
}

function ReflectionForm({
  draft,
  setDraft,
  id,
  onDeleted,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
  id: string;
  onDeleted: () => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const item = draft.reflections.find((row) => row.id === id);
  if (!item) return <p className="text-sm text-ink-soft">{t.emptySection}</p>;

  function upsert(next: Reflection) {
    setDraft({
      ...draft,
      reflections: draft.reflections.map((row) => (row.id === next.id ? next : row)),
    });
  }

  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Date">
          <input
            type="date"
            value={item.date}
            onChange={(event) => upsert({ ...item, date: event.target.value })}
            className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
          />
        </Field>
        <Field label="Slug">
          <input
            value={item.slug}
            onChange={(event) => upsert({ ...item, slug: slugify(event.target.value) })}
            className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
          />
        </Field>
      </div>
      <Bilingual label="Title" value={item.title} onChange={(title) => upsert({ ...item, title })} />
      <Bilingual label="Excerpt (few sentences)" value={item.excerpt} onChange={(excerpt) => upsert({ ...item, excerpt })} />
      <Bilingual label="Longer body (optional markdown)" value={item.body} onChange={(body) => upsert({ ...item, body })} tall />
      <button
        type="button"
        className="w-fit text-sm text-rose"
        onClick={() => {
          setDraft({ ...draft, reflections: draft.reflections.filter((row) => row.id !== item.id) });
          onDeleted();
        }}
      >
        {t.delete}
      </button>
    </div>
  );
}

function MessageInbox({
  draft,
  setDraft,
  save,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
  save: () => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  if (!draft.messages.length) {
    return <p className="text-sm text-ink-soft">{t.emptySection}</p>;
  }
  return (
    <div className="grid gap-3">
      {draft.messages.map((message) => (
        <article key={message.id} className="rounded-2xl border border-rule bg-paper-2 px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">
              {message.name} · {message.email}
            </p>
            <p className="text-xs text-ink-soft">{message.createdAt}</p>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{message.message}</p>
          <div className="mt-3 flex gap-3 text-sm">
            {!message.read ? (
              <button
                type="button"
                className="text-teal"
                onClick={() => {
                  setDraft({
                    ...draft,
                    messages: draft.messages.map((row) => (row.id === message.id ? { ...row, read: true } : row)),
                  });
                  save();
                }}
              >
                {t.markRead}
              </button>
            ) : null}
            <button
              type="button"
              className="text-rose"
              onClick={() => {
                setDraft({ ...draft, messages: draft.messages.filter((row) => row.id !== message.id) });
              }}
            >
              {t.delete}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function BackupPanel({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const [raw, setRaw] = useState(JSON.stringify(draft, null, 2));
  return (
    <div className="grid gap-3">
      <p className="text-sm text-ink-soft">
        {locale === "en"
          ? "Export for git versioning, or paste JSON to import."
          : "可匯出做 Git 版本控管，或貼上 JSON 匯入。"}
      </p>
      <textarea
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        rows={18}
        className="rounded-2xl border border-rule bg-paper-2 px-3 py-2 font-mono text-xs"
      />
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-full border border-rule px-4 py-1.5 text-sm"
          onClick={() => {
            const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "mind-note-content.json";
            anchor.click();
            URL.revokeObjectURL(url);
          }}
        >
          {t.exportJson}
        </button>
        <button
          type="button"
          className="rounded-full bg-night px-4 py-1.5 text-sm text-paper-2"
          onClick={() => {
            try {
              const parsed = JSON.parse(raw) as SiteContent;
              setDraft(parsed);
            } catch {
              alert("Invalid JSON");
            }
          }}
        >
          {t.importJson}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function Bilingual({
  label,
  value,
  onChange,
  tall,
}: {
  label: string;
  value: LocaleText;
  onChange: (value: LocaleText) => void;
  tall?: boolean;
}) {
  const cls = `w-full rounded-xl border border-rule bg-paper-2 px-3 py-2 ${tall ? "min-h-40" : ""}`;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label={`${label} · 中`}>
        {tall ? (
          <textarea className={cls} value={value.zh} onChange={(event) => onChange({ ...value, zh: event.target.value })} />
        ) : (
          <textarea className={cls} rows={3} value={value.zh} onChange={(event) => onChange({ ...value, zh: event.target.value })} />
        )}
      </Field>
      <Field label={`${label} · EN`}>
        {tall ? (
          <textarea className={cls} value={value.en} onChange={(event) => onChange({ ...value, en: event.target.value })} />
        ) : (
          <textarea className={cls} rows={3} value={value.en} onChange={(event) => onChange({ ...value, en: event.target.value })} />
        )}
      </Field>
    </div>
  );
}
