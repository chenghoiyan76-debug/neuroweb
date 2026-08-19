"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { pick, ui } from "@/lib/i18n";
import { newId, slugify, today } from "@/lib/markdown";
import { allTopicRows } from "@/lib/query";
import { bookGenres, projectAreas, projectKinds } from "@/lib/taxonomy";
import type {
  BookReview,
  LocaleText,
  Note,
  NoteSessionSlug,
  ProjectItem,
  Reflection,
  SiteContent,
} from "@/lib/types";

type Tab = "overview" | "profile" | "projects" | "notes" | "books" | "reflections" | "messages" | "backup";

const emptyText = (): LocaleText => ({ zh: "", en: "" });

export function AdminPortal() {
  const locale = useLocale();
  const t = ui[locale];
  const initial = useContent();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [draft, setDraft] = useState<SiteContent>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { ok?: boolean }) => setAuthed(Boolean(data.ok)))
      .catch(() => setAuthed(false));
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setError(locale === "en" ? "Incorrect password." : "密碼不正確。");
      return;
    }
    setAuthed(true);
  }

  async function save(next = draft) {
    setStatus("saving");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    const saved = (await response.json()) as SiteContent;
    setDraft(saved);
    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 1600);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
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
            ? "Password is ADMIN_KEY. Local default: MindNoteStudio"
            : "密碼為 ADMIN_KEY。本機預設：MindNoteStudio"}
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

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: t.overview },
    { id: "profile", label: t.profile },
    { id: "projects", label: t.projects },
    { id: "notes", label: t.notes },
    { id: "books", label: t.books },
    { id: "reflections", label: t.reflection },
    { id: "messages", label: `${t.messages}${draft.messages.some((m) => !m.read) ? " · " + t.unread : ""}` },
    { id: "backup", label: t.exportJson },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl">{t.admin}</h1>
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
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-full px-3 py-1 text-sm ${tab === item.id ? "bg-night text-paper-2" : "border border-rule"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {tab === "overview" ? <Overview draft={draft} /> : null}
        {tab === "profile" ? <ProfileEditor draft={draft} setDraft={setDraft} /> : null}
        {tab === "projects" ? <ProjectEditor draft={draft} setDraft={setDraft} /> : null}
        {tab === "notes" ? <NoteEditor draft={draft} setDraft={setDraft} /> : null}
        {tab === "books" ? <BookEditor draft={draft} setDraft={setDraft} /> : null}
        {tab === "reflections" ? <ReflectionEditor draft={draft} setDraft={setDraft} /> : null}
        {tab === "messages" ? <MessageInbox draft={draft} setDraft={setDraft} save={() => void save()} /> : null}
        {tab === "backup" ? <BackupPanel draft={draft} setDraft={setDraft} /> : null}
      </div>
    </div>
  );
}

function Overview({ draft }: { draft: SiteContent }) {
  const locale = useLocale();
  const stats = [
    [locale === "en" ? "Projects" : "專案", draft.projects.length],
    [locale === "en" ? "Notes" : "筆記", draft.notes.length],
    [locale === "en" ? "Reviews" : "書評", draft.books.length],
    [locale === "en" ? "Reflections" : "反思", draft.reflections.length],
    [locale === "en" ? "Unread" : "未讀留言", draft.messages.filter((item) => !item.read).length],
  ];
  return (
    <div>
      <p className="text-sm text-ink-soft">
        {locale === "en" ? "Last saved" : "上次儲存"}: {draft.updatedAt} · v{draft.version}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(([label, value]) => (
          <div key={String(label)} className="rounded-2xl border border-rule bg-paper-2 px-4 py-5">
            <p className="text-xs text-ink-soft">{label}</p>
            <p className="mt-2 font-serif text-3xl">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
        {locale === "en"
          ? "Add pages from the tabs. Topic landings already exist in the site map; new notes, reviews, projects and reflections appear on the public site after Save."
          : "從分頁新增內容。主題目錄頁已存在於網站地圖；新的筆記、書評、專案與反思按儲存後會出現在前台。"}
      </p>
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
      <Field label="Email">
        <input
          value={profile.email}
          onChange={(event) => patch({ email: event.target.value })}
          className="w-full rounded-xl border border-rule bg-paper-2 px-3 py-2"
        />
      </Field>
      <Bilingual label="Person name" value={profile.personName} onChange={(personName) => patch({ personName })} />
      <Bilingual label="Tagline" value={profile.tagline} onChange={(tagline) => patch({ tagline })} />
      <Bilingual label="Bio" value={profile.bio} onChange={(bio) => patch({ bio })} />
      <Bilingual label="Location" value={profile.location} onChange={(location) => patch({ location })} />
      <Bilingual label="Contact note" value={profile.contactNote} onChange={(contactNote) => patch({ contactNote })} />
      <Bilingual label="About (markdown)" value={profile.about} onChange={(about) => patch({ about })} tall />
    </div>
  );
}

function ProjectEditor({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const [id, setId] = useState(draft.projects[0]?.id ?? "");
  const item = draft.projects.find((project) => project.id === id);

  function upsert(next: ProjectItem) {
    const exists = draft.projects.some((project) => project.id === next.id);
    setDraft({
      ...draft,
      projects: exists
        ? draft.projects.map((project) => (project.id === next.id ? next : project))
        : [next, ...draft.projects],
    });
    setId(next.id);
  }

  return (
    <EditorShell
      title={t.projects}
      onAdd={() => {
        const next: ProjectItem = {
          id: newId(),
          area: "special-needs",
          kind: "programmes",
          slug: `project-${Date.now().toString(36)}`,
          title: emptyText(),
          summary: emptyText(),
          body: emptyText(),
          links: [],
          updatedAt: today(),
        };
        upsert(next);
      }}
      list={draft.projects.map((project) => ({
        id: project.id,
        label: project.title.zh || project.slug,
        active: project.id === id,
        onClick: () => setId(project.id),
      }))}
    >
      {item ? (
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
              setId(draft.projects.find((project) => project.id !== item.id)?.id ?? "");
            }}
          >
            {t.delete}
          </button>
        </div>
      ) : (
        <p className="text-sm text-ink-soft">{t.emptySection}</p>
      )}
    </EditorShell>
  );
}

function NoteEditor({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const [id, setId] = useState(draft.notes[0]?.id ?? "");
  const item = draft.notes.find((note) => note.id === id);
  const topicOptions = useMemo(
    () =>
      allTopicRows(draft).map((row) => ({
        value: `${row.session.slug}::${row.path}`,
        label: `${pick(row.session.title, locale)} / ${pick(row.topic.title, locale)}`,
      })),
    [draft, locale],
  );

  function upsert(next: Note) {
    const exists = draft.notes.some((note) => note.id === next.id);
    setDraft({
      ...draft,
      notes: exists ? draft.notes.map((note) => (note.id === next.id ? next : note)) : [next, ...draft.notes],
    });
    setId(next.id);
  }

  return (
    <EditorShell
      title={t.notes}
      onAdd={() => {
        const first = allTopicRows(draft)[0];
        const next: Note = {
          id: newId(),
          session: (first?.session.slug ?? "educational") as NoteSessionSlug,
          topic: first?.path ?? "special-needs",
          slug: `note-${Date.now().toString(36)}`,
          title: emptyText(),
          summary: emptyText(),
          body: emptyText(),
          tags: [],
          updatedAt: today(),
        };
        upsert(next);
      }}
      list={draft.notes.map((note) => ({
        id: note.id,
        label: note.title.zh || note.slug,
        active: note.id === id,
        onClick: () => setId(note.id),
      }))}
    >
      {item ? (
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
                  tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean),
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
              setId(draft.notes.find((note) => note.id !== item.id)?.id ?? "");
            }}
          >
            {t.delete}
          </button>
        </div>
      ) : (
        <p className="text-sm text-ink-soft">{t.emptySection}</p>
      )}
    </EditorShell>
  );
}

