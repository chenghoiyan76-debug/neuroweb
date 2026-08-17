import Link from "next/link";
import type { Article, Pillar } from "@/lib/types";
import { evidenceLabel, statusLabel } from "@/lib/taxonomy";
import { ArticleBody } from "./ArticleBody";
import { TagList } from "./ArticleCard";

export function ArticleView({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const headings = article.blocks.filter((block) => block.type === "h2" && block.id);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_240px]">
      <article>
        <p className="text-sm text-copper">{article.englishTitle}</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{article.title}</h1>
        <p className="mt-4 max-w-3xl text-ink-soft leading-relaxed">{article.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
          <span className="rounded-full bg-teal px-2.5 py-1 text-paper-2">
            {statusLabel[article.status]}
          </span>
          <span>{evidenceLabel[article.evidence]}</span>
          <span>更新 {article.updatedAt}</span>
          <span>{article.readingMinutes} 分鐘閱讀</span>
        </div>
        <div className="mt-4">
          <TagList tags={article.tags} />
        </div>
        <dl className="mt-5 grid gap-1 text-sm text-ink-soft">
          <div>
            <dt className="inline text-ink">撰稿：</dt>
            <dd className="inline">{article.authors.join("、")}</dd>
          </div>
          <div>
            <dt className="inline text-ink">審閱席：</dt>
            <dd className="inline">{article.reviewers.join("、")}</dd>
          </div>
        </dl>
        <div className="mt-8 border-t border-rule pt-2">
          <ArticleBody blocks={article.blocks} />
        </div>
      </article>
      <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
        {headings.length > 0 ? (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-soft">
              本篇大綱
            </p>
            <nav className="grid gap-2 text-sm">
              {headings.map((heading) =>
                heading.type === "h2" ? (
                  <a key={heading.id} href={`#${heading.id}`} className="text-teal-mid hover:underline">
                    {heading.text}
                  </a>
                ) : null,
              )}
            </nav>
          </div>
        ) : null}
        {related.length > 0 ? (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-soft">
              相關條目
            </p>
            <div className="grid gap-3">
              {related.map((item) => (
                <Link
                  key={`${item.pillar}-${item.slug}`}
                  href={pillarHref(item.pillar, item.slug)}
                  className="block rounded-xl border border-rule bg-paper-2 p-3 text-sm hover:border-teal"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function pillarHref(pillar: Pillar, slug: string) {
  return `/${pillar}/${slug}`;
}
