import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { seedContent } from "@/data";
import type { SiteContent } from "@/lib/types";

const dataFile = path.join(process.cwd(), "data", "site-content.json");

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const raw = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as SiteContent;
    if (!parsed?.notes || !parsed?.dsmCategories) return seedContent;
    return parsed;
  } catch {
    return seedContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  await mkdir(path.dirname(dataFile), { recursive: true });
  const next: SiteContent = {
    ...content,
    version: (content.version ?? 0) + 1,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  await writeFile(dataFile, JSON.stringify(next, null, 2), "utf8");
  return next;
}

export function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as SiteContent;
  return Array.isArray(candidate.notes) && Array.isArray(candidate.dsmCategories);
}
