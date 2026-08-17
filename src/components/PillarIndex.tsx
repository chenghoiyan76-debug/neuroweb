import type { ReactNode } from "react";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import type { Article, PillarMeta } from "@/lib/types";

export function PillarIndex({
  meta,
  articles,
  extra,
}: {
  meta: PillarMeta;
  articles: Article[];
  extra?: ReactNode;
}) {
  return (
    <div>
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm tracking-wide text-copper">{meta.en}</p>
          <h1 className="mt-2 font-serif text-4xl">{meta.zh}</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{meta.description}</p>
          {extra}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-soft">
          也可從
          <Link href="/glossary" className="mx-1 underline">
            詞彙表
          </Link>
          或
          <Link href="/search" className="mx-1 underline">
            跨領域搜尋
          </Link>
          進入。
        </p>
      </section>
    </div>
  );
}
