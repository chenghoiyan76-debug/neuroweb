import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { glossary } from "@/lib/content/glossary";
import { searchArticles } from "@/lib/content";

export const metadata = {
  title: "搜尋",
  description: "跨領域搜尋 NeuroWeb 條目與詞彙。",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw) ?? "";
  const articleHits = query ? searchArticles(query) : [];
  const glossaryHits = query
    ? glossary.filter((entry) =>
        [entry.termZh, entry.termEn, entry.abbr ?? "", entry.definition]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl">跨領域搜尋</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        同一篇文章可同時帶有「神經藥理學」與「思覺失調症」等標籤。請用疾患、藥物、療法或中英術語搜尋。
      </p>
      <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/search">
        <input
          name="q"
          defaultValue={query}
          placeholder="例如：受體、CBT、思覺失調、CYP2D6"
          className="w-full rounded-full border border-rule bg-paper-2 px-4 py-3 outline-none ring-teal/30 focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-full bg-teal px-6 py-3 text-sm text-paper-2 hover:bg-teal-deep"
        >
          搜尋
        </button>
      </form>

      {query ? (
        <div className="mt-10 space-y-10">
          <section>
            <h2 className="font-serif text-2xl">條目（{articleHits.length}）</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {articleHits.map((article) => (
                <ArticleCard key={`${article.pillar}-${article.slug}`} article={article} />
              ))}
            </div>
            {articleHits.length === 0 ? (
              <p className="mt-4 text-sm text-ink-soft">沒有符合的條目，可改試疾患名稱或療法縮寫。</p>
            ) : null}
          </section>
          <section>
            <h2 className="font-serif text-2xl">詞彙（{glossaryHits.length}）</h2>
            <div className="mt-4 grid gap-2">
              {glossaryHits.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/glossary#${entry.slug}`}
                  className="rounded-xl border border-rule bg-paper-2 px-4 py-3 hover:border-teal"
                >
                  <span className="font-medium">{entry.termZh}</span>
                  <span className="ml-2 text-sm text-copper">{entry.termEn}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          {["憂鬱", "受體", "EMDR", "執行功能", "交互作用"].map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-rule px-3 py-1 hover:border-teal"
            >
              {term}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
