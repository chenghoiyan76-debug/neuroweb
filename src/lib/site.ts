import { term } from "@/lib/i18n";

export { term };

export const site = {
  name: "NeuroPsych Integrator",
  nameZh: "精神醫療知識整合平台",
  tagline: {
    zh: "從 DSM-5 分類、症狀、神經藥理到治療神經科學與大腦基礎地圖",
    en: "From DSM-5 classification and symptoms to neuropharmacology, therapeutic neuroscience, and the basic brain map",
  },
  description: {
    zh: "面向精神科醫師、臨床心理師及精神醫療從業人員的專業知識整合網站。繁中版於術語後括注英文；並提供完整英文版。",
    en: "A knowledge hub for psychiatrists, clinical psychologists, and mental health professionals, in Traditional Chinese (with English terminology in parentheses) and English.",
  },
};

export const axes = [
  {
    slug: "dsm",
    href: "/dsm",
    zh: "DSM-5 分類",
    en: "DSM-5 Classification",
    kicker: { zh: "疾病分類學", en: "Nosology" },
    description: {
      zh: "以 DSM-5 大類進入臨床筆記。點選情緒疾患 (Mood Disorders)、思覺失調症譜系 (Schizophrenia Spectrum) 等類別，並連到症狀、神經藥理、治療神經科學與核心神經科學基礎。",
      en: "Enter illness studies from DSM-5 categories such as Mood Disorders and Schizophrenia Spectrum. Each note links to symptoms, neuropharmacology, therapeutic neuroscience, and core neuroscience.",
    },
  },
  {
    slug: "symptoms",
    href: "/symptoms",
    zh: "精神醫學症狀",
    en: "Psychiatric Symptoms",
    kicker: { zh: "從徵象到機制", en: "From sign to mechanism" },
    description: {
      zh: "依臨床表徵分類，例如缺乏快感 (Anhedonia)、幻覺 (Hallucinations)、執行功能障礙 (Executive Dysfunction)，讓臨床工作者從症狀找到機制與解方。",
      en: "Organized by clinical signs such as Anhedonia, Hallucinations, and Executive Dysfunction, so clinicians can move from presentation to mechanism and treatment.",
    },
  },
  {
    slug: "pharmacology",
    href: "/neuropharmacology",
    zh: "神經藥理學",
    en: "Neuropharmacology",
    kicker: { zh: "作用機轉", en: "Mechanisms of action" },
    description: {
      zh: "藥物機轉三大子類：精神病用藥 (Psychosis)、止痛藥物 (Pain killers)、神經退化性疾病用藥 (Neurodegeneration)。",
      en: "Three mechanism tracks: Psychosis, Pain killers / pain management, and Neurodegeneration.",
    },
  },
  {
    slug: "interventions",
    href: "/interventions",
    zh: "治療神經科學與介入",
    en: "Therapeutic Neuroscience & Interventions",
    kicker: { zh: "治療的生物學機制", en: "Biological mechanisms of treatments" },
    description: {
      zh: "探討治療方法背後的生物學機制：認知行為治療的神經可塑性 (Neuroplasticity in CBT)、眼動脫敏與歷程處理的記憶再鞏固 (Memory Reconsolidation)、經顱磁刺激／電痙攣治療 (TMS/ECT)、神經生理回饋 (Neurofeedback)。",
      en: "Biological mechanisms of treatments: neuroplasticity in CBT, memory reconsolidation in EMDR, TMS/ECT, and neurofeedback.",
    },
  },
  {
    slug: "fundamentals",
    href: "/fundamentals",
    zh: "核心神經科學基礎",
    en: "Core Neuroscience Fundamentals",
    kicker: { zh: "大腦地圖", en: "The brain map" },
    description: {
      zh: "必備的底層大腦地圖與化學系統：多巴胺 (Dopamine)、血清素 (Serotonin)、GABA／麩胺酸 (GABA/Glutamate)、HPA 軸 (HPA Axis)、邊緣系統—前額葉迴路 (Limbic-PFC circuitry)、睡眠結構 (Sleep Architecture)、成癮與獎賞迴路 (Addiction and Reward System)。",
      en: "The required brain map: dopamine, serotonin, GABA/glutamate, HPA axis, limbic–PFC circuitry, sleep architecture, and addiction / reward.",
    },
  },
] as const;
