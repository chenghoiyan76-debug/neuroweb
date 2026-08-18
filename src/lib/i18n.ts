export type Locale = "zh" | "en";

export const defaultLocale: Locale = "zh";

export function isLocale(value: string | undefined): value is Locale {
  return value === "zh" || value === "en";
}

/** Marker used in content: {{中文|English}} */
export function term(en: string, zh: string) {
  return `{{${zh}|${en}}}`;
}

export function applyTerms(text: string, locale: Locale) {
  return text.replace(/\{\{([^|{}]+)\|([^|{}]+)\}\}/g, (_match, zh: string, en: string) =>
    locale === "en" ? en : `${zh} (${en})`,
  );
}

export function bilingualTitle(zh: string, en: string, locale: Locale) {
  return locale === "en" ? en : `${zh} (${en})`;
}

export const ui = {
  zh: {
    brandSub: "精神醫療知識整合",
    search: "搜尋",
    menu: "選單",
    close: "關閉",
    dsm: "DSM-5 分類",
    dsmOverview: "DSM-5 分類 · 總覽",
    dropdownHint: "滑鼠移入展開 · 常見精神疾病大類",
    audience:
      "精神科醫師、臨床心理師及精神醫療從業人員。繁中版於術語後附上英文；亦可切換至英文版。",
    about: "關於本站",
    disclaimer: "聲明",
    disclaimerText:
      "教育用途，不能取代個別臨床判斷或官方 DSM-5 / DSM-5-TR 文本。不重製受著作權保護的診斷準則原文。",
    related: "跨軸連結",
    relatedHint: "精神醫學症狀 · 神經藥理學 · 治療神經科學與介入 · 核心神經科學基礎",
    updated: "更新",
    backHome: "← NeuroPsych Integrator",
    fiveAxes: "五大主軸",
    coreNav: "核心導覽",
    featured: "精選筆記",
    heroLead: "精神科醫師 · 臨床心理師 · 精神醫療專業人員",
    heroBody:
      "本站提供繁體中文與 English 兩個版本。繁中版會在專業術語後以括號標示英文，例如：缺乏快感 (Anhedonia)。將游標移至「DSM-5 分類 (DSM-5 Classification)」可展開情緒疾患 (Mood Disorders)、思覺失調症譜系 (Schizophrenia Spectrum) 等大類。",
    enterDsm: "進入 DSM-5 分類",
    fromSymptoms: "從症狀找機制",
    illnessStudies: "臨床筆記",
    illnessCount: "則臨床筆記",
    recentNotes: "最近更新的臨床筆記",
    emptyCategory: "此大類尚無筆記，可經 Lab 後台新增。",
    searchLead: "跨軸搜尋",
    searchHelp: "可用中文或英文術語搜尋，例如：缺乏快感、Anhedonia、D2、TMS、HPA。",
    searchPlaceholder: "缺乏快感 (Anhedonia)、氯氮平 (Clozapine)…",
    aboutTitle: "關於 NeuroPsych Integrator",
    aboutBody:
      "本站是為精神科醫師、臨床心理師及精神醫療從業人員設計的知識整合介面。五大主軸互相連結：從 DSM-5 大類進入臨床筆記，或從症狀反推機制與解方。",
    aboutTech: "技術",
    aboutTechBody:
      "以 Next.js / React 建立，內容以資料層保存，便於 Git 版本控管。內容更新走隱藏的 Lab 後台（頁尾 LAB）。",
    aboutPrinciples: "原則",
    principle1: "繁中版以中文敘事，並在術語後括注英文；英文版為完整英文。",
    principle2: "不重製 DSM-5 受著作權保護的準則條文。",
    principle3: "藥理與刺激協定為專業教育，不是處方工具。",
    symptomsIntro:
      "從臨床表徵進入：缺乏快感 (Anhedonia)、幻覺 (Hallucinations)、執行功能障礙 (Executive Dysfunction) 等。每則筆記連到機制（核心神經科學基礎）與解方（神經藥理學／治療介入）。",
    relatedAxes: "跨軸連結",
    dsmIntro:
      "將游標移至頂部「DSM-5 分類」可展開浮動下拉選單，顯示情緒疾患 (Mood Disorders)、思覺失調症譜系 (Schizophrenia Spectrum) 等大類。點擊後進入臨床筆記。本站不重製 DSM-5 診斷準則原文。",
    notFoundTitle: "找不到這個筆記",
    notFoundBody: "路徑可能尚未建立，或 DSM-5 大類 slug 不匹配。",
    notFoundHome: "回到 NeuroPsych Integrator",
    language: "語言",
    langZh: "繁中",
    langEn: "English",
  },
  en: {
    brandSub: "Mental health knowledge integration",
    search: "Search",
    menu: "Menu",
    close: "Close",
    dsm: "DSM-5 Classification",
    dsmOverview: "DSM-5 Classification · overview",
    dropdownHint: "Hover to expand · common psychiatric illness categories",
    audience:
      "For psychiatrists, clinical psychologists, and mental health professionals. Switch to Traditional Chinese to see terms as 中文 (English).",
    about: "About",
    disclaimer: "Disclaimer",
    disclaimerText:
      "Educational use only. This does not replace clinical judgment or the official DSM-5 / DSM-5-TR text. Diagnostic criteria are not reproduced.",
    related: "Related axes",
    relatedHint:
      "Psychiatric Symptoms · Neuropharmacology · Therapeutic Neuroscience · Core Neuroscience",
    updated: "Updated",
    backHome: "← NeuroPsych Integrator",
    fiveAxes: "Five axes",
    coreNav: "Core navigation",
    featured: "Featured notes",
    heroLead: "For psychiatrists · clinical psychologists · mental health professionals",
    heroBody:
      "The site is available in Traditional Chinese and English. In Chinese, terminology appears as 中文 (English), e.g. 缺乏快感 (Anhedonia). Hover DSM-5 Classification for Mood Disorders, Schizophrenia Spectrum, and other categories.",
    enterDsm: "Open DSM-5 Classification",
    fromSymptoms: "From symptom to mechanism",
    illnessStudies: "Illness studies",
    illnessCount: "illness studies",
    recentNotes: "Recently updated notes",
    emptyCategory: "No notes in this category yet. Add them in Lab.",
    searchLead: "Cross-axis search",
    searchHelp: "Search in English or Chinese, e.g. Anhedonia, D2, TMS, HPA.",
    searchPlaceholder: "Anhedonia, Clozapine, Memory reconsolidation…",
    aboutTitle: "About NeuroPsych Integrator",
    aboutBody:
      "A knowledge hub for psychiatrists, clinical psychologists, and related clinicians. Move from DSM-5 categories into illness studies, or from signs to mechanisms and treatments.",
    aboutTech: "Stack",
    aboutTechBody:
      "Built with Next.js / React. Content lives in a data layer for Git versioning. Updates go through the hidden Lab (footer).",
    aboutPrinciples: "Principles",
    principle1: "Chinese copy annotates terminology in parentheses; English copy is fully English.",
    principle2: "DSM-5 diagnostic criteria are not reproduced.",
    principle3: "Pharmacology and stimulation notes are educational, not prescribing tools.",
    symptomsIntro:
      "Enter from clinical signs: Anhedonia, Hallucinations, Executive Dysfunction. Each note links to mechanisms (Core Neuroscience) and treatments (Neuropharmacology / Interventions).",
    relatedAxes: "Related axes",
    dsmIntro:
      "Hover DSM-5 Classification in the top nav to open the dropdown of common categories such as Mood Disorders and Schizophrenia Spectrum. Criteria text from DSM-5 is not reproduced.",
    notFoundTitle: "Note not found",
    notFoundBody: "This path may not exist yet, or the DSM-5 category slug does not match.",
    notFoundHome: "Back to NeuroPsych Integrator",
    language: "Language",
    langZh: "繁中",
    langEn: "English",
  },
} as const;

export type UiKey = keyof typeof ui.zh;
