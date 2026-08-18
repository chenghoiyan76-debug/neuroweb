"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Domain, LevelId, Note, Resource, ResourceKind, SiteContent } from "@/lib/types";

type Tab = "overview" | "compose" | "notes" | "pages" | "resources" | "json";

const emptyNote = (domain = "classical-psychodynamics"): Note => ({
  slug: `note-${Date.now()}`,
  level: 1,
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
  level: 1,
  en: "New page",
  zh: "新頁面",
  summary: "在管理後台新增的頁面。",
  summaryEn: "A page added from the admin portal.",
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

export function AdminPortal() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [selected, setSelected] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelId | "all" | "reflection">("all");
  const [form, setForm] = useState({
    kind: "note" as "note" | "page" | "resource",
    zh: "",
    en: "",
    level: "1",
    domain: "classical-psychodynamics",
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
        const firstDomain = data.domains.find((domain) => domain.level !== 0);
        if (firstDomain) {
          setForm((current) => ({ ...current, domain: firstDomain.slug }));
        }
      });
  }, [authed]);

  const note = useMemo(
    () => content?.notes.find((item) => item.slug === selected) ?? null,
    [content, selected],
  );

  const draftCount = useMemo(() => {
    if (!content) return 0;
    const notes = content.notes.filter((item) => item.level === 0 && item.domain !== "self-reflection").length;
    const pages = content.domains.filter((item) => item.level === 0 && item.kind !== "reflection").length;
    const resources = (content.resources ?? []).filter((item) => !item.noteSlug && !item.domain).length;
    return notes + pages + resources;
  }, [content]);

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
      setError("密碼不正確，或尚未設定 NPI_LAB_KEY。");
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
    setStatus(`已儲存 · version ${saved.version} · ${saved.updatedAt}`);
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
      const created = emptyNote(form.domain || "classical-psychodynamics");
      created.zh = form.zh || created.zh;
      created.en = form.en || created.en;
      created.summary = form.summary;
      const asReflection = form.level === "reflection" || form.domain === "self-reflection";
      created.level = asReflection ? 0 : (Number(form.level) as LevelId);
      created.domain = asReflection ? "self-reflection" : created.domain;
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
      const pageLevel = Number(form.level);
      created.level = Number.isFinite(pageLevel) ? (pageLevel as LevelId) : 1;
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
    else if (form.domain && Number(form.level) !== 0) created.domain = form.domain;
    const next = { ...content, resources: [created, ...(content.resources ?? [])] };
    void saveAll(next);
    setTab("resources");
  }

  function removeNote() {
    if (!content || !note) return;
    if (!confirm(`刪除「${note.zh}」？`)) return;
    const notes = content.notes.filter((item) => item.slug !== note.slug);
    const next = { ...content, notes };
    setContent(next);
    selectNote(notes[0]?.slug ?? "", notes[0]);
    void saveAll(next);
  }

  function removePage(slug: string) {
    if (!content) return;
    if (!confirm(`刪除頁面 ${slug}？`)) return;
    void saveAll({
      ...content,
      domains: content.domains.filter((item) => item.slug !== slug),
      notes: content.notes.filter((item) => item.domain !== slug),
    });
  }

  function removeResource(id: string) {
    if (!content) return;
    if (!confirm("刪除此資源？")) return;
    void saveAll({
      ...content,
      resources: (content.resources ?? []).filter((item) => item.id !== id),
    });
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
      setStatus("匯入失敗：不是有效的內容檔。");
    }
  }

  if (authed === null) {
    return <p className="px-4 py-16 text-center text-ink-soft">檢查管理權限…</p>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <p className="text-xs tracking-[0.3em] text-copper">ADMIN</p>
        <h1 className="mt-2 font-serif text-3xl">內容管理後台</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          在這裡新增、編輯、刪除筆記、頁面與資源。本地預設密碼見 <code>NPI_LAB_KEY</code>（.env.example）。生產環境必須自行設定。
        </p>
        <form onSubmit={login} className="mt-6 grid gap-3">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Admin password"
            className="rounded-xl border border-rule bg-paper-2 px-4 py-3"
          />
          <button type="submit" className="rounded-xl bg-night px-4 py-3 text-sm text-paper-2">
            登入後台
          </button>
          {error ? <p className="text-sm text-clinical">{error}</p> : null}
        </form>
      </div>
    );
  }

  const visible =
    content?.notes.filter((item) => {
      if (levelFilter === "all") return true;
      if (levelFilter === "reflection") return item.domain === "self-reflection";
      if (levelFilter === 0) return item.level === 0 && item.domain !== "self-reflection";
      return item.level === levelFilter;
    }) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs tracking-wide text-copper">Mind-Note Admin</p>
          <h1 className="font-serif text-3xl">內容管理後台</h1>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button type="button" className="rounded-full border border-rule px-3 py-1" onClick={download}>
            匯出 JSON
          </button>
          <label className="rounded-full border border-rule px-3 py-1">
            匯入 JSON
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
            ["overview", "總覽"],
            ["compose", "新增內容"],
            ["notes", "筆記"],
            ["pages", "頁面"],
            ["resources", "資源"],
            ["json", "JSON 編輯"],
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

      {tab === "overview" ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="筆記" value={content?.notes.length ?? 0} />
          <Stat label="頁面／領域" value={content?.domains.length ?? 0} />
          <Stat label="資源" value={content?.resources.length ?? 0} />
          <Stat label="草稿（未上金字塔）" value={draftCount} />
          <p className="sm:col-span-2 lg:col-span-4 text-sm leading-relaxed text-ink-soft">
            這是你的私人後台，不會出現在前台導覽。新增的筆記與頁面請指定 Level 1–5，就會出現在對應的金字塔層；指定「自我反思」則掛到頂部導覽的獨立頁。JSON
            會寫入 <code>data/site-content.json</code>。
          </p>
        </div>
      ) : null}

      {tab === "compose" ? (
        <form onSubmit={compose} className="mt-6 grid max-w-2xl gap-3 rounded-2xl border border-rule bg-paper-2 p-5">
          <p className="text-sm text-ink-soft">新增筆記、頁面或外部資源，並指定要掛上的金字塔層級。</p>
          <select
            value={form.kind}
            onChange={(event) => {
              const kind = event.target.value as typeof form.kind;
              setForm({
                ...form,
                kind,
                level: kind !== "note" && form.level === "reflection" ? "1" : form.level,
              });
            }}
            className="rounded-lg border border-rule bg-paper px-3 py-2"
          >
            <option value="note">筆記</option>
            <option value="page">頁面／領域</option>
            <option value="resource">資源（連結、論文、書籍）</option>
          </select>
          <input
            value={form.zh}
            onChange={(event) => setForm({ ...form, zh: event.target.value })}
            placeholder="中文標題"
            className="rounded-lg border border-rule bg-paper px-3 py-2"
            required
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
              <option value="1">Level 1 本質與結構</option>
              <option value="2">Level 2 心智的測量</option>
              <option value="3">Level 3 心智的互動</option>
              <option value="4">Level 4 健康與疾病</option>
              <option value="5">Level 5 形而上學</option>
              {form.kind === "note" ? <option value="reflection">自我反思</option> : null}
              <option value="0">草稿（不上架）</option>
            </select>
            <select
              value={form.domain}
              onChange={(event) => setForm({ ...form, domain: event.target.value })}
              className="rounded-lg border border-rule bg-paper px-3 py-2"
            >
              {content?.domains
                .filter((domain) => domain.level !== 0 || domain.kind === "reflection")
                .map((domain) => (
                  <option key={domain.slug} value={domain.slug}>
                    {domain.kind === "reflection" ? "反思" : `L${domain.level}`} · {domain.zh}
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
                <option value="link">連結</option>
                <option value="paper">論文</option>
                <option value="book">書籍</option>
                <option value="media">媒體</option>
                <option value="file">檔案</option>
                <option value="note">備註</option>
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
                placeholder="掛到既有筆記 slug（可留空）"
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
            儲存到 Mind-Note
          </button>
        </form>
      ) : null}

      {tab === "notes" || tab === "json" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-rule bg-paper-2 p-3">
            <select
              value={String(levelFilter)}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "all" || value === "reflection") setLevelFilter(value);
                else setLevelFilter(Number(value) as LevelId);
              }}
              className="mb-3 w-full rounded-lg border border-rule bg-paper px-2 py-2 text-sm"
            >
              <option value="all">全部層級</option>
              <option value="1">L1 結構</option>
              <option value="2">L2 測量</option>
              <option value="3">L3 互動</option>
              <option value="4">L4 健康／疾病</option>
              <option value="5">L5 形而上學</option>
              <option value="reflection">自我反思</option>
              <option value="0">草稿</option>
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
                    {item.domain === "self-reflection" ? "反思" : `L${item.level}`} · {item.en}
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
            <div key={domain.slug} className="flex items-start justify-between gap-3 rounded-xl border border-rule bg-paper-2 px-4 py-3">
              <div>
                <p className="text-xs text-ink-soft">
                  L{domain.level}
                  {domain.custom ? " · 自訂" : ""} · {domain.slug}
                </p>
                <p className="font-medium">
                  {domain.zh} ({domain.en})
                </p>
              </div>
              {domain.custom ? (
                <button
                  type="button"
                  className="text-xs text-clinical"
                  onClick={() => removePage(domain.slug)}
                >
                  刪除
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {tab === "resources" ? (
        <div className="mt-6 grid gap-2">
          {(content?.resources ?? []).map((resource) => (
            <div key={resource.id} className="flex items-start justify-between gap-3 rounded-xl border border-rule bg-paper-2 px-4 py-3 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-ink-soft">
                  {resource.kind}
                  {resource.noteSlug
                    ? ` · 筆記 ${resource.noteSlug}`
                    : resource.domain
                      ? ` · ${resource.domain}`
                      : " · 未掛層"}
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
              <button type="button" className="text-xs text-clinical" onClick={() => removeResource(resource.id)}>
                刪除
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-rule bg-paper-2 px-4 py-5">
      <p className="text-xs tracking-wide text-ink-soft">{label}</p>
      <p className="mt-2 font-serif text-3xl">{value}</p>
    </div>
  );
}

export { AdminPortal as LabConsole };
