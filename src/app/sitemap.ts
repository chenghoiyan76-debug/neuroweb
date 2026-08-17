import type { MetadataRoute } from "next";
import { noteHrefBySlug } from "@/lib/paths";
import { readSiteContent } from "@/lib/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await readSiteContent();
  const staticRoutes = [
    "",
    "/dsm",
    "/symptoms",
    "/neuropharmacology",
    "/interventions",
    "/fundamentals",
    "/about",
    "/search",
  ].map((path) => ({
    url: `https://neuropsych-integrator.local${path}`,
    lastModified: new Date(content.updatedAt),
  }));

  const notes = content.notes.map((note) => ({
    url: `https://neuropsych-integrator.local${noteHrefBySlug(note)}`,
    lastModified: new Date(note.updatedAt),
  }));

  return [...staticRoutes, ...notes];
}
