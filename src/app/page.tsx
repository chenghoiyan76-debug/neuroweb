import Link from "next/link";
import { NoteCard } from "@/components/NoteView";
import { readSiteContent } from "@/lib/repository";
import { axes, site } from "@/lib/site";

export default async function Home() {
  const content = await readSiteContent();
  const featured = [
    "major-depressive-disorder",
    "schizophrenia",
    "anhedonia",
    "d2-modulation",
    "cbt-neuroplasticity",
    "dopamine-pathways",
  ]
    .map((slug) => content.notes.find((note) => note.slug === slug))
    .filter(Boolean);

  return (
    <div>
      <section className="mesh-hero text-paper-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <p className="text-sm tracking-[0.18em] text-paper-2/70">
              FOR PSYCHIATRISTS · CLINICAL PSYCHOLOGISTS · MENTAL HEALTH PROFESSIONALS
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              {site.name}
              <span className="mt-3 block text-2xl font-normal md:text-3xl">{site.nameZh}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-2/85">{site.tagline}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper-2/70">
              專業術語（Terminology）保留英文；主要內容以繁體中文撰寫。滑鼠移入頂部「DSM-5 分類」可展開
              Mood Disorders、Schizophrenia Spectrum 等大類。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dsm"
                className="rounded-full bg-copper px-5 py-2.5 text-sm text-paper-2 hover:bg-[#7d5534]"
              >
                進入 DSM-5 Classification
              </Link>
              <Link
                href="/symptoms"
                className="rounded-full border border-paper-2/30 px-5 py-2.5 text-sm hover:bg-white/10"
              >
                從症狀找機制
              </Link>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-sm">
            <p className="text-sm text-paper-2/70">Five axes</p>
            <ol className="mt-4 grid gap-3 text-sm leading-relaxed">
              {axes.map((axis) => (
                <li key={axis.slug}>
                  <Link href={axis.href} className="hover:underline">
                    <span className="font-medium">{axis.zh}</span>
                    <span className="mt-0.5 block text-paper-2/65">{axis.en}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="paper-grid border-b border-rule">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-serif text-3xl">核心導覽</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {axes.map((axis) => (
              <Link
                key={axis.slug}
                href={axis.href}
                className="rounded-2xl border border-rule bg-paper-2 p-6 hover:border-teal"
              >
                <p className="text-xs tracking-wide text-copper">{axis.en}</p>
                <h3 className="mt-2 font-serif text-2xl">{axis.zh}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{axis.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-3xl">精選 Illness / Mechanism notes</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((note) => (note ? <NoteCard key={note.slug} note={note} /> : null))}
        </div>
      </section>
    </div>
  );
}
