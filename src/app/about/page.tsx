"use client";

import { useLocale } from "@/components/LocaleProvider";
import { ui } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function AboutPage() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl">{t.aboutTitle}</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">{t.aboutBody}</p>
      <h2 className="mt-10 font-serif text-2xl">{t.aboutTech}</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">{t.aboutTechBody}</p>
      <h2 className="mt-10 font-serif text-2xl">{t.aboutPrinciples}</h2>
      <ul className="mt-3 grid gap-2 text-ink-soft">
        <li>{t.principle1}</li>
        <li>{t.principle2}</li>
        <li>{t.principle3}</li>
      </ul>
      <p className="mt-10 text-sm text-ink-soft">
        {locale === "en" ? site.tagline.en : site.tagline.zh}
      </p>
    </div>
  );
}
