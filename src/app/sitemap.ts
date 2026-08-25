import type { MetadataRoute } from "next";
import { flattenTopics, projectAreas, projectKinds, bookGenres, studySessions } from "@/lib/taxonomy";
import { abilityAreas } from "@/lib/sen-taxonomy";
import { senResources } from "@/data/sen";
import { readSiteContent } from "@/lib/repository";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await readSiteContent();
  const urls = new Set<string>([
    "/",
    "/about",
    "/contact",
    "/projects",
    "/notes",
    "/books",
    "/reflection",
    "/search",
    "/improve",
    "/resources",
  ]);

  for (const area of projectAreas) {
    urls.add(`/projects/${area.slug}`);
    for (const kind of projectKinds) {
      urls.add(`/projects/${area.slug}/${kind.slug}`);
    }
  }
  for (const project of content.projects) {
    urls.add(`/projects/${project.area}/${project.kind}/${project.slug}`);
  }
  for (const session of studySessions) {
    urls.add(`/notes/${session.slug}`);
    for (const row of flattenTopics(session.topics)) {
      urls.add(`/notes/${session.slug}/${row.path}`);
    }
  }
  for (const note of content.notes) {
    urls.add(`/notes/${note.session}/${note.topic}/${note.slug}`);
  }
  for (const genre of bookGenres) {
    urls.add(`/books/${genre.slug}`);
  }
  for (const book of content.books) {
    urls.add(`/books/${book.genre}/${book.slug}`);
  }
  for (const item of content.reflections) {
    urls.add(`/reflection/${item.slug}`);
  }
  for (const area of abilityAreas) {
    urls.add(`/improve/${area.slug}`);
    for (const situation of area.situations) {
      urls.add(`/improve/${area.slug}/${situation.slug}`);
    }
  }
  for (const resource of senResources) {
    urls.add(`/resources/${resource.slug}`);
    urls.add(`/print/${resource.slug}`);
  }

  return [...urls].map((path) => ({ url: siteUrl(path) }));
}
