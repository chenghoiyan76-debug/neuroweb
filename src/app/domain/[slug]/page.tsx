"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { applyTerms } from "@/lib/i18n";
import { childDomains, domainBySlug, notesInDomain } from "@/lib/query";
import { levelById } from "@/lib/site";

export default function DomainPage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const params = useParams<{ slug: string }>();
  const domain = domainBySlug(content, params.slug);
  if (!domain) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-serif text-3xl">{t.notFoundTitle}</h1>
        <p className="mt-3 text-ink-soft">{t.emptyDomain}</p>
        <Link href="/admin" className="mt-4 inline-block text-teal">
          {t.addViaLab}
        </Link>
      </div>
    );
  }
  const level = levelById(domain.level);
  const children = childDomains(content, domain.slug);
  const notes = notesInDomain(content, domain.slug);
  const extras = (content.resources ?? []).filter((resource) => resource.domain === domain.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {level ? (
        <Link href={`/level/${level.id}`} className="text-xs tracking-wide text-ink-soft hover:text-ink">
          ← Level {level.id} · {bilingualTitle(level.zh, level.en, locale)}
        </Link>
      ) : (
        <Link href="/" className="text-xs tracking-wide text-ink-soft">
          ← {t.backHome}
        </Link>
      )}
      <h1 className="mt-3 font-serif text-4xl">{bilingualTitle(domain.zh, domain.en, locale)}</h1>
      {domain.custom ? <p className="mt-2 text-xs uppercase tracking-wide text-copper">{t.customPage}</p> : null}
      <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
        {applyTerms(locale === "en" ? domain.summaryEn : domain.summary, locale)}
      </p>

      {children.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">{t.children}</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {children.map((child) => (
              <Link key={child.slug} href={`/domain/${child.slug}`} className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-gold">
                {bilingualTitle(child.zh, child.en, locale)}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-serif text-xl">{t.inThisDomain}</h2>
        {notes.length ? (
          <div className="mt-3 grid gap-2">
            {notes.map((note) => (
              <Link key={note.slug} href={`/note/${note.slug}`} className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-gold">
                <p className="font-medium">{bilingualTitle(note.zh, note.en, locale)}</p>
                <p className="mt-1 text-sm text-ink-soft">{applyTerms(note.summary, locale)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">{t.emptyDomain}</p>
        )}
      </section>

      {extras.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">{t.resources}</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {extras.map((resource) => (
              <li key={resource.id} className="rounded-xl border border-rule px-4 py-3">
                {resource.url ? (
                  <a className="text-teal underline" href={resource.url}>
                    {locale === "en" ? resource.titleEn || resource.title : resource.title}
                  </a>
                ) : (
                  resource.title
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
