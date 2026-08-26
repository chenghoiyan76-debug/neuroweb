"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { WorksheetView } from "@/components/sen/WorksheetView";
import { pick, ui } from "@/lib/i18n";
import { resourceBySlug } from "@/lib/sen-catalog";
import { senAreaBySlug } from "@/lib/sen-taxonomy";

export function PrintView({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = ui[locale];
  const resource = resourceBySlug(slug);
  if (!resource) notFound();
  const area = senAreaBySlug(resource.area);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/resources/${resource.slug}`} className="text-sm text-teal hover:underline">
          ← {t.backToResource}
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-night px-4 py-2 text-sm text-paper-2 hover:bg-indigo"
        >
          {t.printDownload}
        </button>
      </div>
      <p className="print:hidden mb-6 text-sm text-ink-soft">{t.printHint}</p>
      <header className="border-b border-rule pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
          Mind-Note · {area ? pick(area.title, locale) : ""}
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight">{pick(resource.title, locale)}</h1>
        <p className="mt-3 leading-relaxed">{pick(resource.howToUse, locale)}</p>
      </header>
      <div className="mt-6">
        <WorksheetView blocks={resource.worksheet} locale={locale} printable />
      </div>
      <p className="mt-10 text-xs leading-relaxed text-ink-soft">{t.senDisclaimer}</p>
    </div>
  );
}
