"use client";

import { applyTerms, pick } from "@/lib/i18n";
import { parseMarkdown } from "@/lib/markdown";
import { withBase } from "@/lib/site";
import type { LocaleText } from "@/lib/types";
import { useLocale as useLocaleCtx } from "@/components/LocaleProvider";

function renderInline(text: string, locale: "zh" | "en") {
  const localised = applyTerms(text, locale);
  const parts = localised.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={index} href={withBase(link[2])}>
          {link[1]}
        </a>
      );
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return <strong key={index}>{bold[1]}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function ArticleBody({ source }: { source: LocaleText | string }) {
  const locale = useLocaleCtx();
  const markdown = typeof source === "string" ? source : pick(source, locale);
  const blocks = parseMarkdown(markdown);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{applyTerms(block.text, locale)}</h2>;
        if (block.type === "h3") return <h3 key={index}>{applyTerms(block.text, locale)}</h3>;
        if (block.type === "p") {
          return (
            <p key={index}>{renderInline(block.text, locale)}</p>
          );
        }
        if (block.type === "ul" || block.type === "ol") {
          const List = block.type === "ul" ? "ul" : "ol";
          return (
            <List key={index}>
              {block.items.map((item) => (
                <li key={item}>{renderInline(item, locale)}</li>
              ))}
            </List>
          );
        }
        if (block.type === "quote") {
          return <blockquote key={index}>{renderInline(block.text, locale)}</blockquote>;
        }
        if (block.type === "callout") {
          return (
            <aside
              key={index}
              className="my-6 rounded-xl border-l-4 border-copper bg-[#f4ece2] px-4 py-3 text-[0.98rem] leading-relaxed"
            >
              <p className="mb-1 font-medium">{applyTerms(block.title, locale)}</p>
              <p className="m-0">{renderInline(block.text, locale)}</p>
            </aside>
          );
        }
        return null;
      })}
    </div>
  );
}