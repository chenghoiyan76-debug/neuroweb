"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { ui } from "@/lib/i18n";

export function SiteFooter() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <footer className="border-t border-rule bg-paper-2 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-8 text-sm text-ink-soft">
        <div>
          <p className="font-serif text-ink">{t.brand}</p>
          <p className="mt-1 max-w-xl leading-relaxed">{t.brandSub}</p>
          <p className="mt-2 max-w-2xl leading-relaxed">{t.senDisclaimer}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/about" className="hover:text-ink">
            {t.about}
          </Link>
          <Link href="/resources" className="hover:text-ink">
            {t.allMaterials}
          </Link>
        </div>
      </div>
    </footer>
  );
}
