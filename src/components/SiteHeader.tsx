"use client";

import Link from "next/link";
import { useState } from "react";
import { useContent } from "@/components/ContentProvider";
import { LogoMark } from "@/components/LogoMark";
import { axes } from "@/lib/site";

export function SiteHeader() {
  const content = useContent();
  const [open, setOpen] = useState(false);
  const [dsmOpen, setDsmOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-teal-deep/20 bg-paper-2/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <LogoMark />
          <span className="min-w-0">
            <span className="block font-serif text-[15px] leading-none tracking-tight md:text-lg">
              NeuroPsych Integrator
            </span>
            <span className="mt-1 block truncate text-[11px] text-ink-soft">
              精神醫療知識整合
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          <div
            className="relative"
            onMouseEnter={() => setDsmOpen(true)}
            onMouseLeave={() => setDsmOpen(false)}
          >
            <Link
              href="/dsm"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-ink-soft hover:bg-paper hover:text-teal"
            >
              DSM-5 分類
              <span className="text-[10px] text-copper">DSM-5</span>
            </Link>
            <div
              className={`absolute left-0 top-full z-50 w-[640px] pt-2 transition ${
                dsmOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="rounded-2xl border border-rule bg-paper-2 p-3 shadow-xl">
                <p className="px-2 pb-2 text-[11px] tracking-wide text-copper">
                  Hover dropdown · Common Psychiatric Illness Categories
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {content.dsmCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/dsm/${category.slug}`}
                      className="rounded-xl px-3 py-2 hover:bg-paper"
                    >
                      <span className="block text-sm font-medium leading-snug">{category.en}</span>
                      <span className="block text-[11px] text-ink-soft">{category.zh}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {axes
            .filter((axis) => axis.slug !== "dsm")
            .map((axis) => (
              <Link
                key={axis.href}
                href={axis.href}
                className="rounded-full px-3 py-2 text-sm text-ink-soft hover:bg-paper hover:text-teal"
              >
                {axis.zh}
              </Link>
            ))}
          <Link
            href="/search"
            className="ml-2 rounded-full bg-teal px-3 py-1.5 text-xs text-paper-2 hover:bg-teal-deep"
          >
            Search
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md border border-rule px-3 py-1.5 text-sm xl:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "關閉" : "選單"}
        </button>
      </div>

      {open ? (
        <div className="max-h-[70vh] overflow-y-auto border-t border-rule bg-paper-2 px-4 py-3 xl:hidden">
          <p className="text-xs text-copper">DSM-5 Classification</p>
          <Link href="/dsm" className="mt-1 block py-1 font-medium" onClick={() => setOpen(false)}>
            DSM-5 分類 · 總覽
          </Link>
          <div className="mt-1 grid gap-1 text-sm">
            {content.dsmCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/dsm/${category.slug}`}
                className="py-1 text-ink-soft"
                onClick={() => setOpen(false)}
              >
                {category.en}
              </Link>
            ))}
          </div>
          <div className="mt-3 grid gap-2 border-t border-rule pt-3 text-sm">
            {axes
              .filter((axis) => axis.slug !== "dsm")
              .map((axis) => (
                <Link key={axis.href} href={axis.href} onClick={() => setOpen(false)}>
                  {axis.zh} <span className="text-xs text-copper">{axis.en}</span>
                </Link>
              ))}
            <Link href="/search" onClick={() => setOpen(false)}>
              Search
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
