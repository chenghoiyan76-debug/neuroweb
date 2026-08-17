import Link from "next/link";
import type { Note, RelatedMap } from "@/lib/types";
import { noteHrefBySlug } from "@/lib/paths";

const labels: Record<keyof RelatedMap, { en: string; zh: string }> = {
  dsm: { en: "DSM-5 Classification", zh: "DSM-5 分類" },
  symptoms: { en: "Psychiatric Symptoms", zh: "精神醫學症狀" },
  pharmacology: { en: "Neuropharmacology", zh: "神經藥理學" },
  interventions: { en: "Therapeutic Neuroscience", zh: "治療神經科學與介入" },
  fundamentals: { en: "Core Neuroscience", zh: "核心神經科學基礎" },
};

export function RelatedPanel({
  related,
  notes,
}: {
  related: RelatedMap;
  notes: Note[];
}) {
  const groups = (Object.keys(labels) as (keyof RelatedMap)[]).filter(
    (key) => (related[key] ?? []).length > 0,
  );
  if (groups.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-rule bg-paper-2 p-5">
      <p className="text-xs tracking-wide text-copper">Related axes</p>
      <h2 className="mt-1 font-serif text-xl">跨軸連結</h2>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">
        精神醫學症狀 · 神經藥理學 · 治療神經科學與介入 · 核心神經科學基礎
      </p>
      <div className="mt-4 grid gap-4">
        {groups.map((key) => (
          <div key={key}>
            <p className="text-sm font-medium">
              {labels[key].zh}{" "}
              <span className="text-xs font-normal text-copper">{labels[key].en}</span>
            </p>
            <ul className="mt-1 grid gap-1 text-sm">
              {(related[key] ?? []).map((slug) => {
                const note = notes.find((item) => item.slug === slug);
                return (
                  <li key={slug}>
                    <Link
                      href={note ? noteHrefBySlug(note) : "#"}
                      className="text-teal hover:underline"
                    >
                      {note ? `${note.en}（${note.zh}）` : slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
