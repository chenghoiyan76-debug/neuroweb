"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { ui } from "@/lib/i18n";

export default function NotFound() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">{t.notFoundTitle}</h1>
      <p className="mt-4 text-ink-soft">{t.notFoundBody}</p>
      <Link href="/" className="mt-8 inline-block text-teal hover:underline">
        {t.notFoundHome}
      </Link>
    </div>
  );
}
