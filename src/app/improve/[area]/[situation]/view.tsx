"use client";

import { notFound } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { ResourceBrowser } from "@/components/sen/ResourceBrowser";
import { Breadcrumbs, PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { senAreaBySlug, situationBySlug } from "@/lib/sen-taxonomy";
import type { AbilityAreaSlug } from "@/lib/sen-types";

export function ImproveSituationView({ area, situation }: { area: string; situation: string }) {
  const locale = useLocale();
  const t = ui[locale];
  const node = senAreaBySlug(area);
  const sit = situationBySlug(area, situation);
  if (!node || !sit) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumbs
        locale={locale}
        items={[
          { href: "/", label: t.home },
          { href: "/improve", label: t.improveWhat },
          { href: `/improve/${node.slug}`, label: pick(node.short, locale) },
          { label: pick(sit.title, locale) },
        ]}
      />
      <div className="mt-6">
        <PageHero
          kicker={`${node.emoji} ${pick(node.short, locale)}`}
          title={pick(sit.title, locale)}
          summary={pick(sit.summary, locale)}
          color={node.color}
        />
      </div>
      <div className="mt-10">
        <ResourceBrowser area={node.slug as AbilityAreaSlug} situation={sit.slug} />
      </div>
    </div>
  );
}
