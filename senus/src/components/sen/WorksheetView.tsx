import { pick, type Locale } from "@/lib/i18n";
import type { WorksheetBlock } from "@/lib/sen-types";

export function WorksheetView({
  blocks,
  locale,
  printable,
}: {
  blocks: WorksheetBlock[];
  locale: Locale;
  printable?: boolean;
}) {
  return (
    <div className={printable ? "worksheet-print grid gap-6" : "grid gap-6"}>
      {blocks.map((block, index) => (
        <Block key={`${block.kind}-${index}`} block={block} locale={locale} />
      ))}
    </div>
  );
}

function Block({ block, locale }: { block: WorksheetBlock; locale: Locale }) {
  if (block.kind === "goal") {
    return <blockquote className="border-l-4 border-gold bg-paper-2 px-4 py-3 font-serif text-lg leading-relaxed">{pick(block.text, locale)}</blockquote>;
  }
  if (block.kind === "adult") {
    return (
      <section className="rounded-xl border border-dashed border-rule bg-[#f4ece2] px-4 py-3">
        <h3 className="text-sm font-medium">{locale === "en" ? "For the adult" : "給成人／老師"}</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
          {block.steps.map((step) => (
            <li key={step.zh}>{pick(step, locale)}</li>
          ))}
        </ol>
      </section>
    );
  }
  if (block.kind === "student") {
    return <p className="text-base leading-relaxed">{pick(block.text, locale)}</p>;
  }
  if (block.kind === "note") {
    return <p className="text-sm leading-relaxed text-ink-soft">{pick(block.text, locale)}</p>;
  }
  if (block.kind === "checklist") {
    return (
      <section>
        <h3 className="font-serif text-xl">{pick(block.title, locale)}</h3>
        <ul className="mt-3 grid gap-2">
          {block.items.map((item) => (
            <li key={item.zh} className="flex gap-3 rounded-lg border border-rule bg-paper-2 px-3 py-2 text-sm">
              <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded border border-ink/40" />
              <span>{pick(item, locale)}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (block.kind === "boxes") {
    const lines = block.lines ?? 2;
    return (
      <section>
        <h3 className="font-serif text-xl">{pick(block.title, locale)}</h3>
        <div className="mt-3 grid gap-3">
          {block.labels.map((label) => (
            <label key={label.zh} className="block">
              <span className="text-sm">{pick(label, locale)}</span>
              <span className="mt-1 block rounded-lg border border-rule bg-white">
                {Array.from({ length: lines }).map((_, line) => (
                  <span key={line} className="block h-8 border-b border-rule/70 last:border-0" />
                ))}
              </span>
            </label>
          ))}
        </div>
      </section>
    );
  }
  if (block.kind === "grid") {
    const rows = block.starterRows ?? Array.from({ length: block.rowCount }, () => block.headers.map(() => ({ zh: "", en: "" })));
    while (rows.length < block.rowCount) rows.push(block.headers.map(() => ({ zh: "", en: "" })));
    return (
      <section className="overflow-x-auto">
        <h3 className="font-serif text-xl">{pick(block.title, locale)}</h3>
        <table className="mt-3 w-full min-w-[28rem] border-collapse text-sm">
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header.zh} className="border border-rule bg-[#efe6d6] px-2 py-2 text-left font-medium">
                  {pick(header, locale)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, block.rowCount).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {block.headers.map((header, colIndex) => (
                  <td key={`${header.zh}-${colIndex}`} className="h-12 border border-rule bg-white px-2 py-1 align-top">
                    {row[colIndex] ? pick(row[colIndex], locale) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
  if (block.kind === "cards") {
    return (
      <section>
        <h3 className="font-serif text-xl">{pick(block.title, locale)}</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {block.cards.map((card) => (
            <article key={card.title.zh} className="rounded-xl border border-rule bg-white p-4">
              <h4 className="font-medium">{pick(card.title, locale)}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pick(card.body, locale)}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }
  if (block.kind === "scale") {
    return (
      <section>
        <h3 className="font-serif text-xl">{pick(block.title, locale)}</h3>
        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="max-w-[6rem] text-xs text-ink-soft">{pick(block.min, locale)}</span>
          <div className="flex flex-1 justify-between">
            {Array.from({ length: block.steps }).map((_, index) => (
              <span key={index} className="flex flex-col items-center gap-1">
                <span className="h-8 w-8 rounded-full border border-ink/40" />
                <span className="text-[11px] text-ink-soft">{index + 1}</span>
              </span>
            ))}
          </div>
          <span className="max-w-[6rem] text-right text-xs text-ink-soft">{pick(block.max, locale)}</span>
        </div>
        {block.labels?.length ? (
          <ul className="mt-3 grid gap-1 text-sm text-ink-soft">
            {block.labels.map((label) => (
              <li key={label.zh}>{pick(label, locale)}</li>
            ))}
          </ul>
        ) : null}
      </section>
    );
  }
  if (block.kind === "choice") {
    return (
      <section>
        <h3 className="font-serif text-xl">{pick(block.title, locale)}</h3>
        <ul className="mt-3 grid gap-2">
          {block.options.map((option) => (
            <li key={option.zh} className="flex gap-3 rounded-lg border border-rule bg-paper-2 px-3 py-2 text-sm">
              <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full border border-ink/40" />
              <span>{pick(option, locale)}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (block.kind === "sequence") {
    return (
      <section>
        <h3 className="font-serif text-xl">{pick(block.title, locale)}</h3>
        <ol className="mt-3 grid gap-2">
          {block.steps.map((step, index) => (
            <li key={step.zh} className="flex gap-3 rounded-lg border border-rule bg-white px-3 py-2 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-night text-[12px] text-paper-2">
                {index + 1}
              </span>
              <span className="pt-0.5">{pick(step, locale)}</span>
            </li>
          ))}
        </ol>
      </section>
    );
  }
  if (block.kind === "script") {
    return (
      <section>
        <h3 className="font-serif text-xl">{pick(block.title, locale)}</h3>
        <div className="mt-3 grid gap-2">
          {block.lines.map((line, index) => (
            <p key={`${line.speaker.zh}-${index}`} className="rounded-lg bg-paper-2 px-3 py-2 text-sm leading-relaxed">
              <strong>{pick(line.speaker, locale)}：</strong>
              {pick(line.text, locale)}
            </p>
          ))}
        </div>
      </section>
    );
  }
  return null;
}
