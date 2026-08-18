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
    brandSub: "心理學、神經科學與哲學的研讀",
    search: "搜尋",
    menu: "選單",
    close: "關閉",
    about: "關於",
    garden: "花園／Inbox",
    disclaimer: "聲明",
    disclaimerText:
      "這是 Mind-Note 的個人研讀筆記，不是臨床指引。教育用途，不能取代個別判斷或官方 DSM-5 / DSM-5-TR 文本。不重製受著作權保護的診斷準則原文。",
    related: "相關筆記",
    relatedHint: "依思考路徑互相生長，而不是依科別切割。",
    updated: "更新",
    backHome: "← Mind-Note",
    pyramid: "心智地圖",
    index: "索引目錄",
    featured: "精選筆記",
    heroLead: "Mind-Note",
    heroBody:
      "心理學、神經科學與哲學的研讀。把知識收斂成一座五層金字塔：底層是心智的結構，頂層是形而上學。繁中版會在術語後括注英文，例如：依附理論 (Attachment Theory)。",
    enterMap: "進入金字塔",
    enterLevel1: "從底層開始",
    emptyDomain: "這個領域尚無筆記。可從 Lab 後門新增頁面與資源。",
    searchLead: "在 Mind-Note 裡搜尋",
    searchHelp: "可用中文或英文術語搜尋，例如：依附、EMS、DMN、I Ching、TMS。",
    searchPlaceholder: "基模 (Schema)、集體潛意識 (Collective Unconscious)…",
    aboutTitle: "關於 Mind-Note",
    aboutBody:
      "Mind-Note 是心理學、神經科學與哲學的研讀筆記。這不是給大眾的衛教網站，而是把硬底子科學與哲學串成個人思考地圖。知識依金字塔生長，而不是依科別堆積。",
    aboutTech: "如何生長",
    aboutTechBody:
      "以 Next.js 建立。索引與筆記存在資料層，可用 Git 版本控管。隱藏的 Lab 後門可新增頁面、筆記與資源，未歸檔的內容會先進入花園／Inbox。",
    aboutPrinciples: "原則",
    principle1: "繁中版以中文敘事，術語後括注英文；英文版為完整英文。",
    principle2: "不重製 DSM-5 受著作權保護的準則條文。",
    principle3: "藥理、刺激與靈性筆記都是思考索引，不是處方或修行指導。",
    notFoundTitle: "找不到這個筆記",
    notFoundBody: "路徑可能尚未建立，或 slug 不匹配。可從 Lab 後門補上。",
    notFoundHome: "回到金字塔",
    language: "語言",
    langZh: "繁中",
    langEn: "English",
    resources: "資源",
    domains: "領域",
    notes: "筆記",
    inbox: "Inbox",
    addViaLab: "從 Lab 新增",
    customPage: "自訂頁面",
    unfiled: "尚未歸檔",
    children: "子領域",
    inThisDomain: "這個領域的筆記",
    levelLabel: "層級",
  },
  en: {
    brandSub: "Study on psychology, neuroscience and philosophy",
    search: "Search",
    menu: "Menu",
    close: "Close",
    about: "About",
    garden: "Garden / Inbox",
    disclaimer: "Disclaimer",
    disclaimerText:
      "Mind-Note is a personal study notebook, not a clinical guideline. Educational use only. This does not replace judgment or the official DSM-5 / DSM-5-TR text. Diagnostic criteria are not reproduced.",
    related: "Related notes",
    relatedHint: "Notes grow along a thinking path, not along departmental silos.",
    updated: "Updated",
    backHome: "← Mind-Note",
    pyramid: "Map of Our Mind",
    index: "Index",
    featured: "Featured notes",
    heroLead: "Mind-Note",
    heroBody:
      "A study on psychology, neuroscience and philosophy. A five-level pyramid: structure of mind at the base, metaphysics at the apex. In Chinese, terminology appears as 中文 (English).",
    enterMap: "Open the pyramid",
    enterLevel1: "Start at the base",
    emptyDomain: "No notes here yet. Add pages and resources through the Lab back door.",
    searchLead: "Search Mind-Note",
    searchHelp: "Search in English or Chinese, e.g. attachment, EMS, DMN, I Ching, TMS.",
    searchPlaceholder: "Schema, Collective Unconscious, Predictive coding…",
    aboutTitle: "About Mind-Note",
    aboutBody:
      "Mind-Note is a study on psychology, neuroscience and philosophy. Not a public health site: a personal map that joins hard science with philosophy. Knowledge grows as a pyramid instead of accumulating by specialty.",
    aboutTech: "How it grows",
    aboutTechBody:
      "Built with Next.js. The index and notes live in a data layer for Git versioning. The hidden Lab back door adds pages, notes, and resources; unfiled items land in the Garden / Inbox.",
    aboutPrinciples: "Principles",
    principle1: "Chinese copy annotates terminology in parentheses; English copy is fully English.",
    principle2: "DSM-5 diagnostic criteria are not reproduced.",
    principle3: "Pharmacology, stimulation, and contemplative notes are thinking indexes, not prescriptions or practice manuals.",
    notFoundTitle: "Note not found",
    notFoundBody: "This path may not exist yet, or the slug does not match. Add it from Lab.",
    notFoundHome: "Back to the pyramid",
    language: "Language",
    langZh: "繁中",
    langEn: "English",
    resources: "Resources",
    domains: "Domains",
    notes: "Notes",
    inbox: "Inbox",
    addViaLab: "Add in Lab",
    customPage: "Custom page",
    unfiled: "Unfiled",
    children: "Child domains",
    inThisDomain: "Notes in this domain",
    levelLabel: "Level",
  },
} as const;

export type UiKey = keyof typeof ui.zh;
