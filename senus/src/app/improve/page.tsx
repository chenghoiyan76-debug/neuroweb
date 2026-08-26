"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Breadcrumbs, PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { areaCounts } from "@/lib/sen-catalog";
import { abilityAreas } from "@/lib/sen-taxonomy";

export default function ImproveIndexPage() {
  const locale = useLocale();
  const t = ui[locale];
  const counts = areaCounts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumbs locale={locale} items={[{ href: "/", label: t.home }, { label: t.improveWhat }]} />
      <div className="mt-6">
        <PageHero kicker={t.materials} title={t.improveWhat} summary={t.layer1Body} />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {abilityAreas.map((area) => (
          <Link
            key={area.slug}
            href={`/improve/${area.slug}`}
            className="rounded-2xl border border-rule bg-paper-2 p-5 hover:border-gold"
          >
            <p className="text-2xl">{area.emoji}</p>
            <h2 className="mt-2 font-serif text-2xl">{pick(area.title, locale)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pick(area.summary, locale)}</p>
            <p className="mt-3 text-xs text-ink-soft">
              {counts[area.slug] ?? 0} {t.resourceCount}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
