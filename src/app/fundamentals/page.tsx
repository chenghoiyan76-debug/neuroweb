import { AxisHero } from "@/components/AxisHero";
import { NoteCard } from "@/components/NoteView";
import { notesByAxis } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export const metadata = { title: "核心神經科學基礎" };

export default async function Page() {
  const content = await readSiteContent();
  const notes = notesByAxis(content, "fundamental");
  return (
    <div>
      <AxisHero slug="fundamentals" />
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
