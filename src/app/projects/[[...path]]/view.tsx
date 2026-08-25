"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { Breadcrumbs, EmptyState, ItemCard, PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { areaBySlug, projectBySlug, projectsFor, relatedProjects } from "@/lib/query";
import { projectKinds } from "@/lib/taxonomy";
import type { ProjectAreaSlug, ProjectKindSlug } from "@/lib/types";

export function ProjectsCatchAll() {
  const params = useParams<{ path?: string[] }>();
  const path = params.path ?? [];
  const content = useContent();
  const locale = useLocale();
  const t = ui[locale];

  if (path.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <PageHero kicker={t.projects} title={t.projects} summary={locale === "en"
          ? "Two streams of practice: special needs, and mental health. Each has programmes and resources."
          : "兩條實踐線：特殊教育需要與精神健康。各有計劃與資源。"} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {["special-needs", "mental-health"].map((slug) => {
            const area = areaBySlug(slug)!;
            return (
              <ItemCard
                key={slug}
                href={`/projects/${slug}`}
                title={pick(area.title, locale)}
                summary={pick(area.summary, locale)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  const area = areaBySlug(path[0]);
  if (!area) notFound();
  const areaSlug = area.slug as ProjectAreaSlug;

  if (path.length === 1) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Breadcrumbs
          locale={locale}
          items={[
            { href: "/projects", label: t.projects },
            { label: pick(area.title, locale) },
          ]}
        />
        <div className="mt-6">
          <PageHero kicker={t.projects} title={pick(area.title, locale)} summary={pick(area.summary, locale)} color={area.color} />
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projectKinds.map((kind) => (
            <ItemCard
              key={kind.slug}
              href={`/projects/${area.slug}/${kind.slug}`}
              title={pick(kind.title, locale)}
              summary={pick(kind.summary, locale)}
              meta={`${projectsFor(content, areaSlug, kind.slug).length}`}
            />
          ))}
        </div>
      </div>
    );
  }

  const kind = projectKinds.find((item) => item.slug === path[1]);
  if (!kind) notFound();
  const kindSlug = kind.slug as ProjectKindSlug;

  if (path.length === 2) {
    const items = projectsFor(content, areaSlug, kindSlug);
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Breadcrumbs
          locale={locale}
          items={[
            { href: "/projects", label: t.projects },
            { href: `/projects/${area.slug}`, label: pick(area.title, locale) },
            { label: pick(kind.title, locale) },
          ]}
        />
        <div className="mt-6">
          <PageHero
            kicker={pick(area.title, locale)}
            title={pick(kind.title, locale)}
            summary={pick(kind.summary, locale)}
            color={area.color}
          />
        </div>
        <div className="mt-10 grid gap-3">
          {items.length ? (
            items.map((item) => (
              <ItemCard
                key={item.id}
                href={`/projects/${area.slug}/${kind.slug}/${item.slug}`}
                title={pick(item.title, locale)}
                summary={pick(item.summary, locale)}
                meta={item.updatedAt}
              />
            ))
          ) : (
            <EmptyState text={t.emptySection} />
          )}
        </div>
      </div>
    );
  }

  if (path.length === 3) {
    const item = projectBySlug(content, areaSlug, kindSlug, path[2]);
    if (!item) notFound();
    const related = relatedProjects(content, item);
    return (
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Breadcrumbs
          locale={locale}
          items={[
            { href: "/projects", label: t.projects },
            { href: `/projects/${area.slug}`, label: pick(area.title, locale) },
            { href: `/projects/${area.slug}/${kind.slug}`, label: pick(kind.title, locale) },
            { label: pick(item.title, locale) },
          ]}
        />
        <div className="mt-6">
          <PageHero title={pick(item.title, locale)} summary={pick(item.summary, locale)} color={area.color} />
          <p className="mt-3 text-sm text-ink-soft">
            {t.updated} {item.updatedAt}
          </p>
        </div>
        <div className="mt-8">
          <ArticleBody source={item.body} />
        </div>
        {item.links.length ? (
          <ul className="mt-8 grid gap-2 text-sm">
            {item.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} className="text-teal hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {related.length ? (
          <section className="mt-12">
            <h2 className="font-serif text-xl">{t.related}</h2>
            <div className="mt-3 grid gap-2">
              {related.map((rel) => (
                <Link key={rel.id} href={`/projects/${rel.area}/${rel.kind}/${rel.slug}`} className="text-sm hover:underline">
                  {pick(rel.title, locale)}
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
