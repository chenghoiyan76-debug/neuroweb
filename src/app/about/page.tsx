"use client";

import { ArticleBody } from "@/components/ArticleBody";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";

export default function AboutPage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <PageHero
        kicker={pick(content.profile.location, locale)}
        title={t.aboutTitle}
        summary={pick(content.profile.bio, locale)}
      />
      <p className="mt-4 text-sm text-ink-soft">{pick(content.profile.personName, locale)}</p>
      <div className="mt-10">
        <ArticleBody source={content.profile.about} />
      </div>
    </div>
  );
}
