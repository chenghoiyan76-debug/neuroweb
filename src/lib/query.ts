import type { Domain, Note, Resource, SiteContent } from "@/lib/types";

export function noteHref(note: Note) {
  return `/note/${note.slug}`;
}

export function domainHref(domain: Domain | string) {
  const slug = typeof domain === "string" ? domain : domain.slug;
  return `/domain/${slug}`;
}

export function levelHref(level: number) {
  return `/level/${level}`;
}

export function notesInDomain(content: SiteContent, slug: string): Note[] {
  return content.notes.filter((note) => note.domain === slug);
}

export function isReflectionDomain(domain: { slug: string; kind?: string }) {
  return domain.slug === "self-reflection" || domain.kind === "reflection";
}

export function reflectionNotes(content: SiteContent): Note[] {
  return content.notes.filter((note) => note.domain === "self-reflection");
}

export function childDomains(content: SiteContent, slug: string): Domain[] {
  return content.domains
    .filter((domain) => domain.parent === slug)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.zh.localeCompare(b.zh, "zh-Hant"));
}

export function parentChain(content: SiteContent, domain: Domain): Domain[] {
  const chain: Domain[] = [];
  let current: Domain | undefined = domain;
  const seen = new Set<string>();
  while (current?.parent && !seen.has(current.parent)) {
    seen.add(current.parent);
    const parent = domainBySlug(content, current.parent);
    if (!parent) break;
    chain.unshift(parent);
    current = parent;
  }
  return chain;
}

export function lensNotesFor(content: SiteContent, slug: string): Note[] {
  const order = ["cognitive", "behavior", "assessment", "treatment", "case"] as const;
  return order
    .map((lens) => content.notes.find((item) => item.domain === slug && item.lens === lens))
    .filter((item): item is Note => Boolean(item));
}

export function domainsAtLevel(content: SiteContent, level: number): Domain[] {
  return content.domains.filter((domain) => domain.level === level && !domain.parent);
}

export function domainBySlug(content: SiteContent, slug: string) {
  return content.domains.find((domain) => domain.slug === slug);
}

export function noteBySlug(content: SiteContent, slug: string) {
  return content.notes.find((note) => note.slug === slug);
}

export function relatedNotes(content: SiteContent, note: Note): Note[] {
  const hits = note.related
    .map((slug) => noteBySlug(content, slug))
    .filter((item): item is Note => Boolean(item));
  return hits;
}

export function resourcesForNote(content: SiteContent, slug: string): Resource[] {
  const attached = content.notes.find((note) => note.slug === slug)?.resources ?? [];
  const extra = (content.resources ?? []).filter((resource) => resource.noteSlug === slug);
  const seen = new Set<string>();
  return [...attached, ...extra].filter((resource) => {
    if (seen.has(resource.id)) return false;
    seen.add(resource.id);
    return true;
  });
}

export function unfiledResources(content: SiteContent): Resource[] {
  return (content.resources ?? []).filter((resource) => !resource.noteSlug && !resource.domain);
}

export function customDomains(content: SiteContent): Domain[] {
  return content.domains.filter(
    (domain) => (domain.custom || domain.level === 0) && domain.kind !== "reflection",
  );
}

export function searchBrain(content: SiteContent, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { notes: [] as Note[], domains: [] as Domain[], resources: [] as Resource[] };
  const notes = content.notes.filter((note) =>
    [note.en, note.zh, note.summary, note.summaryEn, note.tags.join(" "), note.slug]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
  const domains = content.domains.filter((domain) =>
    [domain.en, domain.zh, domain.summary, domain.summaryEn, domain.slug].join(" ").toLowerCase().includes(q),
  );
  const resources = (content.resources ?? []).filter((resource) =>
    [resource.title, resource.titleEn, resource.note, resource.url, resource.kind]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
  return { notes, domains, resources };
}
