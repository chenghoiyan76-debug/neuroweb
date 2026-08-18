import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export function pageTitle(title: string, locale: Locale) {
  return locale === "en" ? `${title} · ${site.name}` : `${title} · ${site.nameZh}`;
}
