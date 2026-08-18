"use client";

import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { applyTerms } from "@/lib/i18n";
import { reflectionNotes } from "@/lib/query";
import { reflection } from "@/lib/site";

export default function ReflectionPage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const notes = reflectionNotes(content);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-[11px] tracking-[0.28em] uppercase text-copper">{t.reflectionLead}</p>
      <h1 className="mt-2 font-serif text-4xl">{bilingualTitle(reflection.zh, reflection.en, locale)}</h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{t.reflectionBody}</p>
      <section className="mt-10">
        <h2 className="font-serif text-xl">{t.notes}</h2>
        {notes.length ? (
          <div className="mt-3 grid gap-2">
            {notes.map((item) => (
              <Link
                key={item.slug}
                href={`/note/${item.slug}`}
                className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-gold"
              >
                <p className="font-medium">{bilingualTitle(item.zh, item.en, locale)}</p>
                <p className="mt-1 text-sm text-ink-soft">{applyTerms(item.summary, locale)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">{t.reflectionEmpty}</p>
        )}
      </section>
    </div>
  );
}
