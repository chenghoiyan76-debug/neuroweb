import { term } from "@/lib/i18n";
import { note } from "@/data/indexNotes";
import { lensMeta, lensOrder, type ChapterSeed, type IllnessSeed } from "./types";
import type { ContentBlock, Domain, DsmLens, Note } from "@/lib/types";
import { dsmChapters } from "./catalog";

const disclaimer: ContentBlock = {
  type: "callout",
  variant: "warning",
  title: term("Educational index", "教學索引"),
  text: "本頁是思考地圖，**不重製 DSM-5／DSM-5-TR 診斷準則原文**，也不提供處方或劑量。正式診斷與用藥以官方文本與臨床判斷為準。",
};

const composite: ContentBlock = {
  type: "callout",
  variant: "info",
  title: term("Composite case", "合成案例"),
  text: "以下為教學用合成敘事，細節已打散，不是真實個案。",
};

function lensRelated(illness: IllnessSeed, lens: DsmLens) {
  const siblings = lensOrder.filter((item) => item !== lens).map((item) => `${illness.slug}-${item}`);
  return [...siblings, ...(illness.related ?? [])];
}

function lensBlocks(illness: IllnessSeed, lens: DsmLens): ContentBlock[] {
  if (lens === "cognitive") {
    return [
      disclaimer,
      { type: "p", text: illness.cog },
      { type: "h2", text: "維持認知的環" },
      { type: "ul", items: illness.loops },
    ];
  }
  if (lens === "behavior") {
    return [
      disclaimer,
      { type: "p", text: illness.beh },
      { type: "h2", text: "功能與陷阱" },
      { type: "ul", items: illness.acts },
    ];
  }
  if (lens === "assessment") {
    return [
      disclaimer,
      { type: "p", text: illness.assess },
      { type: "h2", text: "常用衡鑑入口（只列名稱，不重製題本）" },
      { type: "ul", items: illness.tools },
      { type: "h2", text: "常被混在一起的鑑別方向" },
      { type: "ul", items: illness.diffs },
    ];
  }
  if (lens === "treatment") {
    return [
      disclaimer,
      {
        type: "callout",
        variant: "clinical",
        title: term("Not a prescription", "不是處方"),
        text: "藥物只寫到機轉類別與臨床提問。任何劑量、換藥與停藥都必須由執業醫師決定。",
      },
      { type: "h2", text: "藥物簡介" },
      { type: "p", text: illness.med },
      { type: "h2", text: "心理介入" },
      { type: "p", text: illness.tx },
      { type: "h2", text: "權衡" },
      { type: "ul", items: illness.caution },
    ];
  }
  return [
    disclaimer,
    composite,
    { type: "p", text: illness.case },
    { type: "h2", text: "這一則要教會什麼" },
    { type: "ul", items: illness.teach },
  ];
}

function lensNote(illness: IllnessSeed, lens: DsmLens): Note {
  const meta = lensMeta[lens];
  return note({
    slug: `${illness.slug}-${lens}`,
    level: 4,
    domain: illness.slug,
    zh: `${illness.zh}：${meta.zh}`,
    en: `${illness.en}: ${meta.en}`,
    summary: illness.blurb,
    summaryEn: illness.blurbEn,
    tags: [lens, illness.slug, ...(illness.tags ?? [])],
    related: lensRelated(illness, lens),
    blocks: lensBlocks(illness, lens),
  });
}

function withLens(noteItem: Note, lens: DsmLens): Note {
  return { ...noteItem, lens };
}

function illnessDomain(chapter: ChapterSeed, illness: IllnessSeed, order: number): Domain {
  return {
    slug: illness.slug,
    level: 4,
    parent: chapter.slug,
    zh: illness.zh,
    en: illness.en,
    summary: illness.blurb,
    summaryEn: illness.blurbEn,
    kind: "dsm-illness",
    order,
  };
}

export function buildDsm(): { domains: Domain[]; notes: Note[] } {
  const domains: Domain[] = [];
  const notes: Note[] = [];

  for (const chapter of dsmChapters) {
    domains.push({
      slug: chapter.slug,
      level: 4,
      parent: "psychiatry-dsm5",
      zh: chapter.zh,
      en: chapter.en,
      summary: chapter.summary,
      summaryEn: chapter.summaryEn,
      kind: "dsm-chapter",
      order: chapter.order,
    });

    const hubs = chapter.self ? [chapter.self] : chapter.illnesses;
    hubs.forEach((illness, index) => {
      if (!chapter.self) {
        domains.push(illnessDomain(chapter, illness, index + 1));
      }
      for (const lens of lensOrder) {
        const generated = lensNote(
          chapter.self ? { ...illness, slug: chapter.slug } : illness,
          lens,
        );
        if (chapter.self) generated.domain = chapter.slug;
        notes.push(withLens(generated, lens));
      }
    });
  }

  return { domains, notes };
}

export const dsmBuilt = buildDsm();
export const dsmDomains = dsmBuilt.domains;
export const dsmNotes = dsmBuilt.notes;
