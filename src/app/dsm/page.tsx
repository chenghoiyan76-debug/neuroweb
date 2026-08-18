import { NoteCard } from "@/components/NoteView";
import { applyTerms, bilingualTitle, ui } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageTitle } from "@/lib/meta";
import { illnessesForCategory } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export async function generateMetadata() {
  return pageTitle("DSM-5 分類", "DSM-5 Classification");
}

export default async function Page() {
  const [content, locale] = await Promise.all([readSiteContent(), getLocale()]);
  const t = ui[locale];
  return (
    <div>
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm tracking-wide text-copper">DSM-5 Classification</p>
          <h1 className="mt-2 font-serif text-4xl">
            {bilingualTitle("DSM-5 分類", "DSM-5 Classification", locale)}
          </h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{t.dsmIntro}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-2">
          {content.dsmCategories.map((category) => {
            const count = illnessesForCategory(content, category.slug).length;
            return (
              <a
                key={category.slug}
                href={`/dsm/${category.slug}`}
                className="rounded-2xl border border-rule bg-paper-2 p-6 hover:border-teal"
              >
                <p className="text-sm font-medium text-teal">{category.en}</p>
                <h2 className="mt-1 font-serif text-2xl">
                  {bilingualTitle(category.zh, category.en, locale)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {applyTerms(locale === "en" ? category.summaryEn : category.summary, locale)}
                </p>
                <p className="mt-4 text-xs text-copper">
                  {count} {t.illnessCount}
                </p>
              </a>
            );
          })}
        </div>
        <div className="mt-12">
          <h2 className="font-serif text-2xl">{t.recentNotes}</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {content.notes
              .filter((note) => note.axis === "dsm")
              .slice(0, 4)
              .map((note) => (
                <NoteCard key={note.slug} note={note} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
