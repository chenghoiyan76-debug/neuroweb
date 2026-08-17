import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { articleHref, tags } from "@/lib/taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/models",
    "/psychiatry",
    "/therapy",
    "/reviews",
    "/cases",
    "/glossary",
    "/editorial",
    "/about",
    "/search",
  ].map((path) => ({
    url: `https://neuroweb.local${path}`,
    lastModified: new Date("2026-08-17"),
  }));

  const articleRoutes = articles.map((article) => ({
    url: `https://neuroweb.local${articleHref(article.pillar, article.slug)}`,
    lastModified: new Date(article.updatedAt),
  }));

  const tagRoutes = tags.map((tag) => ({
    url: `https://neuroweb.local/tags/${tag.slug}`,
    lastModified: new Date("2026-08-17"),
  }));

  return [...staticRoutes, ...articleRoutes, ...tagRoutes];
}
