import { site } from "@/lib/site";

export function pageTitle(title: string) {
  return `${title} · ${site.name}`;
}
