"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "./LogoMark";

const nav = [
  { href: "/models", label: "認知模型" },
  { href: "/psychiatry", label: "精神醫學" },
  { href: "/therapy", label: "治療取向" },
  { href: "/reviews", label: "文獻回顧" },
  { href: "/cases", label: "個案研討" },
  { href: "/glossary", label: "詞彙表" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-teal-deep/20 bg-paper-2/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <LogoMark />
          <span className="min-w-0">
            <span className="block font-serif text-lg leading-none tracking-tight">NeuroWeb</span>
            <span className="mt-1 block truncate text-[11px] text-ink-soft">
              心智科學知識整合
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft transition-colors hover:text-teal"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/editorial"
            className="rounded-full border border-rule px-3 py-1 text-xs text-teal hover:bg-paper"
          >
            編審機制
          </Link>
          <Link
            href="/search"
            className="rounded-full bg-teal px-3 py-1.5 text-xs text-paper-2 hover:bg-teal-deep"
          >
            搜尋
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-md border border-rule px-3 py-1.5 text-sm lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? "關閉" : "選單"}
        </button>
      </div>
      {open ? (
        <div className="border-t border-rule bg-paper-2 px-4 py-3 lg:hidden">
          <div className="grid gap-2 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/editorial" onClick={() => setOpen(false)}>
              編審機制
            </Link>
            <Link href="/search" onClick={() => setOpen(false)}>
              搜尋文獻與詞彙
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
