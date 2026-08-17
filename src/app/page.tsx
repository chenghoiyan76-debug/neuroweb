import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/content";
import { featureSections, pillars, site } from "@/lib/taxonomy";

const featured = [
  articles.find((item) => item.slug === "cbt")!,
  articles.find((item) => item.slug === "antidepressants")!,
  articles.find((item) => item.slug === "mdd-cbt-ssri")!,
];

export default function Home() {
  return (
    <div>
      <section className="mesh-hero text-paper-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <div>
            <p className="text-sm tracking-[0.2em] text-paper-2/70">FOR MENTAL HEALTH PROFESSIONALS</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
              {site.name}
              <span className="mt-3 block text-2xl font-normal md:text-3xl">{site.nameZh}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-2/85">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/therapy/cbt"
                className="rounded-full bg-copper px-5 py-2.5 text-sm text-paper-2 hover:bg-[#7d5534]"
              >
                從 CBT 深度專題開始
              </Link>
              <Link
                href="/glossary"
                className="rounded-full border border-paper-2/30 px-5 py-2.5 text-sm hover:bg-white/10"
              >
                中英詞彙表
              </Link>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-sm">
            <p className="text-sm text-paper-2/70">本站同時完成兩件事</p>
            <ol className="mt-4 grid gap-4 text-sm leading-relaxed">
              <li>
                <span className="block font-medium">內容架構的細部規劃</span>
                以 CBT 作為深度內容測試，再展開認知模型、藥理與其他治療取向。
              </li>
              <li>
                <span className="block font-medium">可版本控管的技術平台</span>
                使用 Next.js 而非封閉 CMS，讓條目、標籤與編審狀態都能進入 Git 與同儕審查。
              </li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="paper-grid border-b border-rule">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm text-copper">Core Architecture</p>
          <h2 className="mt-2 font-serif text-3xl">三大知識支柱</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={pillar.href}
                className="rounded-2xl border border-rule bg-paper-2 p-6 hover:border-teal"
              >
                <p className="text-xs tracking-wide text-ink-soft">{pillar.kicker}</p>
                <h3 className="mt-2 font-serif text-2xl">{pillar.zh}</h3>
                <p className="mt-1 text-xs text-copper">{pillar.en}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{pillar.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-copper">Featured</p>
            <h2 className="mt-2 font-serif text-3xl">精選條目</h2>
          </div>
          <Link href="/search" className="text-sm text-teal hover:underline">
            全站搜尋
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="border-y border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-serif text-3xl">專業功能</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featureSections.map((feature) => (
              <Link
                key={feature.slug}
                href={feature.href}
                className="rounded-2xl border border-rule bg-paper p-6 hover:border-teal"
              >
                <h3 className="font-serif text-2xl">{feature.zh}</h3>
                <p className="mt-1 text-xs text-copper">{feature.en}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl bg-teal-deep px-6 py-10 text-paper-2 md:px-10">
          <h2 className="font-serif text-3xl">專業審核機制</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-paper-2/80">
            每篇條目標示審查狀態與證據等級。編輯委員會以席位而非個人品牌運作，邀請精神科醫學、臨床心理、藥理與方法學背景共同審閱，確保中文圈用語精確、臨床敘述不逾越教育用途。
          </p>
          <Link
            href="/editorial"
            className="mt-6 inline-block rounded-full bg-paper-2 px-5 py-2 text-sm text-teal-deep"
          >
            查看編審流程
          </Link>
        </div>
      </section>
    </div>
  );
}
