import type { DsmLens } from "@/lib/types";

export type LocalePair = { zh: string; en: string };

export type IllnessSeed = {
  slug: string;
  zh: string;
  en: string;
  blurb: string;
  blurbEn: string;
  related?: string[];
  tags?: string[];
  cog: string;
  loops: string[];
  beh: string;
  acts: string[];
  assess: string;
  tools: string[];
  diffs: string[];
  med: string;
  tx: string;
  caution: string[];
  case: string;
  teach: string[];
};

export type ChapterSeed = {
  order: number;
  slug: string;
  zh: string;
  en: string;
  summary: string;
  summaryEn: string;
  illnesses: IllnessSeed[];
  /** When a chapter is itself the illness hub (e.g. gender dysphoria). */
  self?: IllnessSeed;
};

export const lensMeta: Record<
  DsmLens,
  { zh: string; en: string; kicker: LocalePair }
> = {
  cognitive: {
    zh: "認知模式",
    en: "Cognitive model",
    kicker: { zh: "大腦如何預測與解釋", en: "How the mind predicts and explains" },
  },
  behavior: {
    zh: "行為",
    en: "Behavior",
    kicker: { zh: "可觀察的維持環", en: "Observable maintaining loops" },
  },
  assessment: {
    zh: "衡鑑",
    en: "Assessment",
    kicker: { zh: "問什麼、不抄準則", en: "What to ask, without copying criteria" },
  },
  treatment: {
    zh: "藥物簡介與心理介入",
    en: "Medicine intro & psycho-intervention",
    kicker: { zh: "教育用地圖，不是處方", en: "An educational map, not a prescription" },
  },
  case: {
    zh: "案例分享",
    en: "Case sharing",
    kicker: { zh: "合成教學敘事", en: "Composite teaching narrative" },
  },
};

export const lensOrder: DsmLens[] = ["cognitive", "behavior", "assessment", "treatment", "case"];
