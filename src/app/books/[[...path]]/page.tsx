"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { Breadcrumbs, EmptyState, ItemCard, PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { bookBySlug, booksFor, genreBySlug, relatedBooks } from "@/lib/query";
import { bookGenres } from "@/lib/taxonomy";
import type { BookGenreSlug } from "@/lib/types";

export default function BooksCatchAll() {
  const params = useParams<{ path?: string[] }>();
  const path = params.path ?? [];
  const content = useContent();
  const locale = useLocale();
  const t = ui[locale];

  if (path.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <PageHero
          kicker={t.books}
          title={t.books}
          summary={
            locale === "en"
              ? "Reviews filed by genre: psychology, philosophy, neuroscience, and literature."
              : "依文類排列的書評：心理學、哲學、神經科學、文學。"
          }
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {bookGenres.map((genre) => (
            <ItemCard
              key={genre.slug}
              href={`/books/${genre.slug}`}
              title={pick(genre.title, locale)}
              summary={pick(genre.summary, locale)}
              meta={`${booksFor(content, genre.slug).length}`}
            />
          ))}
        </div>
      </div>
    );
  }

  const genre = genreBySlug(path[0]);
  if (!genre) notFound();
  const genreSlug = genre.slug as BookGenreSlug;

  if (path.length === 1) {
    const items = booksFor(content, genreSlug);
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Breadcrumbs
          locale={locale}
          items={[
            { href: "/books", label: t.books },
            { label: pick(genre.title, locale) },
          ]}
        />
        <div className="mt-6">
          <PageHero
            kicker={t.byGenre}
            title={pick(genre.title, locale)}
            summary={pick(genre.summary, locale)}
            color={genre.color}
          />
        </div>
        <div className="mt-10 grid gap-3">
          {items.length ? (
            items.map((book) => (
              <ItemCard
                key={book.id}
                href={`/books/${book.genre}/${book.slug}`}
                title={`${book.bookTitle} · ${pick(book.title, locale)}`}
                summary={pick(book.summary, locale)}
                meta={`${book.author}${book.year ? ` · ${book.year}` : ""}`}
              />
            ))
          ) : (
            <EmptyState text={t.emptySection} href="/admin" action={t.addViaAdmin} />
          )}
        </div>
      </div>
    );
  }

  if (path.length === 2) {
    const book = bookBySlug(content, genreSlug, path[1]);
    if (!book) notFound();
    const related = relatedBooks(content, book);
    return (
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Breadcrumbs
          locale={locale}
          items={[
            { href: "/books", label: t.books },
            { href: `/books/${genre.slug}`, label: pick(genre.title, locale) },
            { label: book.bookTitle },
          ]}
        />
        <div className="mt-6">
          <p className="text-sm text-ink-soft">
            {book.author}
            {book.year ? ` · ${book.year}` : ""}
            {book.rating ? ` · ${"★".repeat(book.rating)}` : ""}
          </p>
          <PageHero title={book.bookTitle} summary={pick(book.title, locale)} color={genre.color} />
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{pick(book.summary, locale)}</p>
        </div>
        <div className="mt-8">
          <ArticleBody source={book.body} />
        </div>
        {related.length ? (
          <section className="mt-12">
            <h2 className="font-serif text-xl">{t.related}</h2>
            <div className="mt-3 grid gap-2">
              {related.map((item) => (
                <Link key={item.id} href={`/books/${item.genre}/${item.slug}`} className="text-sm hover:underline">
                  {item.bookTitle}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    );
  }

  notFound();
}