function BookEditor({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const [id, setId] = useState(draft.books[0]?.id ?? "");
  const item = draft.books.find((book) => book.id === id);

  function upsert(next: BookReview) {
    const exists = draft.books.some((book) => book.id === next.id);
    setDraft({
      ...draft,
      books: exists ? draft.books.map((book) => (book.id === next.id ? next : book)) : [next, ...draft.books],
    });
    setId(next.id);
  }

  return (
    <EditorShell
      title={t.books}
      onAdd={() => {
        const next: BookReview = {
          id: newId(),
          genre: "psychology",
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
        upsert(next);
      }}
      list={draft.books.map((book) => ({
        id: book.id,
        label: book.bookTitle || book.slug,
        active: book.id === id,
        onClick: () => setId(book.id),
      }))}
    >
      {item ? (
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
              setId(draft.books.find((book) => book.id !== item.id)?.id ?? "");
            }}
          >
            {t.delete}
          </button>
        </div>
      ) : (
        <p className="text-sm text-ink-soft">{t.emptySection}</p>
      )}
    </EditorShell>
  );
}

function ReflectionEditor({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const [id, setId] = useState(draft.reflections[0]?.id ?? "");
  const item = draft.reflections.find((row) => row.id === id);

  function upsert(next: Reflection) {
    const exists = draft.reflections.some((row) => row.id === next.id);
    setDraft({
      ...draft,
      reflections: exists
        ? draft.reflections.map((row) => (row.id === next.id ? next : row))
        : [next, ...draft.reflections],
    });
    setId(next.id);
  }

  return (
    <EditorShell
      title={t.reflection}
      onAdd={() => {
        const next: Reflection = {
          id: newId(),
          slug: `reflection-${Date.now().toString(36)}`,
          date: today(),
          title: emptyText(),
          excerpt: emptyText(),
          body: emptyText(),
        };
        upsert(next);
      }}
      list={draft.reflections.map((row) => ({
        id: row.id,
        label: row.title.zh || row.slug,
        active: row.id === id,
        onClick: () => setId(row.id),
      }))}
    >
      {item ? (
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
              setId(draft.reflections.find((row) => row.id !== item.id)?.id ?? "");
            }}
          >
            {t.delete}
          </button>
        </div>
      ) : (
        <p className="text-sm text-ink-soft">{t.emptySection}</p>
      )}
    </EditorShell>
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

function EditorShell({
  title,
  onAdd,
  list,
  children,
}: {
  title: string;
  onAdd: () => void;
  list: { id: string; label: string; active: boolean; onClick: () => void }[];
  children: ReactNode;
}) {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <aside className="rounded-2xl border border-rule bg-paper-2 p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <button type="button" onClick={onAdd} className="text-xs text-teal">
            {t.add}
          </button>
        </div>
        <div className="mt-3 grid max-h-[70vh] gap-1 overflow-auto">
          {list.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={row.onClick}
              className={`rounded-lg px-2 py-1.5 text-left text-sm ${row.active ? "bg-paper" : "hover:bg-paper/70"}`}
            >
              {row.label}
            </button>
          ))}
        </div>
      </aside>
      <div>{children}</div>
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
