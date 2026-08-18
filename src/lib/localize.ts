import type { ContentBlock } from "@/lib/types";
import { applyTerms, type Locale } from "@/lib/i18n";

function mapText(text: string, locale: Locale) {
  return applyTerms(text, locale);
}

export function localizeBlocks(blocks: ContentBlock[], locale: Locale): ContentBlock[] {
  return blocks.map((block) => {
    if (block.type === "p" || block.type === "h2" || block.type === "h3") {
      return { ...block, text: mapText(block.text, locale) };
    }
    if (block.type === "quote") {
      return {
        ...block,
        text: mapText(block.text, locale),
        cite: block.cite ? mapText(block.cite, locale) : block.cite,
      };
    }
    if (block.type === "callout") {
      return {
        ...block,
        title: mapText(block.title, locale),
        text: mapText(block.text, locale),
      };
    }
    if (block.type === "ul" || block.type === "ol") {
      return { ...block, items: block.items.map((item) => mapText(item, locale)) };
    }
    return {
      ...block,
      caption: block.caption ? mapText(block.caption, locale) : block.caption,
      headers: block.headers.map((header) => mapText(header, locale)),
      rows: block.rows.map((row) => row.map((cell) => mapText(cell, locale))),
    };
  });
}
