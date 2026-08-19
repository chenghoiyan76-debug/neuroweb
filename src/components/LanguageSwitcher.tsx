"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ui, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/LocaleProvider";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const t = ui[locale];

  async function choose(next: Locale) {
    if (next === locale) return;
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    startTransition(() => router.refresh());
  }

  return (
    <div
      className="flex items-center rounded-full border border-rule p-0.5 text-[11px]"
      role="group"
      aria-label={t.language}
    >
      <button
        type="button"
        disabled={pending}
        onClick={() => void choose("zh")}
        className={`rounded-full px-2.5 py-1 ${
          locale === "zh" ? "bg-night text-paper-2" : "text-ink-soft hover:text-ink"
        }`}
      >
        {t.langZh}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => void choose("en")}
        className={`rounded-full px-2.5 py-1 ${
          locale === "en" ? "bg-night text-paper-2" : "text-ink-soft hover:text-ink"
        }`}
      >
        {t.langEn}
      </button>
    </div>
  );
}
