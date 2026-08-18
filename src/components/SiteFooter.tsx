import Link from "next/link";
import { ui } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getLocale } from "@/lib/locale";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = ui[locale];
  return (
    <footer className="border-t border-rule bg-paper-2">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-8 text-sm text-ink-soft">
        <div>
          <p className="font-serif text-ink">{locale === "en" ? site.name : site.nameZh}</p>
          <p className="mt-1 max-w-xl leading-relaxed">{t.disclaimerText}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-ink">
            {t.about}
          </Link>
          <Link href="/garden" className="hover:text-ink">
            {t.garden}
          </Link>
          <Link href="/lab" className="text-[11px] tracking-[0.35em] text-rule hover:text-copper">
            LAB
          </Link>
        </div>
      </div>
    </footer>
  );
}
