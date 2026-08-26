"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { FilterBar, filtersFromParams } from "@/components/sen/FilterBar";
import { ResourceCard } from "@/components/sen/ResourceCard";
import { filterResources } from "@/lib/sen-catalog";
import type { AbilityAreaSlug } from "@/lib/sen-types";
import { ui } from "@/lib/i18n";

export function ResourceBrowser({
  area,
  situation,
}: {
  area?: AbilityAreaSlug;
  situation?: string;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-ink-soft">…</p>}>
      <ResourceBrowserInner area={area} situation={situation} />
    </Suspense>
  );
}

function ResourceBrowserInner({
  area,
  situation,
}: {
  area?: AbilityAreaSlug;
  situation?: string;
}) {
  const locale = useLocale();
  const t = ui[locale];
  const params = useSearchParams();
  const resources = useMemo(() => {
    return filterResources({
      area,
      situation,
      ...filtersFromParams(params),
    });
  }, [area, situation, params]);

  return (
    <div className="grid gap-6">
      <FilterBar resultCount={resources.length} />
      {resources.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-rule bg-paper-2 px-5 py-8 text-sm text-ink-soft">{t.noResults}</p>
      )}
    </div>
  );
}
