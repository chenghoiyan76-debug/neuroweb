"use client";

import { useMemo, useState } from "react";
import { ItemCard, PageHero } from "@/components/Ui";
import { useSearch } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { ui } from "@/lib/i18n";

export default function SearchPage() {
  const locale = useLocale();
  const t = ui[locale];
  const [query, setQuery] = useState("");
  const hits = useSearch(query);
  const grouped = useMemo(() => {
    return {
      resource: hits.filter((hit) => hit.kind === "resource"),
      note: hits.filter((hit) => hit.kind === "note"),
      book: hits.filter((hit) => hit.kind === "book"),
      project: hits.filter((hit) => hit.kind === "project"),
      reflection: hits.filter((hit) => hit.kind === "reflection"),
    };
  }, [hits]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <PageHero kicker={t.search} title={t.searchLead} summary={t.searchHelp} />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.searchPlaceholder}
        className="mt-8 w-full rounded-2xl border border-rule bg-paper-2 px-4 py-3"
      />
      <div className="mt-8 grid gap-8">
        {query && hits.length === 0 ? <p className="text-sm text-ink-soft">{t.noResults}</p> : null}
        {(["resource", "note", "book", "project", "reflection"] as const).map((kind) =>
          grouped[kind].length ? (
            <section key={kind}>
              <h2 className="font-serif text-xl">
                {kind === "resource"
                  ? t.materials
                  : kind === "note"
                    ? t.notes
                    : kind === "book"
                      ? t.books
                      : kind === "project"
                        ? t.projects
                        : t.reflection}
              </h2>
              <div className="mt-3 grid gap-3">
                {grouped[kind].map((hit) => (
                  <ItemCard key={hit.href} href={hit.href} title={hit.title} summary={hit.summary} />
                ))}
              </div>
            </section>
          ) : null,
        )}
      </div>
    </div>
  );
}
