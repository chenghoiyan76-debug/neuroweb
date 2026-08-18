import { term } from "@/lib/i18n";
import type { LevelMeta } from "@/lib/types";

export { term };

export const site = {
  name: "Digital Brain",
  nameZh: "數位筆記",
  tagline: {
    zh: "心智地圖 (Map of Our Mind) · 從結構到形而上學的第二大腦",
    en: "Map of Our Mind · a second brain from structure to metaphysics",
  },
  description: {
    zh: "個人化的數位筆記：以五層金字塔索引神經科學、心理動力、臨床精神醫學與東方哲學。繁中版於術語後括注英文。",
    en: "A personal digital brain indexed as a five-level pyramid: neuroscience, psychodynamics, clinical psychiatry, and Eastern philosophy.",
  },
};

export const levels: LevelMeta[] = [
  {
    id: 5,
    slug: "metaphysics",
    zh: "超越心智與形而上學",
    en: "Metaphysics: beyond mind",
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
