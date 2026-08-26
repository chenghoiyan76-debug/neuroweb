"use client";

import { useLocale } from "@/components/LocaleProvider";
import { PageHero } from "@/components/Ui";
import { ui } from "@/lib/i18n";

export default function AboutPage() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <PageHero kicker={t.brand} title={t.aboutTitle} summary={t.aboutBody} />
      <div className="mt-8 grid gap-4 text-sm leading-relaxed text-ink-soft">
        <p>{t.udlBody}</p>
        <p>{t.senDisclaimer}</p>
      </div>
    </div>
  );
}
