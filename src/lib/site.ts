import { term } from "@/lib/i18n";
import type { LevelMeta } from "@/lib/types";

export { term };

export const REFLECTION_DOMAIN = "self-reflection";

export const reflection = {
  href: "/reflection",
  slug: REFLECTION_DOMAIN,
  zh: "自我反思",
  en: "Self Reflection",
  nav: { zh: "自我反思", en: "Self Reflection" },
  color: "#9a6840",
  kicker: {
    zh: "把理論照回自己",
    en: "Turn the map back on yourself",
  },
  description: {
    zh: "金字塔是地圖；這一頁是鏡子。把讀過的心理動力、神經科學與哲學，寫回自己的身體、關係與選擇。",
    en: "The pyramid is a map; this page is a mirror. Write psychodynamics, neuroscience, and philosophy back onto your own body, relationships, and choices.",
  },
};

export const site = {
  name: "Mind-Note",
  nameZh: "Mind-Note",
  study: {
    zh: "心理學、神經科學與哲學的研讀",
    en: "Study on psychology, neuroscience and philosophy",
  },
  tagline: {
    zh: "心理學、神經科學與哲學的研讀 · 心智地圖 (Map of Our Mind)",
    en: "Study on psychology, neuroscience and philosophy · Map of Our Mind",
  },
  description: {
    zh: "Mind-Note：心理學、神經科學與哲學的研讀筆記。以五層金字塔索引心智結構、測量、互動、臨床界線與形而上學。繁中版於術語後括注英文。",
    en: "Mind-Note: a study on psychology, neuroscience and philosophy, indexed as a five-level pyramid from the structure of mind to metaphysics.",
  },
};

export const levels: LevelMeta[] = [
  {
    id: 5,
    slug: "metaphysics",
    zh: "超越心智與形而上學",
    en: "Metaphysics: beyond mind",
    nav: { zh: "形而上學", en: "Metaphysics" },
    kicker: { zh: "科學的盡頭是哲學", en: "Where science meets philosophy" },
    description: {
      zh: "跳脫純粹的生物與認知模型，從更高的維度俯瞰人類心智：榮格、靈性實踐與東方底層框架。",
      en: "Step beyond purely biological and cognitive models: Jung, contemplative practice, and Eastern frames.",
    },
    color: "#d4a017",
  },
  {
    id: 4,
    slug: "sick-vs-healthy",
    zh: "健康與疾病的界線",
    en: "Sick VS Healthy Mind",
    nav: { zh: "健康與疾病", en: "Sick vs Healthy" },
    kicker: { zh: "失衡時的臨床表徵", en: "When interaction loses balance" },
    description: {
      zh: "當心智互動失去平衡時的臨床表徵，以及科學與醫學如何介入修復：分類、藥理與心理治療歷程。",
      en: "Clinical signs when mind interaction loses balance, and how medicine and psychotherapy repair it.",
    },
    color: "#b44a55",
  },
  {
    id: 3,
    slug: "interaction",
    zh: "心智的互動",
    en: "Interaction of the mind",
    nav: { zh: "心智的互動", en: "Interaction" },
    kicker: { zh: "深入大腦黑盒子", en: "Inside the black box" },
    description: {
      zh: "神經迴路與認知功能如何即時互動：執行功能、具身認知，以及大腦網絡的動態。",
      en: "How circuits and cognition interact in real time: executive function, embodied cognition, and brain networks.",
    },
    color: "#2f7a7a",
  },
  {
    id: 2,
    slug: "measure",
    zh: "心智的測量",
    en: "Measure of the mind",
    nav: { zh: "心智的測量", en: "Measure" },
    kicker: { zh: "把抽象變成可觀察", en: "From abstraction to data" },
    description: {
      zh: "將抽象的心智與行為，轉化為可被觀察、量化與分析的客觀數據：制約、人格測量與心理衡鑑。",
      en: "Turn mind and behavior into observable, quantifiable data: conditioning, trait measurement, and psychometrics.",
    },
    color: "#5a7184",
  },
  {
    id: 1,
    slug: "structure",
    zh: "心智的本質與結構",
    en: "What is mind: structure of the mind",
    nav: { zh: "本質與結構", en: "Structure" },
    kicker: { zh: "人之所以為人的底層邏輯", en: "The base settings of a person" },
    description: {
      zh: "探討「人之所以為人」的底層邏輯，以及造成個體差異的基礎設定：心理動力、發展、與運算意識。",
      en: "The underlying logic of being human, and the base settings that make people differ: psychodynamics, development, and computational consciousness.",
    },
    color: "#2e3d6d",
  },
];

export function levelById(id: number) {
  return levels.find((level) => level.id === id);
}
