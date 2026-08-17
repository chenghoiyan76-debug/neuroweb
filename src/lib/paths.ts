import type { Note } from "@/lib/types";

export function noteHrefBySlug(note: Note) {
  if (note.axis === "dsm") return `/dsm/${note.section ?? "mood-disorders"}/${note.slug}`;
  if (note.axis === "symptom") return `/symptoms/${note.slug}`;
  if (note.axis === "pharmacology") {
    return `/neuropharmacology/${note.section ?? "psychosis"}/${note.slug}`;
  }
  if (note.axis === "intervention") return `/interventions/${note.slug}`;
  return `/fundamentals/${note.slug}`;
}
