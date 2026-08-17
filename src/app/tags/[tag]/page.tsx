import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByTag } from "@/lib/content";
import { tagMap, tags } from "@/lib/taxonomy";

export function generateStaticParams() {
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const meta = tagMap[tag];
  return {
    title: meta ? `${meta.zh} · 標籤` : "標籤",
    description: meta ? `與「${meta.zh}」（${meta.en}）相關的 NeuroWeb 條目。` : "標籤彙整",
  };
}

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const meta = tagMap[tag];
  if (!meta) notFound();
  const articles = getArticlesByTag(tag);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-copper">{meta.en}</p>
      <h1 className="mt-2 font-serif text-4xl">{meta.zh}</h1>
      <p className="mt-3 text-ink-soft">跨領域標籤彙整，便於同時檢索疾患、藥理與治療取向。</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={`${article.pillar}-${article.slug}`} article={article} />
        ))}
      </div>
      {articles.length === 0 ? <p className="mt-6 text-sm">此標籤尚無條目。</p> : null}
    </div>
  );
}
