import { dsmCategories, dsmNotes } from "./dsm";
import { fundamentalNotes } from "./fundamentals";
import { interventionNotes } from "./interventions";
import { pharmaGroups, pharmaNotes } from "./pharmacology";
import { symptomNotes } from "./symptoms";
import type { SiteContent } from "@/lib/types";

export const seedContent: SiteContent = {
  version: 1,
  updatedAt: "2026-08-17",
  dsmCategories,
  pharmaGroups,
  notes: [...dsmNotes, ...symptomNotes, ...pharmaNotes, ...interventionNotes, ...fundamentalNotes],
};
