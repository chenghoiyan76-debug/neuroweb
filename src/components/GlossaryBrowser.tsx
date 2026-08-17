"use client";

import { useMemo, useState } from "react";
import type { GlossaryCategory, GlossaryEntry } from "@/lib/types";

const categories: { slug: GlossaryCategory | "all"; label: string }[] = [
  { slug: "all", label: "全部" },
  { slug: "cognition", label: "認知" },
  { slug: "psychiatry", label: "精神醫學" },
  { slug: "pharmacology", label: "藥理" },
  { slug: "therapy", label: "治療" },
  { slug: "neuroscience", label: "神經科學" },
  { slug: "methods", label: "方法學" },
];

export function GlossaryBrowser({ entries }: { entries: GlossaryEntry[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]["slug"]>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((entry) => (category === "all" ? true : entry.category === category))
      .filter((entry) => {
        if (!q) return true;
        return [entry.termZh, entry.termEn, entry.abbr ?? "", entry.definition]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => a.termZh.localeCompare(b.termZh, "zh-Hant"));
  }, [category, entries, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜尋中英文術語、縮寫或定義"
          className="w-full rounded-full border border-rule bg-paper-2 px-4 py-2.5 text-sm outline-none ring-teal/30 focus:ring-2 md:max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setCategory(item.slug)}
              className={`rounded-full px-3 py-1 text-xs ${
                category === item.slug ? "bg-teal text-paper-2" : "border border-rule bg-paper-2"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-soft">共 {filtered.length} 詞</p>
      <div className="mt-6 grid gap-4">
        {filtered.map((entry) => (
          <article
            key={entry.slug}
            id={entry.slug}
            className="rounded-2xl border border-rule bg-paper-2 p-5"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-serif text-2xl">{entry.termZh}</h2>
              <p className="text-sm text-copper">
                {entry.termEn}
                {entry.abbr ? ` · ${entry.abbr}` : ""}
              </p>
            </div>
            <p className="mt-3 leading-relaxed">{entry.definition}</p>
            {entry.related && entry.related.length > 0 ? (
              <p className="mt-3 text-sm text-ink-soft">
                相關：
                {entry.related.map((slug) => (
                  <a key={slug} href={`#${slug}`} className="ml-2 text-teal hover:underline">
                    {entries.find((item) => item.slug === slug)?.termZh ?? slug}
                  </a>
                ))}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
