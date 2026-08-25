"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { ResourceCard } from "@/components/sen/ResourceCard";
import { WorksheetView } from "@/components/sen/WorksheetView";
import { Breadcrumbs } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { printHref, relatedResources, resourceBySlug } from "@/lib/sen-catalog";
import {
  ageBands,
  challengeTags,
  difficultyOptions,
  labelOf,
  resourceFormats,
  senAreaBySlug,
  senTags,
  timeNeeded,
} from "@/lib/sen-taxonomy";

export function ResourceDetailView({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = ui[locale];
  const resource = resourceBySlug(slug);
  if (!resource) notFound();
  const area = senAreaBySlug(resource.area);
  const related = relatedResources(resource);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        locale={locale}
        items={[
          { href: "/", label: t.home },
          { href: "/resources", label: t.allMaterials },
          { href: area ? `/improve/${area.slug}` : "/improve", label: area ? pick(area.short, locale) : t.improveWhat },
          { label: pick(resource.title, locale) },
        ]}
      />
      <header className="mt-6">
        <p className="text-[11px] tracking-[0.22em] uppercase text-ink-soft">
          {area ? `${area.emoji} ${pick(area.title, locale)}` : resource.area}
        </p>
        <h1 className="mt-2 font-serif text-4xl leading-tight">{pick(resource.title, locale)}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{pick(resource.summary, locale)}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={printHref(resource.slug)}
            className="rounded-full bg-night px-4 py-2 text-sm text-paper-2 hover:bg-indigo"
          >
            {t.printDownload}
          </Link>
          <Link href="/resources" className="rounded-full border border-rule px-4 py-2 text-sm hover:border-gold">
            {t.allMaterials}
          </Link>
        </div>
      </header>

      <dl className="mt-8 grid gap-3 rounded-2xl border border-rule bg-paper-2 p-5 text-sm">
        <Meta label={t.suitable} value={resource.ages.map((age) => pick(labelOf(ageBands, age)!, locale)).join("／")} />
        <Meta
          label={t.challenges}
          value={resource.challenges.map((slug) => pick(labelOf(challengeTags, slug)!, locale)).join("、")}
        />
        <Meta
          label={t.alsoFor}
          value={resource.senTags.map((slug) => pick(labelOf(senTags, slug)!, locale)).join("、")}
        />
        <Meta label={t.type} value={pick(labelOf(resourceFormats, resource.format)!, locale)} />
        <Meta label={t.filterTime} value={pick(labelOf(timeNeeded, resource.time)!, locale)} />
        <Meta label={t.difficulty} value={pick(labelOf(difficultyOptions, resource.difficulty)!, locale)} />
      </dl>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">{t.howToUse}</h2>
        <p className="mt-3 leading-relaxed">{pick(resource.howToUse, locale)}</p>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl">{t.worksheet}</h2>
          <Link href={printHref(resource.slug)} className="text-sm text-teal hover:underline">
            {t.openPrint}
          </Link>
        </div>
        <div className="mt-4 rounded-2xl border border-rule bg-white p-5">
          <WorksheetView blocks={resource.worksheet} locale={locale} />
        </div>
      </section>

      {related.length ? (
        <section className="mt-12">
          <h2 className="font-serif text-2xl">{t.relatedMaterials}</h2>
          <div className="mt-4 grid gap-4">
            {related.map((item) => (
              <ResourceCard key={item.slug} resource={item} locale={locale} compact />
            ))}
          </div>
        </section>
      ) : null}
      <p className="mt-10 text-sm leading-relaxed text-ink-soft">{t.senDisclaimer}</p>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
      <dt className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
