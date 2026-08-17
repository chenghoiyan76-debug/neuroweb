import { AxisHero } from "@/components/AxisHero";
import { NoteCard } from "@/components/NoteView";
import { notesByAxis } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export const metadata = { title: "治療神經科學與介入" };

export default async function Page() {
  const content = await readSiteContent();
  const notes = notesByAxis(content, "intervention");
  return (
    <div>
      <AxisHero slug="interventions" />
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
