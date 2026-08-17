import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { getArticle, getRelated } from "@/lib/content";
import { site } from "@/lib/taxonomy";
import type { Pillar } from "@/lib/types";

export function articleMetadata(pillar: Pillar, slug: string) {
  const article = getArticle(pillar, slug);
  if (!article) return { title: "找不到條目" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: { title: `${article.title} · ${site.name}`, description: article.summary },
  };
}

export function ArticlePage({ pillar, slug }: { pillar: Pillar; slug: string }) {
  const article = getArticle(pillar, slug);
  if (!article) notFound();
  return <ArticleView article={article} related={getRelated(article)} />;
}
