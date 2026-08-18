"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { childDomains, domainsAtLevel } from "@/lib/query";
import { levels, site } from "@/lib/site";
import type { LevelMeta } from "@/lib/types";

export function SiteHeader() {
  const locale = useLocale();
  const t = ui[locale];
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <Link href="/" className="flex min-w-0 shrink-0 items-baseline gap-2">
          <span className="font-serif text-lg tracking-tight">{site.name}</span>
          <span className="hidden truncate text-[11px] text-ink-soft xl:inline">{t.brandSub}</span>
        </Link>
        <LevelNav className="ml-auto hidden lg:flex" />
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link href="/garden" className="hidden rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:text-ink md:inline">
            {t.garden}
          </Link>
          <Link href="/search" className="hidden rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:text-ink md:inline">
            {t.search}
          </Link>
          <Link href="/about" className="hidden rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:text-ink lg:inline">
            {t.about}
          </Link>
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
                  {locale === "en" ? level.nav.en : level.nav.zh}
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

function LevelNav({ className }: { className?: string }) {
  const navRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState({ left: 0, width: 0, visible: false });
  const [active, setActive] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function moveBox(target: HTMLElement, id: number) {
    const nav = navRef.current;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setBox({
      left: rect.left - navRect.left,
      width: rect.width,
      visible: true,
    });
    setActive(id);
  }

  function scheduleClose() {
    clearClose();
    closeTimer.current = setTimeout(() => {
      setBox((current) => ({ ...current, visible: false }));
      setActive(null);
    }, 120);
  }

  return (
    <nav
      ref={navRef}
      className={`relative items-center ${className ?? ""}`}
      onMouseLeave={scheduleClose}
      onMouseEnter={clearClose}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 h-full rounded-full bg-paper-2 shadow-sm ring-1 ring-rule/80 transition-all duration-200 ease-out"
        style={{
          left: box.left,
          width: box.width,
          opacity: box.visible ? 1 : 0,
        }}
      />
      {levels
        .slice()
        .reverse()
        .map((level, index) => (
          <LevelItem
            key={level.id}
            level={level}
            alignEnd={index >= 3}
            open={active === level.id}
            onEnter={(element) => {
              clearClose();
              moveBox(element, level.id);
            }}
          />
        ))}
    </nav>
  );
}

function LevelItem({
  level,
  alignEnd,
  open,
  onEnter,
}: {
  level: LevelMeta;
  alignEnd: boolean;
  open: boolean;
  onEnter: (element: HTMLElement) => void;
}) {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const roots = domainsAtLevel(content, level.id);
  const label = locale === "en" ? level.nav.en : level.nav.zh;

  return (
    <div className="relative" onMouseEnter={(event) => onEnter(event.currentTarget)}>
      <Link
        href={`/level/${level.id}`}
        className="relative z-10 block whitespace-nowrap px-3 py-2 text-[13px] text-ink"
      >
        {label}
      </Link>
      <div
        className={`absolute top-full z-50 pt-2 transition duration-150 ${
          alignEnd ? "right-0" : "left-0"
        } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
      >
        <div className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-rule bg-paper-2 p-4 shadow-xl">
          <p className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase" style={{ color: level.color }}>
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: level.color }} />
            Level {level.id}
          </p>
          <Link href={`/level/${level.id}`} className="mt-1 block font-serif text-lg leading-snug hover:text-teal-deep">
            {bilingualTitle(level.zh, level.en, locale)}
          </Link>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            {locale === "en" ? level.kicker.en : level.kicker.zh}
          </p>
          <div className="mt-3 grid max-h-[60vh] gap-1 overflow-auto">
            {roots.map((domain) => {
              const children = childDomains(content, domain.slug);
              return (
                <div key={domain.slug}>
                  <Link
                    href={`/domain/${domain.slug}`}
                    className="block rounded-lg px-2 py-1.5 text-sm hover:bg-paper"
                  >
                    {bilingualTitle(domain.zh, domain.en, locale)}
                  </Link>
                  {children.length ? (
                    <div className="mb-1 ml-3 grid gap-0.5 border-l border-rule pl-2">
                      {children.map((child) => (
                        <Link
                          key={child.slug}
                          href={`/domain/${child.slug}`}
                          className="rounded-md px-2 py-1 text-[12px] text-ink-soft hover:bg-paper hover:text-ink"
                        >
                          {locale === "en" ? child.en : child.zh}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <Link href={`/level/${level.id}`} className="mt-3 inline-block text-xs text-teal hover:underline">
            {locale === "en" ? `Open ${level.nav.en}` : `進入${level.nav.zh}`} · {t.index}
          </Link>
        </div>
      </div>
    </div>
  );
}
