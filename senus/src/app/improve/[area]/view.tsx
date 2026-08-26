"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { ResourceBrowser } from "@/components/sen/ResourceBrowser";
import { Breadcrumbs, PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { senAreaBySlug } from "@/lib/sen-taxonomy";
import type { AbilityAreaSlug } from "@/lib/sen-types";

export function ImproveAreaView({ area }: { area: string }) {
  const locale = useLocale();
  const t = ui[locale];
  const node = senAreaBySlug(area);
  if (!node) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumbs
        locale={locale}
        items={[
          { href: "/", label: t.home },
          { href: "/improve", label: t.improveWhat },
          { label: pick(node.short, locale) },
        ]}
      />
      <div className="mt-6">
        <PageHero kicker={`${node.emoji} ${pick(node.short, locale)}`} title={pick(node.title, locale)} summary={pick(node.summary, locale)} color={node.color} />
      </div>
      <div className="mt-8">
        <p className="text-[11px] tracking-[0.22em] uppercase text-ink-soft">{t.situations}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {node.situations.map((situation) => (
            <Link
              key={situation.slug}
              href={`/improve/${node.slug}/${situation.slug}`}
              className="rounded-full border border-rule bg-paper-2 px-3 py-1.5 text-sm hover:border-gold"
            >
              {pick(situation.title, locale)}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <ResourceBrowser area={node.slug as AbilityAreaSlug} />
      </div>
    </div>
  );
}
