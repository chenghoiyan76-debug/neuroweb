import Link from "next/link";
import { pick, type Locale } from "@/lib/i18n";
import { printHref, resourceHref } from "@/lib/sen-catalog";
import {
  ageBands,
  challengeTags,
  difficultyOptions,
  labelOf,
  resourceFormats,
  senAreaBySlug,
  senTags,
  starsLabel,
} from "@/lib/sen-taxonomy";
import type { SenResource } from "@/lib/sen-types";

export function ResourceCard({
  resource,
  locale,
  compact,
}: {
  resource: SenResource;
  locale: Locale;
  compact?: boolean;
}) {
  const area = senAreaBySlug(resource.area);
  const ages = resource.ages.map((age) => pick(labelOf(ageBands, age) ?? { zh: age, en: age }, locale)).join("／");
  const challenges = resource.challenges
    .slice(0, 4)
    .map((slug) => pick(labelOf(challengeTags, slug) ?? { zh: slug, en: slug }, locale));
  const sen = resource.senTags
    .slice(0, 3)
    .map((slug) => pick(labelOf(senTags, slug) ?? { zh: slug, en: slug }, locale));
  const format = pick(labelOf(resourceFormats, resource.format) ?? resourceFormats[0].title, locale);

  return (
    <article className="flex flex-col rounded-2xl border border-rule bg-paper-2 p-5 transition hover:border-gold">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">
          {area ? `${area.emoji} ${pick(area.short, locale)}` : resource.area}
        </p>
        <p className="text-gold" aria-label={pick(labelOf(difficultyOptions, resource.difficulty) ?? { zh: "", en: "" }, locale)}>
          {starsLabel(resource.difficulty)}
        </p>
      </div>
      <h3 className="mt-2 font-serif text-xl leading-snug">
        <Link href={resourceHref(resource)} className="hover:text-teal-deep">
          {pick(resource.title, locale)}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pick(resource.summary, locale)}</p>
      {compact ? null : (
        <dl className="mt-4 grid gap-2 text-[13px]">
          <TagRow label={locale === "en" ? "Fits" : "適合"} value={ages} />
          <TagRow label={locale === "en" ? "Difficulties" : "困難"} value={challenges.join("、")} />
          <TagRow label={locale === "en" ? "Also used for" : "適用"} value={sen.join("、")} muted />
          <TagRow label={locale === "en" ? "Type" : "類型"} value={format} />
        </dl>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={resourceHref(resource)}
          className="rounded-full bg-night px-3 py-1.5 text-[12px] text-paper-2 hover:bg-indigo"
        >
          {locale === "en" ? "Open" : "打開教材"}
        </Link>
        <Link href={printHref(resource.slug)} className="rounded-full border border-rule px-3 py-1.5 text-[12px] hover:border-gold">
          {locale === "en" ? "Print / PDF" : "列印／下載"}
        </Link>
      </div>
    </article>
  );
}

function TagRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={`grid grid-cols-[4.5rem_1fr] gap-2 ${muted ? "text-ink-soft" : ""}`}>
      <dt className="text-[11px] tracking-[0.12em] uppercase text-ink-soft">{label}</dt>
      <dd className="leading-snug">{value}</dd>
    </div>
  );
}
