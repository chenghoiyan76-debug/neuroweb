import { noteEn } from "@/lib/copy";
import type { Note, SiteContent } from "@/lib/types";

export function notesByAxis(content: SiteContent, axis: Note["axis"], section?: string) {
  return content.notes.filter((note) => {
    if (note.axis !== axis) return false;
    if (section && note.section !== section) return false;
    return true;
  });
}

export function illnessesForCategory(content: SiteContent, categorySlug: string) {
  const direct = notesByAxis(content, "dsm", categorySlug);
  if (categorySlug !== "mood-disorders") return direct;
  const extra = [
    ...notesByAxis(content, "dsm", "bipolar"),
    ...notesByAxis(content, "dsm", "depressive"),
  ];
  const seen = new Set(direct.map((note) => note.slug));
  return [...direct, ...extra.filter((note) => !seen.has(note.slug))];
}

export function getNote(content: SiteContent, slug: string) {
  return content.notes.find((note) => note.slug === slug);
}

export function searchNotes(content: SiteContent, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return content.notes.filter((note) => {
    const pack = noteEn[note.slug];
    const hay = [
      note.en,
      note.zh,
      note.summary,
      pack?.summary ?? "",
      note.slug,
      note.section ?? "",
      ...note.blocks.flatMap((block) => {
        if (block.type === "p" || block.type === "h2" || block.type === "h3" || block.type === "quote") {
          return [block.text];
        }
        if (block.type === "callout") return [block.title, block.text];
        if (block.type === "ul" || block.type === "ol") return block.items;
        if (block.type === "table") return [...block.headers, ...block.rows.flat()];
        return [];
      }),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
