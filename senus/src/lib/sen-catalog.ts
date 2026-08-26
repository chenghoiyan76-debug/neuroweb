import { challengeTags, senAreaBySlug } from "@/lib/sen-taxonomy";
import type { SenFilters, SenResource } from "@/lib/sen-types";
import { senResources } from "@/data/sen";

export function allSenResources(): SenResource[] {
  return senResources;
}

export function resourceBySlug(slug: string) {
  return senResources.find((item) => item.slug === slug);
}

export function resourcesForArea(area: string) {
  return senResources.filter((item) => item.area === area);
}

export function resourcesForSituation(area: string, situation: string) {
  return senResources.filter((item) => item.area === area && item.situations.includes(situation));
}

export function relatedResources(resource: SenResource, limit = 4) {
  const scored = senResources
    .filter((item) => item.slug !== resource.slug)
    .map((item) => {
      let score = 0;
      if (item.area === resource.area) score += 4;
      score += item.situations.filter((s) => resource.situations.includes(s)).length * 3;
      score += item.challenges.filter((c) => resource.challenges.includes(c)).length;
      return { item, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((row) => row.item);
}

function hay(resource: SenResource) {
  const challengeNames = resource.challenges
    .map((slug) => challengeTags.find((tag) => tag.slug === slug))
    .flatMap((tag) => (tag ? [tag.title.zh, tag.title.en] : []));
  return [
    resource.slug,
    resource.title.zh,
    resource.title.en,
    resource.summary.zh,
    resource.summary.en,
    resource.howToUse.zh,
    resource.howToUse.en,
    resource.area,
    ...resource.situations,
    ...resource.challenges,
    ...challengeNames,
    ...resource.senTags,
    resource.format,
  ]
    .join(" ")
    .toLowerCase();
}

export function filterResources(filters: SenFilters = {}): SenResource[] {
  const query = filters.query?.trim().toLowerCase();
  return senResources.filter((item) => {
    if (filters.area && item.area !== filters.area) return false;
    if (filters.situation && !item.situations.includes(filters.situation)) return false;
    if (filters.ages?.length && !filters.ages.some((age) => item.ages.includes(age))) return false;
    if (filters.levels?.length && !filters.levels.some((level) => item.levels.includes(level))) return false;
    if (filters.senTags?.length && !filters.senTags.some((tag) => item.senTags.includes(tag))) return false;
    if (filters.formats?.length && !filters.formats.includes(item.format)) return false;
    if (filters.times?.length && !filters.times.includes(item.time)) return false;
    if (filters.difficulties?.length && !filters.difficulties.includes(item.difficulty)) return false;
    if (filters.challenges?.length && !filters.challenges.some((c) => item.challenges.includes(c))) return false;
    if (query && !hay(item).includes(query)) return false;
    return true;
  });
}

export function areaCounts() {
  return senResources.reduce<Record<string, number>>((acc, item) => {
    acc[item.area] = (acc[item.area] ?? 0) + 1;
    return acc;
  }, {});
}

export function resourceHref(resource: SenResource) {
  return `/resources/${resource.slug}`;
}

export function areaHref(slug: string) {
  return senAreaBySlug(slug) ? `/improve/${slug}` : "/improve";
}

export function situationHref(area: string, situation: string) {
  return `/improve/${area}/${situation}`;
}

export function printHref(slug: string) {
  return `/print/${slug}`;
}

export function pdfHref(slug: string, locale: "zh" | "en") {
  return `/worksheets/${slug}-${locale}.pdf`;
}
