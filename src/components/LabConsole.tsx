"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Axis, Note, SiteContent } from "@/lib/types";

const emptyNote = (): Note => ({
  slug: "new-note",
  axis: "dsm",
  section: "",
  en: "New entry",
  zh: "新筆記",
  summary: "",
  related: {},
  blocks: [{ type: "p", text: "在此撰寫臨床筆記。術語請寫成 {{中文|English}}，繁中版會顯示為 中文 (English)。" }],
  updatedAt: new Date().toISOString().slice(0, 10),
});

export function LabConsole() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [selected, setSelected] = useState<string>("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [axisFilter, setAxisFilter] = useState<Axis | "all">("all");

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
        setContent(data);
        const first = data.notes[0];
        setSelected(first?.slug ?? "");
        setDraft(first ? JSON.stringify(first, null, 2) : "");
      });
  }, [authed]);

  const note = useMemo(
    () => content?.notes.find((item) => item.slug === selected) ?? null,
    [content, selected],
  );

  function selectNote(slug: string, source: Note | undefined = content?.notes.find((item) => item.slug === slug)) {
    setSelected(slug);
    if (source) setDraft(JSON.stringify(source, null, 2));
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
    setContent(saved);
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

  function addNote() {
    if (!content) return;
    const created = emptyNote();
    created.slug = `note-${Date.now()}`;
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
      if (!Array.isArray(parsed.notes)) throw new Error("bad");
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
        <p className="text-xs tracking-[0.3em] text-copper">RESTRICTED</p>
        <h1 className="mt-2 font-serif text-3xl">Integrator Lab</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          內容更新後門。本地預設金鑰見 README 的 <code>NPI_LAB_KEY</code>。生產環境必須自行設定環境變數。
        </p>
        <form onSubmit={login} className="mt-6 grid gap-3">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Lab key"
            className="rounded-xl border border-rule bg-paper-2 px-4 py-3"
          />
          <button type="submit" className="rounded-xl bg-teal px-4 py-3 text-sm text-paper-2">
            進入
          </button>
          {error ? <p className="text-sm text-clinical">{error}</p> : null}
        </form>
      </div>
    );
  }

  const visible =
    content?.notes.filter((item) => (axisFilter === "all" ? true : item.axis === axisFilter)) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs tracking-wide text-copper">Content backdoor</p>
          <h1 className="font-serif text-3xl">Integrator Lab</h1>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button type="button" className="rounded-full border border-rule px-3 py-1" onClick={addNote}>
            新增筆記
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-rule bg-paper-2 p-3">
          <select
            value={axisFilter}
            onChange={(event) => setAxisFilter(event.target.value as Axis | "all")}
            className="mb-3 w-full rounded-lg border border-rule bg-paper px-2 py-2 text-sm"
          >
            <option value="all">全部軸</option>
            <option value="dsm">DSM-5</option>
            <option value="symptom">Symptoms</option>
            <option value="pharmacology">Neuropharmacology</option>
            <option value="intervention">Interventions</option>
            <option value="fundamental">Fundamentals</option>
          </select>
          <div className="grid max-h-[70vh] gap-1 overflow-auto text-sm">
            {visible.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => selectNote(item.slug, item)}
                className={`rounded-lg px-2 py-2 text-left ${
                  item.slug === selected ? "bg-teal text-paper-2" : "hover:bg-paper"
                }`}
              >
                <span className="block text-[11px] opacity-80">{item.en}</span>
                {item.zh}
              </button>
            ))}
          </div>
        </aside>
        <section>
          <div className="mb-3 flex gap-2">
            <button
              type="button"
              onClick={applyDraft}
              className="rounded-full bg-teal px-4 py-2 text-sm text-paper-2"
            >
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
    </div>
  );
}
