import { notFound } from "next/navigation";
import { NoteCard } from "@/components/NoteView";
import { notesByAxis } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";
import type { PharmaSection } from "@/lib/types";

export async function generateStaticParams() {
  const content = await readSiteContent();
  return content.pharmaGroups.map((group) => ({ group: group.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params;
  const content = await readSiteContent();
  const meta = content.pharmaGroups.find((item) => item.slug === group);
  return { title: meta ? `${meta.en}` : "Neuropharmacology" };
}

export default async function Page({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params;
  const content = await readSiteContent();
  const meta = content.pharmaGroups.find((item) => item.slug === group);
  if (!meta) notFound();
  const notes = notesByAxis(content, "pharmacology", group as PharmaSection);

  return (
    <div>
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm text-copper">Neuropharmacology · {meta.en}</p>
          <h1 className="mt-2 font-serif text-4xl">{meta.zh}</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{meta.summary}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>
    </div>
  );
}
