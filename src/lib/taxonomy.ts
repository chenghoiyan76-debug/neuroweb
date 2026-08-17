import type { EvidenceLevel, Pillar, PillarMeta, ReviewStatus, Tag } from "./types";

export const site = {
  name: "NeuroWeb",
  nameZh: "心智科學知識整合平台",
  tagline: "為心理健康專業人士整合心理學、精神醫學與治療取向",
  description:
    "面向精神科醫師、臨床心理師與相關專業人員的中文知識整合網站，系統整理認知模型、神經藥理學、心理治療與神經科學介入，並以文獻回顧、個案研討與中英詞彙表支援實證臨床工作。",
};

export const pillars: PillarMeta[] = [
  {
    slug: "models",
    zh: "心理學與認知模型",
    en: "Psychological & Cognitive Models",
    kicker: "機制與病理模型",
    description:
      "從注意力、記憶與執行功能等基礎認知機制，延伸到特定疾患的病理認知模型，以及生命全程的發展與神經多樣性觀點。",
    href: "/models",
  },
  {
    slug: "psychiatry",
    zh: "精神醫學與神經藥理學",
    en: "Psychiatry & Neuropharmacology",
    kicker: "分類、機轉與用藥",
    description:
      "整理 DSM-5-TR 與 ICD-11 的分類邏輯、精神藥物受體結合特性、臨床藥物動力學，以及副作用與交互作用的安全管理。",
    href: "/psychiatry",
  },
  {
    slug: "therapy",
    zh: "治療取向",
    en: "Therapeutic Approaches",
    kicker: "心理治療與神經介入",
    description:
      "涵蓋 CBT、DBT、EMDR、ACT 等心理治療，以及神經生理回饋、非侵入性腦刺激與神經可塑性的臨床應用。",
    href: "/therapy",
  },
];

export const featureSections = [
  {
    slug: "reviews",
    zh: "文獻回顧",
    en: "Literature Reviews",
    description: "期刊論文摘要與臨床意義解析，協助掌握實證醫學趨勢。",
    href: "/reviews",
  },
  {
    slug: "cases",
    zh: "個案研討",
    en: "Case Studies",
    description: "以匿名教學個案呈現評估、概念化與處遇計畫，促進臨床推理交流。",
    href: "/cases",
  },
  {
    slug: "glossary",
    zh: "術語詞彙表",
    en: "Glossary",
    description: "精準的中英對照專有名詞庫，維護中文圈學術用語的一致性。",
    href: "/glossary",
  },
] as const;

export const tags: Tag[] = [
  { slug: "attention", zh: "注意力", en: "Attention" },
  { slug: "memory", zh: "記憶", en: "Memory" },
  { slug: "executive-function", zh: "執行功能", en: "Executive Functions" },
  { slug: "cognition", zh: "認知", en: "Cognition" },
  { slug: "development", zh: "發展心理學", en: "Developmental Psychology" },
  { slug: "neurodiversity", zh: "神經多樣性", en: "Neurodiversity" },
  { slug: "depression", zh: "憂鬱症", en: "Depression" },
  { slug: "anxiety", zh: "焦慮症", en: "Anxiety" },
  { slug: "ptsd", zh: "創傷後壓力症", en: "PTSD" },
  { slug: "bipolar", zh: "雙相情緒障礙", en: "Bipolar Disorder" },
  { slug: "schizophrenia", zh: "思覺失調症", en: "Schizophrenia" },
  { slug: "personality", zh: "人格與情緒失調", en: "Personality & Emotion Dysregulation" },
  { slug: "adhd", zh: "注意力不足過動症", en: "ADHD" },
  { slug: "nosology", zh: "疾病分類", en: "Nosology" },
  { slug: "dsm", zh: "DSM-5-TR", en: "DSM-5-TR" },
  { slug: "icd", zh: "ICD-11", en: "ICD-11" },
  { slug: "neuropharmacology", zh: "神經藥理學", en: "Neuropharmacology" },
  { slug: "antidepressants", zh: "抗憂鬱劑", en: "Antidepressants" },
  { slug: "antipsychotics", zh: "抗精神病藥物", en: "Antipsychotics" },
  { slug: "mood-stabilizers", zh: "情緒穩定劑", en: "Mood Stabilizers" },
  { slug: "pharmacokinetics", zh: "藥物動力學", en: "Pharmacokinetics" },
  { slug: "ddi", zh: "藥物交互作用", en: "Drug-Drug Interactions" },
  { slug: "cbt", zh: "認知行為治療", en: "CBT" },
  { slug: "dbt", zh: "辯證行為治療", en: "DBT" },
  { slug: "emdr", zh: "眼動脫敏與歷程處理", en: "EMDR" },
  { slug: "act", zh: "接受與承諾治療", en: "ACT" },
  { slug: "neurofeedback", zh: "神經生理回饋", en: "Neurofeedback" },
  { slug: "tms", zh: "經顱磁刺激", en: "TMS" },
  { slug: "neuroplasticity", zh: "神經可塑性", en: "Neuroplasticity" },
  { slug: "ebm", zh: "實證醫學", en: "Evidence-Based Medicine" },
  { slug: "case-formulation", zh: "個案概念化", en: "Case Formulation" },
  { slug: "culture", zh: "華語文化適應", en: "Chinese-speaking Context" },
];

export const tagMap = Object.fromEntries(tags.map((tag) => [tag.slug, tag])) as Record<
  string,
  Tag
>;

export const pillarPath: Record<Pillar, string> = {
  models: "/models",
  psychiatry: "/psychiatry",
  therapy: "/therapy",
  reviews: "/reviews",
  cases: "/cases",
};

export const statusLabel: Record<ReviewStatus, string> = {
  "peer-reviewed": "同儕審閱刊出",
  published: "編輯刊出",
  "under-review": "審閱中",
  editorial: "編輯說明",
};

export const evidenceLabel: Record<EvidenceLevel, string> = {
  "systematic-review": "系統性回顧／統合分析",
  rct: "隨機對照試驗為主",
  observational: "觀察性研究為主",
  "expert-consensus": "指引／專家共識",
  theoretical: "理論模型",
};

export function articleHref(pillar: Pillar, slug: string) {
  return `${pillarPath[pillar]}/${slug}`;
}
