"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { applyTerms } from "@/lib/i18n";
import { childDomains, domainBySlug, lensNotesFor, notesInDomain, parentChain } from "@/lib/query";
import { levelById } from "@/lib/site";
import { lensMeta } from "@/data/dsm/types";
import type { DsmLens, Note } from "@/lib/types";

const lensUiKey: Record<DsmLens, "lensCognitive" | "lensBehavior" | "lensAssessment" | "lensTreatment" | "lensCase"> =
  {
    cognitive: "lensCognitive",
    behavior: "lensBehavior",
    assessment: "lensAssessment",
    treatment: "lensTreatment",
    case: "lensCase",
  };

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
  const parents = parentChain(content, domain);
  const children = childDomains(content, domain.slug);
  const lenses = lensNotesFor(content, domain.slug);
  const notes = notesInDomain(content, domain.slug).filter((item) => !item.lens);
  const extras = (content.resources ?? []).filter((resource) => resource.domain === domain.slug);
  const illnesses = children.filter((child) => child.kind === "dsm-illness");
  const chapters = children.filter((child) => child.kind === "dsm-chapter");
  const otherChildren = children.filter((child) => child.kind !== "dsm-illness" && child.kind !== "dsm-chapter");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-wide text-ink-soft">
        {level ? (
          <Link href={`/level/${level.id}`} className="hover:text-ink">
            Level {level.id} · {bilingualTitle(level.zh, level.en, locale)}
          </Link>
        ) : domain.kind === "reflection" ? (
          <Link href="/reflection">← {t.reflection}</Link>
        ) : (
          <Link href="/">← {t.backHome}</Link>
        )}
        {parents.map((parent) => (
          <span key={parent.slug} className="contents">
            <span aria-hidden>/</span>
            <Link href={`/domain/${parent.slug}`} className="hover:text-ink">
              {locale === "en" ? parent.en : parent.zh}
            </Link>
          </span>
        ))}
      </nav>
      {domain.kind === "dsm-chapter" && domain.order ? (
        <p className="mt-4 text-[11px] tracking-[0.28em] uppercase text-copper">
          {t.dsmChapters} · {String(domain.order).padStart(2, "0")}
        </p>
      ) : null}
      {domain.kind === "dsm-illness" ? (
        <p className="mt-4 text-[11px] tracking-[0.28em] uppercase text-copper">{t.dsmLenses}</p>
      ) : null}
      <h1 className="mt-3 font-serif text-4xl">{bilingualTitle(domain.zh, domain.en, locale)}</h1>
      {domain.custom ? <p className="mt-2 text-xs uppercase tracking-wide text-copper">{t.customPage}</p> : null}
      <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
        {applyTerms(locale === "en" ? domain.summaryEn : domain.summary, locale)}
      </p>

      {lenses.length ? <LensGrid notes={lenses} /> : null}

      {illnesses.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">{t.dsmIllnesses}</h2>
          <div className="mt-3 grid gap-2">
            {illnesses.map((child, index) => (
              <Link
                key={child.slug}
                href={`/domain/${child.slug}`}
                className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-gold"
              >
                <p className="text-[11px] tracking-wide text-ink-soft">
                  {String(child.order ?? index + 1).padStart(2, "0")} · {t.dsmLenses}
                </p>
                <p className="font-medium">{bilingualTitle(child.zh, child.en, locale)}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  {applyTerms(locale === "en" ? child.summaryEn : child.summary, locale)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {chapters.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">{t.dsmChapters}</h2>
          <div className="mt-3 grid gap-2">
            {chapters.map((child) => (
              <Link
                key={child.slug}
                href={`/domain/${child.slug}`}
                className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-gold"
              >
                <p className="text-[11px] tracking-wide text-ink-soft">
                  {String(child.order ?? "").padStart(2, "0")}
                </p>
                <p className="font-medium">{bilingualTitle(child.zh, child.en, locale)}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  {applyTerms(locale === "en" ? child.summaryEn : child.summary, locale)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {otherChildren.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">{t.children}</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {otherChildren.map((child) => (
              <Link
                key={child.slug}
                href={`/domain/${child.slug}`}
                className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-gold"
              >
                {child.kind === "dsm-chapter" && child.order ? (
                  <span className="mr-2 text-[11px] text-ink-soft">{String(child.order).padStart(2, "0")}</span>
                ) : null}
                {bilingualTitle(child.zh, child.en, locale)}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {notes.length ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">{lenses.length ? t.otherNotes : t.inThisDomain}</h2>
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
        </section>
      ) : lenses.length || illnesses.length || chapters.length ? null : (
        <p className="mt-10 text-sm text-ink-soft">{t.emptyDomain}</p>
      )}

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

function LensGrid({ notes }: { notes: Note[] }) {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl">{t.dsmLenses}</h2>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {notes.map((item) => {
          const lens = item.lens!;
          const meta = lensMeta[lens];
          return (
            <Link
              key={item.slug}
              href={`/note/${item.slug}`}
              className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-gold"
            >
              <p className="text-[11px] tracking-[0.18em] uppercase text-copper">{t[lensUiKey[lens]]}</p>
              <p className="mt-1 font-medium">{locale === "en" ? meta.en : meta.zh}</p>
              <p className="mt-1 text-sm text-ink-soft">
                {locale === "en" ? meta.kicker.en : meta.kicker.zh}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
