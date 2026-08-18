"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { applyTerms } from "@/lib/i18n";
import { childDomains, domainsAtLevel, notesInDomain } from "@/lib/query";
import { levelById } from "@/lib/site";

export default function LevelPage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const params = useParams<{ level: string }>();
  const id = Number(params.level);
  const meta = levelById(id);
  if (!meta) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-serif text-3xl">{t.notFoundTitle}</h1>
        <Link href="/" className="mt-4 inline-block text-teal">
          {t.notFoundHome}
        </Link>
      </div>
    );
  }

  const roots = domainsAtLevel(content, meta.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: meta.color }}>
        Level {meta.id}
      </p>
      <h1 className="mt-2 font-serif text-4xl">{bilingualTitle(meta.zh, meta.en, locale)}</h1>
      <p className="mt-2 text-ink-soft">{locale === "en" ? meta.kicker.en : meta.kicker.zh}</p>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
        {locale === "en" ? meta.description.en : meta.description.zh}
      </p>
      <div className="mt-10 grid gap-4">
        {roots.map((domain) => {
          const children = childDomains(content, domain.slug);
          const notes = notesInDomain(content, domain.slug);
          return (
            <section key={domain.slug} className="rounded-2xl border border-rule bg-paper-2 p-5">
              <Link href={`/domain/${domain.slug}`} className="font-serif text-2xl hover:text-teal-deep">
                {bilingualTitle(domain.zh, domain.en, locale)}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {applyTerms(locale === "en" ? domain.summaryEn : domain.summary, locale)}
              </p>
              {children.length ? (
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {children.map((child) => (
                    <Link
                      key={child.slug}
                      href={`/domain/${child.slug}`}
                      className="rounded-xl border border-rule bg-paper px-3 py-3 text-sm hover:border-gold"
                    >
                      {bilingualTitle(child.zh, child.en, locale)}
                    </Link>
                  ))}
                </div>
              ) : null}
              {notes.length ? (
                <p className="mt-3 text-xs text-ink-soft">
                  {notes.length} {t.notes}
                </p>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}
