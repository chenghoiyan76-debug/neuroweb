"use client";

import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { ItemCard, SectionLabel } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { latestBooks, latestNotes, sortedReflections } from "@/lib/query";
import { bookGenres, projectAreas, studySessions } from "@/lib/taxonomy";

export default function HomePage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const notes = latestNotes(content, 3);
  const books = latestBooks(content, 3);
  const reflections = sortedReflections(content).slice(0, 3);

  return (
    <div>
      <section className="night-mesh text-paper-2">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">{t.heroLead}</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight tracking-tight md:text-6xl">
              {content.profile.siteName}
            </h1>
            <p className="mt-2 font-serif text-2xl text-gold/90">{pick(content.profile.personName, locale)}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2/80">
              {pick(content.profile.bio, locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/notes" className="rounded-full bg-gold px-5 py-2 text-sm text-night hover:bg-[#e0b12a]">
                {t.explore}
              </Link>
              <Link href="/about" className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10">
                {t.about}
              </Link>
            </div>
          </div>
          <div className="grid gap-3 text-sm">
            <HomeLink href="/projects" label={t.projects} detail={locale === "en" ? "Special Needs · Mental Health" : "特殊教育需要 · 精神健康"} />
            <HomeLink href="/notes" label={t.notes} detail={locale === "en" ? "Five study sessions" : "五個研讀場次"} />
            <HomeLink href="/books" label={t.books} detail={locale === "en" ? "By genre" : "依文類"} />
            <HomeLink href="/reflection" label={t.reflection} detail={locale === "en" ? "Listed, one by one" : "逐則條列"} />
          </div>
        </div>
      </section>

      <section className="paper-grid mx-auto max-w-6xl px-4 py-14">
        <SectionLabel>{t.sessions}</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studySessions.map((session) => (
            <Link
              key={session.slug}
              href={`/notes/${session.slug}`}
              className="rounded-2xl border border-rule bg-paper-2 p-5 hover:border-gold"
            >
              <p className="text-[11px] tracking-[0.18em] uppercase" style={{ color: session.color }}>
                {pick(session.kicker, locale)}
              </p>
              <h2 className="mt-2 font-serif text-2xl">{pick(session.title, locale)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pick(session.summary, locale)}</p>
              <p className="mt-3 text-xs text-ink-soft">{pick(session.audience, locale)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 lg:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl">{t.projects}</h2>
            <Link href="/projects" className="text-sm text-teal hover:underline">
              {t.seeAll}
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {projectAreas.map((area) => (
              <ItemCard
                key={area.slug}
                href={`/projects/${area.slug}`}
                title={pick(area.title, locale)}
                summary={pick(area.summary, locale)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl">{t.books}</h2>
            <Link href="/books" className="text-sm text-teal hover:underline">
              {t.seeAll}
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {bookGenres.map((genre) => (
              <ItemCard
                key={genre.slug}
                href={`/books/${genre.slug}`}
                title={pick(genre.title, locale)}
                summary={pick(genre.summary, locale)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-paper-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-3">
          <LatestColumn
            title={t.notes}
            href="/notes"
            seeAll={t.seeAll}
            items={notes.map((note) => ({
              href: `/notes/${note.session}/${note.topic}/${note.slug}`,
              title: pick(note.title, locale),
              summary: pick(note.summary, locale),
              meta: note.updatedAt,
            }))}
          />
          <LatestColumn
            title={t.books}
            href="/books"
            seeAll={t.seeAll}
            items={books.map((book) => ({
              href: `/books/${book.genre}/${book.slug}`,
              title: book.bookTitle,
              summary: pick(book.summary, locale),
              meta: book.author,
            }))}
          />
          <LatestColumn
            title={t.reflection}
            href="/reflection"
            seeAll={t.seeAll}
            items={reflections.map((item) => ({
              href: `/reflection/${item.slug}`,
              title: pick(item.title, locale),
              summary: pick(item.excerpt, locale),
              meta: item.date,
            }))}
          />
        </div>
      </section>
    </div>
  );
}

function HomeLink({ href, label, detail }: { href: string; label: string; detail: string }) {
  return (
    <Link href={href} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10">
      <p className="font-medium">{label}</p>
      <p className="mt-1 text-xs text-paper-2/70">{detail}</p>
    </Link>
  );
}

function LatestColumn({
  title,
  href,
  seeAll,
  items,
}: {
  title: string;
  href: string;
  seeAll: string;
  items: { href: string; title: string; summary: string; meta?: string }[];
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif text-xl">{title}</h2>
        <Link href={href} className="text-xs text-teal hover:underline">
          {seeAll}
        </Link>
      </div>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <ItemCard key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}
