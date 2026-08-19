import Link from "next/link";
import { pick, ui } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { readSiteContent } from "@/lib/repository";

export async function SiteFooter() {
  const [locale, content] = await Promise.all([getLocale(), readSiteContent()]);
  const t = ui[locale];
  return (
    <footer className="border-t border-rule bg-paper-2">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-8 text-sm text-ink-soft">
        <div>
          <p className="font-serif text-ink">{content.profile.siteName}</p>
          <p className="mt-1 max-w-xl leading-relaxed">{pick(content.profile.tagline, locale)}</p>
          <p className="mt-2 max-w-2xl leading-relaxed">{t.disclaimerText}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/about" className="hover:text-ink">
            {t.about}
          </Link>
          <Link href="/contact" className="hover:text-ink">
            {t.contact}
          </Link>
          <Link href="/admin" className="text-[11px] tracking-[0.2em] text-rule hover:text-copper">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
