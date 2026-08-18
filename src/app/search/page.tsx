"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { applyTerms } from "@/lib/i18n";
import { searchBrain } from "@/lib/query";

export default function SearchPage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchBrain(content, query), [content, query]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs tracking-[0.25em] text-copper uppercase">{t.searchLead}</p>
      <h1 className="mt-2 font-serif text-4xl">{t.search}</h1>
      <p className="mt-3 text-sm text-ink-soft">{t.searchHelp}</p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.searchPlaceholder}
        className="mt-6 w-full rounded-2xl border border-rule bg-paper-2 px-4 py-3"
      />
      <div className="mt-8 grid gap-6">
        {results.domains.map((domain) => (
          <Link key={domain.slug} href={`/domain/${domain.slug}`} className="block rounded-xl border border-rule px-4 py-3">
            <span className="text-xs text-ink-soft">{t.domains}</span>
            <p className="font-medium">{bilingualTitle(domain.zh, domain.en, locale)}</p>
          </Link>
        ))}
        {results.notes.map((note) => (
          <Link key={note.slug} href={`/note/${note.slug}`} className="block rounded-xl border border-rule px-4 py-3">
            <span className="text-xs text-ink-soft">
              {t.notes} · L{note.level}
            </span>
            <p className="font-medium">{bilingualTitle(note.zh, note.en, locale)}</p>
            <p className="mt-1 text-sm text-ink-soft">{applyTerms(note.summary, locale)}</p>
          </Link>
        ))}
        {results.resources.map((resource) => (
          <div key={resource.id} className="rounded-xl border border-rule px-4 py-3">
            <span className="text-xs text-ink-soft">{t.resources}</span>
            <p>{resource.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
