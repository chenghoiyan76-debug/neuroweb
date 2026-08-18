"use client";

import Link from "next/link";
import { ArticleBody } from "@/components/ArticleBody";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { localizeBlocks } from "@/lib/localize";
import { applyTerms } from "@/lib/i18n";
import { domainBySlug, relatedNotes, resourcesForNote } from "@/lib/query";
import { levelById, reflection } from "@/lib/site";
import type { Note } from "@/lib/types";

export function NoteView({ note }: { note: Note }) {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const domain = domainBySlug(content, note.domain);
  const isReflection = note.domain === reflection.slug || domain?.kind === "reflection";
  const level = levelById(note.level);
  const related = relatedNotes(content, note);
  const resources = resourcesForNote(content, note.slug);
  const blocks = localizeBlocks(note.blocks, locale);
  const summary = applyTerms(locale === "en" ? note.summaryEn || note.summary : note.summary, locale);
  const kicker = isReflection
    ? t.reflection
    : `${level ? `Level ${level.id}` : t.inbox} · ${domain ? bilingualTitle(domain.zh, domain.en, locale) : note.domain}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-[11px] tracking-[0.25em] text-copper uppercase">
        {isReflection ? (
          <Link href={reflection.href} className="hover:text-ink">
            {kicker}
          </Link>
        ) : (
          kicker
        )}
      </p>
      <h1 className="mt-2 font-serif text-4xl leading-tight">{bilingualTitle(note.zh, note.en, locale)}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{summary}</p>
      <p className="mt-3 text-xs text-ink-soft">
        {t.updated} {note.updatedAt}
      </p>
      <div className="mt-8">
        <ArticleBody blocks={blocks} />
      </div>
      {resources.length ? (
        <section className="mt-10 rounded-2xl border border-rule bg-paper-2 p-5">
          <h2 className="font-serif text-xl">{t.resources}</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {resources.map((resource) => (
              <li key={resource.id}>
                {resource.url ? (
                  <a className="text-teal underline-offset-2 hover:underline" href={resource.url}>
                    {locale === "en" ? resource.titleEn || resource.title : resource.title}
                  </a>
                ) : (
                  <span>{locale === "en" ? resource.titleEn || resource.title : resource.title}</span>
                )}
                <span className="ml-2 text-[11px] uppercase tracking-wide text-ink-soft">{resource.kind}</span>
                {resource.note ? <p className="mt-1 text-ink-soft">{resource.note}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {related.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">{t.related}</h2>
          <p className="mt-1 text-sm text-ink-soft">{t.relatedHint}</p>
          <div className="mt-4 grid gap-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/note/${item.slug}`}
                className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-gold"
              >
                <span className="block text-xs text-ink-soft">L{item.level}</span>
                {bilingualTitle(item.zh, item.en, locale)}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
