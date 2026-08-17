import { AxisHero } from "@/components/AxisHero";
import { NoteCard } from "@/components/NoteView";
import { notesByAxis } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export const metadata = { title: "精神醫學症狀" };

export default async function Page() {
  const content = await readSiteContent();
  const notes = notesByAxis(content, "symptom");
  return (
    <div>
      <AxisHero slug="symptoms" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-soft">
          從臨床表徵進入：Anhedonia、Hallucinations、Executive Dysfunction 等。每則筆記連到機制（Core Neuroscience）與解方（Neuropharmacology / Interventions）。
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>
    </div>
  );
}
