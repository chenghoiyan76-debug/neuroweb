export const site = {
  name: "NeuroPsych Integrator",
  nameZh: "精神醫療知識整合平台",
  tagline: "從 DSM-5 分類、症狀、神經藥理到治療神經科學與大腦基礎地圖",
  description:
    "面向精神科醫師、臨床心理師及精神醫療從業人員的專業知識整合網站。專業術語保留英文，主要內容以繁體中文撰寫，連結 DSM-5 Classification、Psychiatric Symptoms、Neuropharmacology、Therapeutic Neuroscience 與 Core Neuroscience Fundamentals。",
};

export const axes = [
  {
    slug: "dsm",
    href: "/dsm",
    zh: "DSM-5 分類",
    en: "DSM-5 Classification",
    kicker: "Nosology",
    description:
      "以 DSM-5 大類進入 Illness Studies。點選 Mood Disorders、Schizophrenia Spectrum 等類別，閱讀臨床筆記，並連到症狀、神經藥理、治療神經科學與核心神經科學基礎。",
  },
  {
    slug: "symptoms",
    href: "/symptoms",
    zh: "精神醫學症狀",
    en: "Psychiatric Symptoms",
    kicker: "From sign to mechanism",
    description:
      "依臨床表徵分類（Anhedonia、Hallucinations、Executive Dysfunction），讓臨床工作者從症狀找到機制與解方。",
  },
  {
    slug: "pharmacology",
    href: "/neuropharmacology",
    zh: "神經藥理學",
    en: "Neuropharmacology",
    kicker: "Mechanisms of action",
    description:
      "藥物機轉三大子類：Psychosis、Pain killers、Neurodegeneration。",
  },
  {
    slug: "interventions",
    href: "/interventions",
    zh: "治療神經科學與介入",
    en: "Therapeutic Neuroscience & Interventions",
    kicker: "Biological mechanisms of treatments",
    description:
      "探討治療方法背後的生物學機制：Neuroplasticity in CBT、EMDR 的 Memory Reconsolidation、TMS/ECT、Neurofeedback。",
  },
  {
    slug: "fundamentals",
    href: "/fundamentals",
    zh: "核心神經科學基礎",
    en: "Core Neuroscience Fundamentals",
    kicker: "The brain map",
    description:
      "心理健康工作者必備的底層大腦地圖與化學系統：Dopamine / Serotonin / GABA-Glutamate、HPA Axis、Limbic-PFC circuitry、Sleep Architecture、Addiction 與 Reward System。",
  },
] as const;

export function term(en: string, zh: string) {
  return `${en}（${zh}）`;
}
