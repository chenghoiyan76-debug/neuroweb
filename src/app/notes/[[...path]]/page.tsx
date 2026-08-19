"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { Breadcrumbs, EmptyState, ItemCard, PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import {
  noteByPath,
  notesForSession,
  notesForTopic,
  relatedNotes,
  sessionBySlug,
} from "@/lib/query";
import { findTopic } from "@/lib/taxonomy";
import type { NoteSessionSlug } from "@/lib/types";

export default function NotesCatchAll() {
  const params = useParams<{ path?: string[] }>();
  const path = params.path ?? [];
  const content = useContent();
  const locale = useLocale();
  const t = ui[locale];

  if (path.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <PageHero
          kicker={t.notes}
          title={t.notes}
          summary={
            locale === "en"
              ? "Five sessions: Educational, Clinical, Mental Health (public), Neuroscience, and Psychology."
              : "五個場次：教育、臨床、精神健康（公眾）、神經科學、心理學。"
          }
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["educational", "clinical", "mental-health", "neuroscience", "psychology"].map((slug) => {
            const session = sessionBySlug(content, slug)!;
            return (
              <ItemCard
                key={slug}
                href={`/notes/${slug}`}
                title={pick(session.title, locale)}
                summary={pick(session.summary, locale)}
                meta={pick(session.kicker, locale)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  const session = sessionBySlug(content, path[0]);
  if (!session) notFound();
  const sessionSlug = session.slug as NoteSessionSlug;

  if (path.length === 1) {
    const notes = notesForSession(content, sessionSlug);
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Breadcrumbs
          locale={locale}
          items={[
            { href: "/notes", label: t.notes },
            { label: pick(session.title, locale) },
          ]}
        />
        <div className="mt-6">
          <PageHero
            kicker={pick(session.audience, locale)}
            title={pick(session.title, locale)}
            summary={pick(session.summary, locale)}
            color={session.color}
          />
        </div>
        <section className="mt-10">
          <h2 className="font-serif text-xl">{t.topic}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {session.topics.map((topic) => (
              <div key={topic.slug} className="rounded-2xl border border-rule bg-paper-2 p-4">
                <Link href={`/notes/${session.slug}/${topic.slug}`} className="font-serif text-lg hover:text-teal-deep">
                  {pick(topic.title, locale)}
                </Link>
                <p className="mt-2 text-sm text-ink-soft">{pick(topic.summary, locale)}</p>
                {topic.children?.length ? (
                  <div className="mt-3 grid gap-1 border-t border-rule pt-3">
                    {topic.children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`/notes/${session.slug}/${topic.slug}/${child.slug}`}
                        className="text-sm text-teal hover:underline"
                      >
                        {pick(child.title, locale)}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
        {notes.length ? (
          <section className="mt-12">
            <h2 className="font-serif text-xl">{t.latest}</h2>
            <div className="mt-4 grid gap-3">
              {notes.slice(0, 6).map((note) => (
                <ItemCard
                  key={note.id}
                  href={`/notes/${note.session}/${note.topic}/${note.slug}`}
                  title={pick(note.title, locale)}
                  summary={pick(note.summary, locale)}
                  meta={note.updatedAt}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    );
  }

  const rest = path.slice(1);
  const topic = findTopic(session.topics, rest);
  if (topic) {
    const topicPath = rest.join("/");
    const notes = notesForTopic(content, sessionSlug, topicPath);
    const crumbs = [
      { href: "/notes", label: t.notes },
      { href: `/notes/${session.slug}`, label: pick(session.title, locale) },
    ];
    let acc = "";
    rest.forEach((segment, index) => {
      acc = acc ? `${acc}/${segment}` : segment;
      const node = findTopic(session.topics, acc.split("/"));
      crumbs.push({
        href: index === rest.length - 1 ? "" : `/notes/${session.slug}/${acc}`,
        label: node ? pick(node.title, locale) : segment,
      });
    });
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Breadcrumbs locale={locale} items={crumbs.map((item) => ({ ...item, href: item.href || undefined }))} />
        <div className="mt-6">
          <PageHero
            kicker={pick(session.title, locale)}
            title={pick(topic.title, locale)}
            summary={pick(topic.summary, locale)}
            color={session.color}
          />
        </div>
        {topic.children?.length ? (
          <section className="mt-8 grid gap-3 md:grid-cols-2">
            {topic.children.map((child) => (
              <ItemCard
                key={child.slug}
                href={`/notes/${session.slug}/${topicPath}/${child.slug}`}
                title={pick(child.title, locale)}
                summary={pick(child.summary, locale)}
              />
            ))}
          </section>
        ) : null}
        <section className="mt-10">
          <h2 className="font-serif text-xl">{t.notes}</h2>
          <div className="mt-4 grid gap-3">
            {notes.length ? (
              notes.map((note) => (
                <ItemCard
                  key={note.id}
                  href={`/notes/${note.session}/${note.topic}/${note.slug}`}
                  title={pick(note.title, locale)}
                  summary={pick(note.summary, locale)}
                  meta={note.updatedAt}
                />
              ))
            ) : (
              <EmptyState text={t.emptySection} href="/admin" action={t.addViaAdmin} />
            )}
          </div>
        </section>
      </div>
    );
  }

  const noteSlug = rest[rest.length - 1];
  const topicPath = rest.slice(0, -1).join("/");
  if (!topicPath) notFound();
  const parentTopic = findTopic(session.topics, rest.slice(0, -1));
  const note = noteByPath(content, sessionSlug, topicPath, noteSlug);
  if (!note) notFound();
  const related = relatedNotes(content, note);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        locale={locale}
        items={[
          { href: "/notes", label: t.notes },
          { href: `/notes/${session.slug}`, label: pick(session.title, locale) },
          {
            href: `/notes/${session.slug}/${topicPath}`,
            label: parentTopic ? pick(parentTopic.title, locale) : topicPath,
          },
          { label: pick(note.title, locale) },
        ]}
      />
      <div className="mt-6">
        <PageHero title={pick(note.title, locale)} summary={pick(note.summary, locale)} color={session.color} />
        <p className="mt-3 text-sm text-ink-soft">
          {t.updated} {note.updatedAt}
        </p>
        {note.tags.length ? (
          <p className="mt-2 text-xs text-ink-soft">
            {t.tags}: {note.tags.join(" · ")}
          </p>
        ) : null}
      </div>
      <div className="mt-8">
        <ArticleBody source={note.body} />
      </div>
      {related.length ? (
        <section className="mt-12">
          <h2 className="font-serif text-xl">{t.related}</h2>
          <div className="mt-3 grid gap-2">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/notes/${item.session}/${item.topic}/${item.slug}`}
                className="text-sm hover:underline"
              >
                {pick(item.title, locale)}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
