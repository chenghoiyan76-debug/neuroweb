"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";
import { pick, ui } from "@/lib/i18n";
import { abilityAreas } from "@/lib/sen-taxonomy";

export function SiteHeader() {
  const locale = useLocale();
  const t = ui[locale];
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-x-clip border-b border-rule/80 bg-paper/90 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <Link href="/" className="flex min-w-0 shrink-0 items-baseline gap-2">
          <span className="font-serif text-lg tracking-tight">{t.brand}</span>
          <span className="hidden truncate text-[11px] text-ink-soft md:inline">{t.brandSub}</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <Link href="/improve" className="rounded-full px-3 py-2 text-[13px] hover:bg-paper-2">
            {t.improveWhat}
          </Link>
          <Link href="/resources" className="rounded-full px-3 py-2 text-[13px] hover:bg-paper-2">
            {t.allMaterials}
          </Link>
          <Link href="/about" className="rounded-full px-3 py-2 text-[13px] hover:bg-paper-2">
            {t.about}
          </Link>
          <Link href="/search" className="rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:text-ink">
            {t.search}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-full border border-rule px-3 py-1 text-[12px] lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>
      {open ? (
        <div className="max-h-[80vh] overflow-auto border-t border-rule bg-paper-2 px-4 py-3 lg:hidden">
          <div className="grid gap-2 text-sm">
            <Link href="/improve" onClick={() => setOpen(false)} className="font-medium">
              {t.improveWhat}
            </Link>
            {abilityAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/improve/${area.slug}`}
                onClick={() => setOpen(false)}
                className="ml-2 text-ink-soft"
              >
                {area.emoji} {pick(area.short, locale)}
              </Link>
            ))}
            <Link href="/resources" onClick={() => setOpen(false)}>
              {t.allMaterials}
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              {t.about}
            </Link>
            <Link href="/search" onClick={() => setOpen(false)}>
              {t.search}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
