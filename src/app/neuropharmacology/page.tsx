import Link from "next/link";
import { AxisHero } from "@/components/AxisHero";
import { applyTerms, bilingualTitle, ui } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageTitle } from "@/lib/meta";
import { notesByAxis } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export async function generateMetadata() {
  return pageTitle("神經藥理學", "Neuropharmacology");
}

export default async function Page() {
  const [content, locale] = await Promise.all([readSiteContent(), getLocale()]);
  const t = ui[locale];
  return (
    <div>
      <AxisHero slug="pharmacology" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {content.pharmaGroups.map((group) => (
            <Link
              key={group.slug}
              href={`/neuropharmacology/${group.slug}`}
              className="rounded-2xl border border-rule bg-paper-2 p-6 hover:border-teal"
            >
              <p className="text-xs text-copper">{group.en}</p>
              <h2 className="mt-2 font-serif text-2xl">
                {bilingualTitle(group.zh, group.en, locale)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {applyTerms(locale === "en" ? group.summaryEn : group.summary, locale)}
              </p>
              <p className="mt-4 text-xs text-teal">
                {notesByAxis(content, "pharmacology", group.slug).length} {t.illnessCount}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
