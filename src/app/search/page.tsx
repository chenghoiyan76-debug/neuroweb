import Link from "next/link";
import { NoteCard } from "@/components/NoteView";
import { bilingualTitle, ui } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageTitle } from "@/lib/meta";
import { searchNotes } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export async function generateMetadata() {
  return pageTitle("搜尋", "Search");
}

const searchChips = [
  { zh: "缺乏快感", en: "Anhedonia" },
  { zh: "幻覺", en: "Hallucinations" },
  { zh: "多巴胺", en: "Dopamine" },
  { zh: "鴉片類", en: "Opioid" },
  { zh: "眼動脫敏", en: "EMDR" },
  { zh: "睡眠", en: "Sleep" },
];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw) ?? "";
  const [content, locale] = await Promise.all([readSiteContent(), getLocale()]);
  const t = ui[locale];
  const hits = query ? searchNotes(content, query) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-copper">{t.searchLead}</p>
      <h1 className="mt-2 font-serif text-4xl">{t.search}</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">{t.searchHelp}</p>
      <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/search">
        <input
          name="q"
          defaultValue={query}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-full border border-rule bg-paper-2 px-4 py-3 outline-none ring-teal/30 focus:ring-2"
        />
        <button type="submit" className="rounded-full bg-teal px-6 py-3 text-sm text-paper-2">
          {t.search}
        </button>
      </form>
      {query ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {hits.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          {searchChips.map((chip) => {
            const queryValue = locale === "en" ? chip.en : chip.zh;
            return (
              <Link
                key={chip.en}
                href={`/search?q=${encodeURIComponent(queryValue)}`}
                className="rounded-full border border-rule px-3 py-1 hover:border-teal"
              >
                {bilingualTitle(chip.zh, chip.en, locale)}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
