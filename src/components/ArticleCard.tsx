import Link from "next/link";
import type { Article } from "@/lib/types";
import { articleHref, evidenceLabel, statusLabel, tagMap } from "@/lib/taxonomy";

export function StatusBadge({ article }: { article: Article }) {
  const tone =
    article.status === "peer-reviewed"
      ? "bg-teal text-paper-2"
      : article.status === "under-review"
        ? "bg-copper/20 text-copper"
        : "bg-rule text-ink";

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] ${tone}`}>
      {statusLabel[article.status]}
    </span>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((slug) => {
        const tag = tagMap[slug];
        return (
          <Link
            key={slug}
            href={`/tags/${slug}`}
            className="rounded-full border border-rule bg-paper-2 px-2.5 py-0.5 text-[11px] text-ink-soft hover:border-teal hover:text-teal"
          >
            {tag ? tag.zh : slug}
          </Link>
        );
      })}
    </div>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-rule bg-paper-2 p-5 shadow-[0_1px_0_rgba(28,25,21,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <StatusBadge article={article} />
        <span className="text-[11px] text-ink-soft">{article.readingMinutes} 分鐘</span>
      </div>
      <h3 className="font-serif text-xl leading-snug">
        <Link href={articleHref(article.pillar, article.slug)} className="hover:text-teal">
          {article.title}
        </Link>
      </h3>
      <p className="mt-1 text-xs tracking-wide text-copper">{article.englishTitle}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{article.summary}</p>
      <div className="mt-4">
        <TagList tags={article.tags.slice(0, 4)} />
      </div>
      <p className="mt-4 text-[11px] text-ink-soft">{evidenceLabel[article.evidence]}</p>
    </article>
  );
}
