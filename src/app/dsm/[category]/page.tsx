import { notFound } from "next/navigation";
import { NoteCard } from "@/components/NoteView";
import { illnessesForCategory } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export async function generateStaticParams() {
  const content = await readSiteContent();
  return content.dsmCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const content = await readSiteContent();
  const meta = content.dsmCategories.find((item) => item.slug === category);
  return { title: meta ? `${meta.en}` : "DSM-5" };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const content = await readSiteContent();
  const meta = content.dsmCategories.find((item) => item.slug === category);
  if (!meta) notFound();
  const illnesses = illnessesForCategory(content, category);

  return (
    <div>
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm tracking-wide text-copper">DSM-5 Classification</p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl">{meta.en}</h1>
          <p className="mt-2 text-lg text-ink-soft">{meta.zh}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{meta.summary}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-serif text-2xl">Illness Studies · 臨床筆記</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {illnesses.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
        {illnesses.length === 0 ? (
          <p className="mt-6 text-sm text-ink-soft">此大類尚無筆記，可經 Lab 後台新增。</p>
        ) : null}
      </section>
    </div>
  );
}
