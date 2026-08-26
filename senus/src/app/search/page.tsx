"use client";

import { useMemo, useState } from "react";
import { ItemCard, PageHero } from "@/components/Ui";
import { useLocale } from "@/components/LocaleProvider";
import { pick, ui } from "@/lib/i18n";
import { filterResources } from "@/lib/sen-catalog";

export default function SearchPage() {
  const locale = useLocale();
  const t = ui[locale];
  const [query, setQuery] = useState("");
  const hits = useMemo(() => (query.trim() ? filterResources({ query }) : []), [query]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <PageHero kicker={t.search} title={t.searchLead} summary={t.searchHelp} />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.searchPlaceholder}
        className="mt-8 w-full rounded-2xl border border-rule bg-paper-2 px-4 py-3"
      />
      <div className="mt-8 grid gap-3">
        {query && hits.length === 0 ? <p className="text-sm text-ink-soft">{t.noResults}</p> : null}
        {hits.map((item) => (
          <ItemCard
            key={item.slug}
            href={`/resources/${item.slug}`}
            title={pick(item.title, locale)}
            summary={pick(item.summary, locale)}
          />
        ))}
      </div>
    </div>
  );
}
