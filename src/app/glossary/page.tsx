import { GlossaryBrowser } from "@/components/GlossaryBrowser";
import { glossary } from "@/lib/content/glossary";

export const metadata = {
  title: "術語詞彙表",
  description: "中英對照專有名詞庫，維護中文圈精神醫學與心理學用語的精確性。",
};

export default function Page() {
  return (
    <div>
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm text-copper">Glossary</p>
          <h1 className="mt-2 font-serif text-4xl">術語詞彙表</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            每個詞條提供精準中英對照與臨床可用的短定義。目標不是取代教科書，而是讓跨專業討論時講的是同一件事。
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <GlossaryBrowser entries={glossary} />
      </section>
    </div>
  );
}
