import { caseArticles } from "./cases";
import { modelArticles } from "./models";
import { psychiatryArticles } from "./psychiatry";
import { reviewArticles } from "./reviews";
import { therapyArticles } from "./therapy";
import type { Article, Pillar } from "../types";
import { articleHref } from "../taxonomy";

export const articles: Article[] = [
  ...modelArticles,
  ...psychiatryArticles,
  ...therapyArticles,
  ...reviewArticles,
  ...caseArticles,
];

export function getArticlesByPillar(pillar: Pillar) {
  return articles.filter((article) => article.pillar === pillar);
}

export function getArticle(pillar: Pillar, slug: string) {
  return articles.find((article) => article.pillar === pillar && article.slug === slug);
}

export function getArticlesByTag(tag: string) {
  return articles.filter((article) => article.tags.includes(tag));
}

export function getRelated(article: Article, limit = 3) {
  const scored = articles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      candidate,
      score: candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.candidate);
}

export function searchArticles(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return articles.filter((article) => {
    const haystack = [
      article.title,
      article.englishTitle,
      article.summary,
      article.tags.join(" "),
      article.blocks
        .map((block) => {
          if (block.type === "p" || block.type === "h2" || block.type === "h3") return block.text;
          if (block.type === "quote") return block.text;
          if (block.type === "callout") return `${block.title} ${block.text}`;
          if (block.type === "ul" || block.type === "ol") return block.items.join(" ");
          if (block.type === "table") return [...block.headers, ...block.rows.flat()].join(" ");
          return "";
        })
        .join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export { articleHref };
