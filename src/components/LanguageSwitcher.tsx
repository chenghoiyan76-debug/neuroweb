"use client";

import { ui, type Locale } from "@/lib/i18n";
import { useLocale, useSetLocale } from "@/components/LocaleProvider";

export function LanguageSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const t = ui[locale];

  function choose(next: Locale) {
    if (next === locale) return;
    setLocale(next);
    void fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    }).catch(() => undefined);
  }

  return (
    <div
      className="flex items-center rounded-full border border-rule p-0.5 text-[11px]"
      role="group"
      aria-label={t.language}
    >
      <button
        type="button"
        onClick={() => choose("zh")}
        className={`rounded-full px-2.5 py-1 ${
          locale === "zh" ? "bg-night text-paper-2" : "text-ink-soft hover:text-ink"
        }`}
      >
        {t.langZh}
      </button>
      <button
        type="button"
        onClick={() => choose("en")}
        className={`rounded-full px-2.5 py-1 ${
          locale === "en" ? "bg-night text-paper-2" : "text-ink-soft hover:text-ink"
        }`}
      >
        {t.langEn}
      </button>
    </div>
  );
}
