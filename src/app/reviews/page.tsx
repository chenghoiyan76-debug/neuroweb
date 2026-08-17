import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByPillar } from "@/lib/content";

export const metadata = {
  title: "文獻回顧",
  description: "定期更新期刊論文摘要與臨床意義解析，協助專業人員掌握實證醫學趨勢。",
};

export default function Page() {
  const articles = getArticlesByPillar("reviews");
  return (
    <div>
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm text-copper">Literature Reviews</p>
          <h1 className="mt-2 font-serif text-4xl">文獻回顧</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            不追求「讀完所有論文」，而追求把方法學限制、臨床意義與跨專業接口寫清楚。每篇標示證據等級，並連回模型與治療條目。
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
