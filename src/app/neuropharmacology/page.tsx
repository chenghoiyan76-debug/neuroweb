import Link from "next/link";
import { AxisHero } from "@/components/AxisHero";
import { notesByAxis } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export const metadata = { title: "神經藥理學" };

export default async function Page() {
  const content = await readSiteContent();
  return (
    <div>
      <AxisHero slug="pharmacology" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {content.pharmaGroups.map((group) => (
            <Link
              key={group.slug}
              href={`/neuropharmacology/${group.slug}`}
              className="rounded-2xl border border-rule bg-paper-2 p-6 hover:border-teal"
            >
              <p className="text-xs text-copper">{group.en}</p>
              <h2 className="mt-2 font-serif text-2xl">{group.zh}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{group.summary}</p>
              <p className="mt-4 text-xs text-teal">
                {notesByAxis(content, "pharmacology", group.slug).length} 則機轉筆記
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
