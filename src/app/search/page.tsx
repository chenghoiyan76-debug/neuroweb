import Link from "next/link";
import { NoteCard } from "@/components/NoteView";
import { searchNotes } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export const metadata = { title: "Search" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw) ?? "";
  const content = await readSiteContent();
  const hits = query ? searchNotes(content, query) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-copper">Cross-axis search</p>
      <h1 className="mt-2 font-serif text-4xl">搜尋</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        用英文術語或中文關鍵字搜尋，例如 Anhedonia、D2、TMS、HPA、思覺失調。
      </p>
      <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/search">
        <input
          name="q"
          defaultValue={query}
          placeholder="Anhedonia, Clozapine, Memory reconsolidation…"
          className="w-full rounded-full border border-rule bg-paper-2 px-4 py-3 outline-none ring-teal/30 focus:ring-2"
        />
        <button type="submit" className="rounded-full bg-teal px-6 py-3 text-sm text-paper-2">
          Search
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
          {["Anhedonia", "Hallucinations", "Dopamine", "Opioid", "EMDR", "Sleep"].map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-rule px-3 py-1 hover:border-teal"
            >
              {term}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
