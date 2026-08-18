"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { ui } from "@/lib/i18n";

export default function NotFound() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm text-copper">404</p>
      <h1 className="mt-2 font-serif text-4xl">{t.notFoundTitle}</h1>
      <p className="mt-4 text-ink-soft">{t.notFoundBody}</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-teal px-5 py-2 text-sm text-paper-2">
        {t.notFoundHome}
      </Link>
    </div>
  );
}
