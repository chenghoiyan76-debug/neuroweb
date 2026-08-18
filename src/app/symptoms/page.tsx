import { AxisHero } from "@/components/AxisHero";
import { NoteCard } from "@/components/NoteView";
import { ui } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageTitle } from "@/lib/meta";
import { notesByAxis } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export async function generateMetadata() {
  return pageTitle("精神醫學症狀", "Psychiatric Symptoms");
}

export default async function Page() {
  const [content, locale] = await Promise.all([readSiteContent(), getLocale()]);
  const t = ui[locale];
  const notes = notesByAxis(content, "symptom");
  return (
    <div>
      <AxisHero slug="symptoms" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-soft">{t.symptomsIntro}</p>
        <div className="grid gap-5 md:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>
    </div>
  );
}
