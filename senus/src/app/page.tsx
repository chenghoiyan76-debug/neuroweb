"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { pick, ui } from "@/lib/i18n";
import { areaCounts } from "@/lib/sen-catalog";
import { abilityAreas, problemCards } from "@/lib/sen-taxonomy";

export default function HomePage() {
  const locale = useLocale();
  const t = ui[locale];
  const counts = areaCounts();

  return (
    <div>
      <section className="night-mesh text-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">{t.heroLead}</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            {t.todayQuestion}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-paper-2/80">{t.heroBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/improve" className="rounded-full bg-gold px-5 py-2 text-sm text-night hover:bg-[#e0b12a]">
              {t.improveWhat}
            </Link>
            <Link href="/resources" className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10">
              {t.allMaterials}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-[11px] tracking-[0.22em] uppercase text-ink-soft">{locale === "en" ? "Start from a real difficulty" : "由一件實際困難開始"}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((problem) => (
            <Link
              key={problem.slug}
              href={`/improve/${problem.area}/${problem.situation}`}
              className="rounded-2xl border border-rule bg-paper-2 px-5 py-4 transition hover:border-gold"
            >
              <p className="text-2xl">{problem.emoji}</p>
              <h2 className="mt-2 font-serif text-2xl leading-snug">{pick(problem.label, locale)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pick(problem.hint, locale)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl">{t.browseAreas}</h2>
            <Link href="/improve" className="text-sm text-teal hover:underline">
              {t.seeAll}
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {abilityAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/improve/${area.slug}`}
                className="rounded-2xl border border-rule bg-paper px-4 py-4 hover:border-gold"
              >
                <p className="text-xl">{area.emoji}</p>
                <h3 className="mt-2 font-serif text-lg leading-snug">{pick(area.short, locale)}</h3>
                <p className="mt-2 text-xs text-ink-soft">
                  {counts[area.slug] ?? 0} {t.resourceCount}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-2xl">{t.howItWorks}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Step n="1" title={t.layer1} body={t.layer1Body} />
          <Step n="2" title={t.layer2} body={t.layer2Body} />
          <Step n="3" title={t.layer3} body={t.layer3Body} />
        </div>
        <div className="mt-8 rounded-2xl border border-rule bg-paper-2 px-5 py-5">
          <p className="text-[11px] tracking-[0.22em] uppercase text-teal">{t.udlNote}</p>
          <p className="mt-2 max-w-3xl leading-relaxed">{t.udlBody}</p>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-soft">{t.senDisclaimer}</p>
      </section>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-rule bg-paper-2 p-5">
      <p className="text-[11px] tracking-[0.22em] uppercase text-gold">{n}</p>
      <h3 className="mt-2 font-serif text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
