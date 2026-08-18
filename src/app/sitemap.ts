import type { MetadataRoute } from "next";
import { seedContent } from "@/data";
import { levels } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/search", "/about", "/reflection", ...levels.map((level) => `/level/${level.id}`)];
  const domains = seedContent.domains.map((domain) => `/domain/${domain.slug}`);
  const notes = seedContent.notes.map((note) => `/note/${note.slug}`);
  return [...staticPaths, ...domains, ...notes].map((path) => ({
    url: path || "/",
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));
}
