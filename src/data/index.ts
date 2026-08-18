import { clinicalNotes } from "./clinical";
import { indexNotes } from "./indexNotes";
import { domains } from "./taxonomy";
import type { Note, Resource, SiteContent } from "@/lib/types";

const bySlug = new Map<string, Note>();
for (const item of [...indexNotes, ...clinicalNotes]) {
  bySlug.set(item.slug, item);
}

const notes = [...bySlug.values()];

const resources: Resource[] = [
  {
    id: "inbox-starter",
    title: "尚未歸檔的資源會出現在這裡",
    titleEn: "Unfiled resources land here",
    kind: "note",
    note: "從 Lab 後門新增連結、論文、書籍或媒體。之後再掛到某個領域或筆記。",
  },
  {
    id: "predictive-coding-entry",
    title: "預測編碼作為底層運算隱喻",
    titleEn: "Predictive coding as a base computational metaphor",
    kind: "note",
    noteSlug: "computational-consciousness",
    note: "把感覺當成對預測誤差的修正，而不是被動照相。",
  },
];

export const seedContent: SiteContent = {
  version: 1,
  updatedAt: "2026-08-18",
  domains,
  notes,
  resources,
};
