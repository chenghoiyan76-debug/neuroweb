"use client";

import Link from "next/link";
import { MindPyramid } from "@/components/MindPyramid";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { applyTerms } from "@/lib/i18n";
import { levels } from "@/lib/site";

export default function HomePage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const featured = ["map-of-our-mind", "computational-consciousness", "embodied-cognition", "eastern-philosophy"]
    .map((slug) => content.notes.find((note) => note.slug === slug))
    .filter(Boolean);

  return (
    <div>
      <section className="night-mesh px-4 py-14 text-paper-2 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.35em] text-gold uppercase">{t.heroLead}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            {locale === "en" ? "Map of Our Mind" : "心智地圖 (Map of Our Mind)"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-2/80 md:text-base">{t.heroBody}</p>
          <div className="mt-10">
            <MindPyramid />
          </div>
        </div>
      </section>

      <section className="paper-grid mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-2xl">{t.index}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {levels
            .slice()
            .reverse()
            .map((level) => {
              const count = content.domains.filter((domain) => domain.level === level.id && !domain.parent).length;
              return (
                <Link
                  key={level.id}
                  href={`/level/${level.id}`}
                  className="rounded-2xl border border-rule bg-paper-2 p-5 hover:border-gold"
                >
                  <span className="inline-block h-2 w-8 rounded-full" style={{ background: level.color }} />
                  <p className="mt-3 text-xs tracking-wide text-ink-soft">Level {level.id}</p>
                  <h3 className="mt-1 font-serif text-xl">{bilingualTitle(level.zh, level.en, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {locale === "en" ? level.description.en : level.description.zh}
                  </p>
                  <p className="mt-3 text-xs text-ink-soft">
                    {count} {t.domains}
                  </p>
                </Link>
              );
            })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-serif text-2xl">{t.featured}</h2>
        <div className="mt-5 grid gap-3">
          {featured.map((note) =>
            note ? (
              <Link
                key={note.slug}
                href={`/note/${note.slug}`}
                className="rounded-2xl border border-rule bg-paper-2 px-5 py-4 hover:border-gold"
              >
                <p className="text-xs text-ink-soft">L{note.level}</p>
                <p className="font-serif text-lg">{bilingualTitle(note.zh, note.en, locale)}</p>
                <p className="mt-1 text-sm text-ink-soft">{applyTerms(note.summary, locale)}</p>
              </Link>
            ) : null,
          )}
        </div>
      </section>
    </div>
  );
}
