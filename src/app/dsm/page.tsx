import { NoteCard } from "@/components/NoteView";
import { illnessesForCategory } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export const metadata = {
  title: "DSM-5 分類",
  description: "DSM-5 Classification：以大類進入 Illness Studies。",
};

export default async function Page() {
  const content = await readSiteContent();
  return (
    <div>
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm tracking-wide text-copper">DSM-5 Classification</p>
          <h1 className="mt-2 font-serif text-4xl">DSM-5 分類</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            將游標移至頂部導覽的「DSM-5 分類」可展開浮動下拉選單（Hover Dropdown），顯示 Mood Disorders、Schizophrenia Spectrum 等常見精神疾病大類。點擊大類後進入 Illness Studies。本站不重製 DSM-5 診斷準則原文。
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-2">
          {content.dsmCategories.map((category) => {
            const count = illnessesForCategory(content, category.slug).length;
            return (
              <a
                key={category.slug}
                href={`/dsm/${category.slug}`}
                className="rounded-2xl border border-rule bg-paper-2 p-6 hover:border-teal"
              >
                <p className="text-sm font-medium text-teal">{category.en}</p>
                <h2 className="mt-1 font-serif text-2xl">{category.zh}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{category.summary}</p>
                <p className="mt-4 text-xs text-copper">{count} 則 Illness Studies</p>
              </a>
            );
          })}
        </div>
        <div className="mt-12">
          <h2 className="font-serif text-2xl">最近更新的臨床筆記</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {content.notes
              .filter((note) => note.axis === "dsm")
              .slice(0, 4)
              .map((note) => (
                <NoteCard key={note.slug} note={note} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
