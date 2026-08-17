import type { ContentBlock } from "@/lib/types";
import { RichText } from "./RichText";

const calloutStyle = {
  info: "border-teal-mid bg-[#e7eeea]",
  warning: "border-clinical bg-[#f6ece8]",
  clinical: "border-copper bg-[#f4ece2]",
};

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p key={index}>
              <RichText text={block.text} />
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2 key={index} id={block.id}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={index} id={block.id}>
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={index}>
              {block.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="my-6 border-l-4 border-copper bg-paper-2 px-5 py-4 font-serif text-lg leading-relaxed"
            >
              <RichText text={block.text} />
              {block.cite ? (
                <cite className="mt-2 block font-sans text-sm not-italic text-ink-soft">
                  {block.cite}
                </cite>
              ) : null}
            </blockquote>
          );
        }
        if (block.type === "callout") {
          return (
            <aside
              key={index}
              className={`my-6 rounded-xl border-l-4 px-4 py-3 text-[0.98rem] leading-relaxed ${calloutStyle[block.variant]}`}
            >
              <p className="mb-1 font-medium">{block.title}</p>
              <p className="m-0">
                <RichText text={block.text} />
              </p>
            </aside>
          );
        }
        return (
          <figure key={index} className="my-6 overflow-x-auto rounded-xl border border-rule">
            <table>
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell) => (
                      <td key={cell}>
                        <RichText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {block.caption ? (
              <figcaption className="px-3 py-2 text-xs text-ink-soft">{block.caption}</figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
