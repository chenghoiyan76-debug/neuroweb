"use client";

import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { EmptyState, PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";
import { sortedReflections } from "@/lib/query";

export default function ReflectionListPage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const items = sortedReflections(content);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <PageHero
        kicker={t.listView}
        title={t.reflection}
        summary={
          locale === "en"
            ? "One topic at a time, with a few sentences. Longer writing sits behind the title."
            : "一次一則主題，配上幾句內容。更長的文字點進標題再讀。"
        }
        color="#9a6840"
      />
      <ol className="mt-10 grid gap-4">
        {items.length ? (
          items.map((item, index) => (
            <li key={item.id}>
              <Link
                href={`/reflection/${item.slug}`}
                className="block rounded-2xl border border-rule bg-paper-2 px-5 py-5 hover:border-gold"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-copper">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-ink-soft">{item.date}</p>
                </div>
                <h2 className="mt-2 font-serif text-2xl">{pick(item.title, locale)}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{pick(item.excerpt, locale)}</p>
              </Link>
            </li>
          ))
        ) : (
          <EmptyState text={t.emptySection} />
        )}
      </ol>
    </div>
  );
}
