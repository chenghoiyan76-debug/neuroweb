import type { Metadata } from "next";
import { pick, type Locale } from "@/lib/i18n";
import type { LocaleText, SiteContent } from "@/lib/types";

export function pageMeta(
  content: SiteContent,
  locale: Locale,
  title: LocaleText | string,
  description?: LocaleText | string,
): Metadata {
  const name = content.profile.siteName;
  const resolvedTitle = typeof title === "string" ? title : pick(title, locale);
  const resolvedDescription =
    typeof description === "string"
      ? description
      : description
        ? pick(description, locale)
        : pick(content.profile.tagline, locale);
  return {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: `${resolvedTitle} · ${name}`,
      description: resolvedDescription,
    },
  };
}
