"use client";

import { notFound, useParams } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { Breadcrumbs, PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { reflectionBySlug } from "@/lib/query";

export default function ReflectionItemPage() {
  const params = useParams<{ slug: string }>();
  const content = useContent();
  const locale = useLocale();
  const t = ui[locale];
  const item = reflectionBySlug(content, params.slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        locale={locale}
        items={[
          { href: "/reflection", label: t.reflection },
          { label: pick(item.title, locale) },
        ]}
      />
      <div className="mt-6">
        <p className="text-sm text-ink-soft">{item.date}</p>
        <PageHero title={pick(item.title, locale)} summary={pick(item.excerpt, locale)} color="#9a6840" />
      </div>
      <div className="mt-8">
        <ArticleBody source={item.body} />
      </div>
    </article>
  );
}
