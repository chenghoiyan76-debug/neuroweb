"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { ui } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteFooter() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <footer className="border-t border-rule bg-teal-deep text-paper-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl">{site.name}</p>
          <p className="mt-2 text-sm text-paper-2/80">{site.nameZh}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper-2/70">{site.tagline[locale]}</p>
        </div>
        <div className="text-sm leading-relaxed text-paper-2/80">
          <p>{t.audience}</p>
          <p className="mt-3">
            <Link href="/about" className="underline underline-offset-4">
              {t.about}
            </Link>
          </p>
        </div>
        <div className="text-sm leading-relaxed text-paper-2/75">
          <p className="mb-2 font-medium">{t.disclaimer}</p>
          <p>{t.disclaimerText}</p>
          <p className="mt-6 text-[10px] tracking-[0.35em] text-paper-2/30">
            <Link href="/lab" className="hover:text-paper-2/60">
              LAB
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
