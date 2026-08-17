import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByPillar } from "@/lib/content";

export const metadata = {
  title: "個案研討",
  description: "以匿名教學個案分享評估與處遇計畫，促進臨床推理交流。",
};

export default function Page() {
  const articles = getArticlesByPillar("cases");
  return (
    <div>
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm text-copper">Case Studies</p>
          <h1 className="mt-2 font-serif text-4xl">個案研討</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            所有個案皆為合成教學材料，用於練習概念化與跨專業處遇，而非描寫真實可辨識個人。
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
