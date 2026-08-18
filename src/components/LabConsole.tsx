"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Domain, LevelId, Note, Resource, ResourceKind, SiteContent } from "@/lib/types";

type Tab = "compose" | "notes" | "pages" | "resources" | "json";

const emptyNote = (domain = "inbox"): Note => ({
  slug: `note-${Date.now()}`,
  level: 0,
  domain,
  en: "New note",
  zh: "新筆記",
  summary: "",
  tags: [],
  related: [],
  resources: [],
  blocks: [
    {
      type: "p",
      text: "在此撰寫筆記。術語請寫成 {{中文|English}}，繁中版會顯示為 中文 (English)。",
    },
  ],
  updatedAt: new Date().toISOString().slice(0, 10),
  custom: true,
});

const emptyDomain = (): Domain => ({
  slug: `page-${Date.now()}`,
  level: 0,
  en: "New page",
  zh: "新頁面",
  summary: "從後門新增的自訂頁面，可稍後歸入金字塔。",
  summaryEn: "A custom page added from the back door; file it into the pyramid later.",
  custom: true,
});

const emptyResource = (): Resource => ({
  id: `res-${Date.now()}`,
  title: "新資源",
  titleEn: "New resource",
  kind: "link",
  url: "https://",
  note: "",
});

export function LabConsole() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("compose");
  const [selected, setSelected] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelId | "all">("all");

  const [form, setForm] = useState({
    kind: "note" as "note" | "page" | "resource",
    zh: "",
    en: "",
    level: "0",
    domain: "inbox",
    summary: "",
    url: "",
    resourceKind: "link" as ResourceKind,
    attachTo: "",
  });

  useEffect(() => {
    fetch("/api/lab/session")
      .then((response) => response.json())
      .then((data: { ok: boolean }) => setAuthed(data.ok))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/content")
      .then((response) => response.json())
      .then((data: SiteContent) => {
        setContent({ ...data, resources: data.resources ?? [] });
        const first = data.notes[0];
        setSelected(first?.slug ?? "");
        setDraft(first ? JSON.stringify(first, null, 2) : "");
        if (data.domains[0]) {
          setForm((current) => ({ ...current, domain: data.domains[0]?.slug ?? "inbox" }));
        }
      });
  }, [authed]);

  const note = useMemo(
    () => content?.notes.find((item) => item.slug === selected) ?? null,
    [content, selected],
  );

  function selectNote(slug: string, source: Note | undefined = content?.notes.find((item) => item.slug === slug)) {
    setSelected(slug);
    if (source) setDraft(JSON.stringify(source, null, 2));
    setTab("json");
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/lab/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setError("金鑰不正確，或尚未設定 NPI_LAB_KEY。");
      return;
    }
    setAuthed(true);
  }

  async function saveAll(next: SiteContent) {
    setStatus("儲存中…");
    const response = await fetch("/api/lab/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (!response.ok) {
      setStatus("儲存失敗（請確認已登入且 JSON 結構完整）。");
      return;
    }
    const saved = (await response.json()) as SiteContent;
    setContent({ ...saved, resources: saved.resources ?? [] });
    setStatus(`已寫入 data/site-content.json · version ${saved.version}`);
  }

  function applyDraft() {
    if (!content || !note) return;
    try {
      const parsed = JSON.parse(draft) as Note;
      const notes = content.notes.map((item) => (item.slug === note.slug ? parsed : item));
      const next = { ...content, notes };
      setContent(next);
      selectNote(parsed.slug, parsed);
      void saveAll(next);
    } catch {
      setStatus("目前筆記的 JSON 無法解析。");
    }
  }

  function slugify(value: string) {
    return (
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 48) || `item-${Date.now()}`
    );
  }

  function compose(event: FormEvent) {
    event.preventDefault();
    if (!content) return;
    if (form.kind === "note") {
      const created = emptyNote(form.domain || "inbox");
      created.zh = form.zh || created.zh;
      created.en = form.en || created.en;
      created.summary = form.summary;
      created.level = Number(form.level) as LevelId;
      created.slug = slugify(form.en || form.zh);
      const next = { ...content, notes: [created, ...content.notes] };
      setContent(next);
      selectNote(created.slug, created);
      void saveAll(next);
      return;
    }
    if (form.kind === "page") {
      const created = emptyDomain();
      created.zh = form.zh || created.zh;
      created.en = form.en || created.en;
      created.summary = form.summary || created.summary;
      created.summaryEn = form.summary || created.summaryEn;
      created.level = Number(form.level) as LevelId;
      created.slug = slugify(form.en || form.zh);
      const next = { ...content, domains: [created, ...content.domains] };
      void saveAll(next);
      setTab("pages");
      return;
    }
    const created = emptyResource();
    created.title = form.zh || created.title;
    created.titleEn = form.en || created.titleEn;
    created.url = form.url || undefined;
    created.kind = form.resourceKind;
    created.note = form.summary;
    if (form.attachTo) created.noteSlug = form.attachTo;
    else if (form.domain) created.domain = form.domain;
    const next = { ...content, resources: [created, ...(content.resources ?? [])] };
    void saveAll(next);
    setTab("resources");
  }

  function addNote() {
    if (!content) return;
    const created = emptyNote();
    const next = { ...content, notes: [created, ...content.notes] };
    setContent(next);
    selectNote(created.slug, created);
    setStatus("已在記憶體新增筆記，請編輯後按「儲存此筆」。");
  }

  function removeNote() {
    if (!content || !note) return;
    if (!confirm(`刪除 ${note.en}？`)) return;
    const notes = content.notes.filter((item) => item.slug !== note.slug);
    const next = { ...content, notes };
    setContent(next);
    selectNote(notes[0]?.slug ?? "", notes[0]);
    void saveAll(next);
  }

  function download() {
    if (!content) return;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "site-content.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function onImport(file: File) {
    const text = await file.text();
    try {
      const parsed = JSON.parse(text) as SiteContent;
      if (!Array.isArray(parsed.notes) || !Array.isArray(parsed.domains)) throw new Error("bad");
      parsed.resources = parsed.resources ?? [];
      await saveAll(parsed);
      selectNote(parsed.notes[0]?.slug ?? "", parsed.notes[0]);
    } catch {
      setStatus("匯入失敗：不是有效的 SiteContent。");
    }
  }

  if (authed === null) {
    return <p className="px-4 py-16 text-center text-ink-soft">檢查 Lab session…</p>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <p className="text-xs tracking-[0.3em] text-copper">BACK DOOR</p>
        <h1 className="mt-2 font-serif text-3xl">Mind-Note Lab</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          新增頁面、筆記與資源的後門。本地預設金鑰見 README 的 <code>NPI_LAB_KEY</code>。生產環境必須自行設定環境變數。
        </p>
        <form onSubmit={login} className="mt-6 grid gap-3">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Lab key"
            className="rounded-xl border border-rule bg-paper-2 px-4 py-3"
          />
          <button type="submit" className="rounded-xl bg-night px-4 py-3 text-sm text-paper-2">
            進入
          </button>
          {error ? <p className="text-sm text-clinical">{error}</p> : null}
        </form>
      </div>
    );
  }

  const visible =
    content?.notes.filter((item) => (levelFilter === "all" ? true : item.level === levelFilter)) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs tracking-wide text-copper">Content backdoor</p>
          <h1 className="font-serif text-3xl">Mind-Note Lab</h1>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button type="button" className="rounded-full border border-rule px-3 py-1" onClick={addNote}>
            空白筆記
          </button>
          <button type="button" className="rounded-full border border-rule px-3 py-1" onClick={download}>
            Export JSON
          </button>
          <label className="rounded-full border border-rule px-3 py-1">
            Import JSON
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void onImport(file);
              }}
            />
          </label>
          <button
            type="button"
            className="rounded-full border border-rule px-3 py-1"
            onClick={() => {
              void fetch("/api/lab/logout", { method: "POST" }).then(() => setAuthed(false));
            }}
          >
            登出
          </button>
        </div>
      </div>
      {status ? <p className="mt-3 text-sm text-teal">{status}</p> : null}

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        {(
          [
            ["compose", "新增"],
            ["notes", "筆記"],
            ["pages", "頁面"],
            ["resources", "資源／Inbox"],
            ["json", "JSON"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-3 py-1 ${tab === id ? "bg-night text-paper-2" : "border border-rule"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "compose" ? (
        <form onSubmit={compose} className="mt-6 grid max-w-2xl gap-3 rounded-2xl border border-rule bg-paper-2 p-5">
          <p className="text-sm text-ink-soft">把新頁面、筆記或資源先放進金字塔或 Inbox。未指定層級時會進花園。</p>
          <select
            value={form.kind}
            onChange={(event) => setForm({ ...form, kind: event.target.value as typeof form.kind })}
            className="rounded-lg border border-rule bg-paper px-3 py-2"
          >
            <option value="note">新筆記</option>
            <option value="page">新頁面／領域</option>
            <option value="resource">新資源（連結、論文、書籍）</option>
          </select>
          <input
            value={form.zh}
            onChange={(event) => setForm({ ...form, zh: event.target.value })}
            placeholder="中文標題"
            className="rounded-lg border border-rule bg-paper px-3 py-2"
          />
          <input
            value={form.en}
            onChange={(event) => setForm({ ...form, en: event.target.value })}
            placeholder="English title"
            className="rounded-lg border border-rule bg-paper px-3 py-2"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={form.level}
              onChange={(event) => setForm({ ...form, level: event.target.value })}
              className="rounded-lg border border-rule bg-paper px-3 py-2"
            >
              <option value="0">Inbox / 未歸檔</option>
              <option value="1">Level 1 結構</option>
              <option value="2">Level 2 測量</option>
              <option value="3">Level 3 互動</option>
              <option value="4">Level 4 健康／疾病</option>
              <option value="5">Level 5 形而上學</option>
            </select>
            <select
              value={form.domain}
              onChange={(event) => setForm({ ...form, domain: event.target.value })}
              className="rounded-lg border border-rule bg-paper px-3 py-2"
            >
              {content?.domains.map((domain) => (
                <option key={domain.slug} value={domain.slug}>
                  L{domain.level} · {domain.zh}
                </option>
              ))}
            </select>
          </div>
          {form.kind === "resource" ? (
            <>
              <select
                value={form.resourceKind}
                onChange={(event) => setForm({ ...form, resourceKind: event.target.value as ResourceKind })}
                className="rounded-lg border border-rule bg-paper px-3 py-2"
              >
                <option value="link">link</option>
                <option value="paper">paper</option>
                <option value="book">book</option>
                <option value="media">media</option>
                <option value="file">file</option>
                <option value="note">note</option>
              </select>
              <input
                value={form.url}
                onChange={(event) => setForm({ ...form, url: event.target.value })}
                placeholder="https://"
                className="rounded-lg border border-rule bg-paper px-3 py-2"
              />
              <input
                value={form.attachTo}
                onChange={(event) => setForm({ ...form, attachTo: event.target.value })}
                placeholder="掛到既有筆記 slug（可留空＝Inbox）"
                className="rounded-lg border border-rule bg-paper px-3 py-2"
              />
            </>
          ) : null}
          <textarea
            value={form.summary}
            onChange={(event) => setForm({ ...form, summary: event.target.value })}
            placeholder="摘要／備註"
            className="min-h-24 rounded-lg border border-rule bg-paper px-3 py-2"
          />
          <button type="submit" className="rounded-full bg-night px-4 py-2 text-sm text-paper-2">
            寫入 Mind-Note
          </button>
        </form>
      ) : null}

      {tab === "notes" || tab === "json" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-rule bg-paper-2 p-3">
            <select
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value === "all" ? "all" : (Number(event.target.value) as LevelId))}
              className="mb-3 w-full rounded-lg border border-rule bg-paper px-2 py-2 text-sm"
            >
              <option value="all">全部層級</option>
              <option value="0">Inbox</option>
              <option value="1">L1</option>
              <option value="2">L2</option>
              <option value="3">L3</option>
              <option value="4">L4</option>
              <option value="5">L5</option>
            </select>
            <div className="grid max-h-[70vh] gap-1 overflow-auto text-sm">
              {visible.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => selectNote(item.slug, item)}
                  className={`rounded-lg px-2 py-2 text-left ${
                    item.slug === selected ? "bg-night text-paper-2" : "hover:bg-paper"
                  }`}
                >
                  <span className="block text-[11px] opacity-80">
                    L{item.level} · {item.en}
                  </span>
                  {item.zh}
                </button>
              ))}
            </div>
          </aside>
          <section>
            <div className="mb-3 flex gap-2">
              <button type="button" onClick={applyDraft} className="rounded-full bg-night px-4 py-2 text-sm text-paper-2">
                儲存此筆
              </button>
              <button
                type="button"
                onClick={removeNote}
                className="rounded-full border border-clinical px-4 py-2 text-sm text-clinical"
              >
                刪除此筆
              </button>
            </div>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="min-h-[70vh] w-full rounded-2xl border border-rule bg-paper-2 p-4 font-mono text-xs leading-relaxed"
              spellCheck={false}
            />
          </section>
        </div>
      ) : null}

      {tab === "pages" ? (
        <div className="mt-6 grid gap-2">
          {content?.domains.map((domain) => (
            <div key={domain.slug} className="rounded-xl border border-rule bg-paper-2 px-4 py-3">
              <p className="text-xs text-ink-soft">
                L{domain.level}
                {domain.custom ? " · custom" : ""} · {domain.slug}
              </p>
              <p className="font-medium">
                {domain.zh} ({domain.en})
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "resources" ? (
        <div className="mt-6 grid gap-2">
          {(content?.resources ?? []).map((resource) => (
            <div key={resource.id} className="rounded-xl border border-rule bg-paper-2 px-4 py-3 text-sm">
              <p className="text-[11px] uppercase tracking-wide text-ink-soft">
                {resource.kind}
                {resource.noteSlug ? ` · note:${resource.noteSlug}` : resource.domain ? ` · ${resource.domain}` : " · Inbox"}
              </p>
              <p>
                {resource.url ? (
                  <a className="text-teal underline" href={resource.url}>
                    {resource.title}
                  </a>
                ) : (
                  resource.title
                )}
              </p>
              {resource.note ? <p className="mt-1 text-ink-soft">{resource.note}</p> : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
