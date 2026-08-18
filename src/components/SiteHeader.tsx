"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { levels, site } from "@/lib/site";

export function SiteHeader() {
  const locale = useLocale();
  const t = ui[locale];
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-baseline gap-2">
          <span className="font-serif text-lg tracking-tight">{locale === "en" ? site.name : site.nameZh}</span>
          <span className="hidden truncate text-[11px] text-ink-soft sm:inline">{t.brandSub}</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {levels
            .slice()
            .reverse()
            .map((level) => (
              <Link
                key={level.id}
                href={`/level/${level.id}`}
                className="rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:bg-paper-2 hover:text-ink"
                title={bilingualTitle(level.zh, level.en, locale)}
              >
                L{level.id}
              </Link>
            ))}
          <Link href="/garden" className="rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:text-ink">
            {t.garden}
          </Link>
          <Link href="/search" className="rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:text-ink">
            {t.search}
          </Link>
          <Link href="/about" className="rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:text-ink">
            {t.about}
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
        <div className="border-t border-rule bg-paper-2 px-4 py-3 lg:hidden">
          <div className="grid gap-2 text-sm">
            {levels
              .slice()
              .reverse()
              .map((level) => (
                <Link
                  key={level.id}
                  href={`/level/${level.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2 hover:bg-paper"
                >
                  L{level.id} · {bilingualTitle(level.zh, level.en, locale)}
                </Link>
              ))}
            <Link href="/garden" onClick={() => setOpen(false)} className="rounded-lg px-2 py-2">
              {t.garden}
            </Link>
            <Link href="/search" onClick={() => setOpen(false)} className="rounded-lg px-2 py-2">
              {t.search}
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="rounded-lg px-2 py-2">
              {t.about}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
