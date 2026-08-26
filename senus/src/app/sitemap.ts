import type { MetadataRoute } from "next";
import { senResources } from "@/data/sen";
import { abilityAreas } from "@/lib/sen-taxonomy";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = new Set<string>(["/", "/about", "/improve", "/resources", "/search"]);
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
