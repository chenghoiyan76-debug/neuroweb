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
          <p className="font-serif text-ink">{site.name}</p>
          <p className="mt-1 max-w-xl leading-relaxed">
            {locale === "en" ? site.study.en : site.study.zh}
          </p>
          <p className="mt-2 max-w-xl leading-relaxed">{t.disclaimerText}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-ink">
            {t.about}
          </Link>
          <Link href="/admin" className="text-[11px] tracking-[0.2em] text-rule hover:text-copper">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
