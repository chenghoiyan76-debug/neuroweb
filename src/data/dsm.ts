import { term } from "@/lib/site";
import type { DsmCategory, Note } from "@/lib/types";

export const dsmCategories: DsmCategory[] = [
  {
    slug: "mood-disorders",
    en: "Mood Disorders",
    zh: "情緒疾患（臨床大類）",
    summary:
      "DSM-5 將傳統 Mood Disorders 拆為 Bipolar and Related Disorders 與 Depressive Disorders。本站保留 Mood Disorders 作為臨床入口，再進入具體 Illness Studies。",
  },
  {
    slug: "schizophrenia-spectrum",
    en: "Schizophrenia Spectrum and Other Psychotic Disorders",
    zh: "思覺失調症譜系及其他精神病性疾患",
    summary:
      "以 Reality testing、positive / negative symptoms 與認知缺損為核心的譜系。須與 Affective psychosis、Substance-induced psychosis 鑑別。",
  },
  {
    slug: "bipolar",
    en: "Bipolar and Related Disorders",
    zh: "雙相及相關疾患",
    summary:
      "以 Mania / Hypomania 的發作極性定義，而非只看憂鬱。Lithium、部分 Antipsychotics 與睡眠節律是臨床主軸。",
  },
  {
    slug: "depressive",
    en: "Depressive Disorders",
    zh: "憂鬱疾患",
    summary:
      "Major Depressive Disorder 與 Persistent Depressive Disorder 等。Anhedonia、Rumination 與 HPA Axis 常是跨軸連結點。",
  },
  {
    slug: "anxiety",
    en: "Anxiety Disorders",
    zh: "焦慮疾患",
    summary:
      "Threat appraisal、Avoidance 與 Safety behaviors 為共同維持環。含 Panic Disorder、GAD、Social Anxiety Disorder。",
  },
  {
    slug: "ocd",
    en: "Obsessive-Compulsive and Related Disorders",
    zh: "強迫及相關疾患",
    summary:
      "Obsessions 與 Compulsions 的功能分析優於只數症狀清單。CSTC circuit（Cortico-striato-thalamo-cortical）是常用神經科學語言。",
  },
  {
    slug: "trauma",
    en: "Trauma- and Stressor-Related Disorders",
    zh: "創傷及壓力相關疾患",
    summary:
      "PTSD、Acute Stress Disorder 與 Adjustment Disorders。侵入、迴避、高警覺與 Memory reconsolidation 是治療神經科學接口。",
  },
  {
    slug: "neurodevelopmental",
    en: "Neurodevelopmental Disorders",
    zh: "神經發展疾患",
    summary:
      "ADHD、Autism Spectrum Disorder 等。執行功能、獎賞延宕與感覺處理是常見跨專業語言。",
  },
  {
    slug: "substance",
    en: "Substance-Related and Addictive Disorders",
    zh: "物質及成癮相關疾患",
    summary:
      "Incentive sensitization、Reward System 與 Withdrawal 驅動的負增強。與 Pain killers、Dopamine pathways 高度交織。",
  },
  {
    slug: "neurocognitive",
    en: "Neurocognitive Disorders",
    zh: "神經認知疾患",
    summary:
      "Delirium 與 Major / Mild NCD。Alzheimer disease、Vascular、Lewy body 的藥物與鑑別連到 Neurodegeneration 藥理。",
  },
  {
    slug: "personality",
    en: "Personality Disorders",
    zh: "人格疾患",
    summary:
      "持久的人際、情感與自我功能模式。Borderline Personality Disorder 的情緒失調常接到 DBT 與 Limbic-PFC circuitry。",
  },
  {
    slug: "sleep-wake",
    en: "Sleep-Wake Disorders",
    zh: "睡眠—覺醒疾患",
    summary:
      "Insomnia Disorder 等。Sleep Architecture 是核心神經科學基礎；許多精神藥物與情緒發作都先打亂睡眠。",
  },
];

export const dsmNotes: Note[] = [
  {
    slug: "major-depressive-disorder",
    axis: "dsm",
    section: "depressive",
    en: "Major Depressive Disorder",
    zh: "重度憂鬱症",
    summary:
      "以情緒、Anhedonia、軀體與認知群聚呈現。臨床筆記重點在病程、自殺風險、鑑別 Bipolar 與共病 Anxiety。",
    related: {
      dsm: ["bipolar-i", "generalized-anxiety-disorder"],
      symptoms: ["anhedonia", "rumination", "psychomotor-change", "executive-dysfunction"],
      pharmacology: ["snri-pain-interface", "ketamine-nmda"],
      interventions: ["cbt-neuroplasticity", "tms-ect"],
      fundamentals: ["serotonin-system", "hpa-axis", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: "Nosology",
        text: "本頁為 Illness Studies 與臨床筆記，**不重製 DSM-5 診斷準則原文**。正式診斷請以 APA 官方 DSM-5 / DSM-5-TR 文本與完整評估為準。",
      },
      {
        type: "h2",
        id: "clinical",
        text: "臨床筆記",
      },
      {
        type: "p",
        text: `${term("Major Depressive Disorder", "重度憂鬱症")} 不是「心情不好」。評估要分開 ${term("Sadness", "悲傷")}、${term("Anhedonia", "缺乏快感")}、${term("Rumination", "反芻")}、睡眠與自殺風險。每一次發作都要問是否曾有 ${term("Mania", "躁狂")} 或 ${term("Hypomania", "輕躁")}，以免把 Bipolar depression 當成單極性憂鬱來長期使用 Antidepressant monotherapy。`,
      },
      {
        type: "ul",
        items: [
          `${term("Specifier", "標註")} 思維：with anxious distress、melancholic、psychotic、atypical、peripartum、seasonal。`,
          "功能損害寫進病歷：工作、照顧、自我照顧，而不只寫嚴重程度形容詞。",
          `${term("Medical mimics", "醫學模仿")}：甲狀腺、貧血、睡眠呼吸中止、物質、藥物（例如 steroid）。`,
        ],
      },
      {
        type: "h2",
        id: "links",
        text: "跨軸：從疾患到機制",
      },
      {
        type: "p",
        text: `症狀入口見 ${term("Anhedonia", "缺乏快感")} 與 ${term("Rumination", "反芻")}。生物學接口見 ${term("HPA Axis", "下視丘—腦垂體—腎上腺軸")} 與 ${term("Sleep Architecture", "睡眠結構")}。治療神經科學見 ${term("Neuroplasticity in CBT", "CBT 的神經可塑性")} 與 ${term("TMS", "經顱磁刺激")} / ${term("ECT", "電痙攣治療")}。`,
      },
    ],
  },
  {
    slug: "bipolar-i",
    axis: "dsm",
    section: "bipolar",
    en: "Bipolar I Disorder",
    zh: "雙相情緒障礙症第一型",
    summary:
      "Mania 定義疾病；憂鬱期常是失能主因。睡眠減少是最實用的早期預警之一。",
    related: {
      dsm: ["major-depressive-disorder", "schizophrenia"],
      symptoms: ["psychomotor-change", "executive-dysfunction", "sleep-fragmentation"],
      pharmacology: ["d2-modulation", "cholinesterase-and-cognition"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["dopamine-pathways", "sleep-architecture", "limbic-pfc"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: "Nosology",
        text: "不重製 DSM-5 準則原文。Mania 的核心臨床判斷是情緒高漲或易怒加上能量／活動增加，並造成明顯損害或需要住院／伴隨精神病性特徵。",
      },
      {
        type: "p",
        text: `${term("Bipolar I Disorder", "雙相 I 型")} 的錯誤常見於：把 ${term("Agitated depression", "激越性憂鬱")} 當成躁狂、把 ADHD 的慢性浮躁當成 Hypomania、或忽略 Antidepressant-induced switching。`,
      },
      {
        type: "ul",
        items: [
          `監測 ${term("Sleep-wake cycle", "睡眠—覺醒週期")}：睡眠需求下降往往早於完整 Mania。`,
          `${term("Lithium", "鋰鹽")} 仍是防復發與自殺風險討論的核心藥物之一（見 Neuropharmacology 與監測原則）。`,
          "Substance use 會同時模仿與惡化極性轉換。",
        ],
      },
    ],
  },
  {
    slug: "schizophrenia",
    axis: "dsm",
    section: "schizophrenia-spectrum",
    en: "Schizophrenia",
    zh: "思覺失調症",
    summary:
      "Positive symptoms、Negative symptoms 與 Cognitive impairment 三條軸要分開追蹤，不能只追幻覺有沒有消失。",
    related: {
      dsm: ["bipolar-i"],
      symptoms: ["hallucinations", "delusions", "executive-dysfunction", "avolition"],
      pharmacology: ["d2-modulation", "clozapine"],
      interventions: ["tms-ect", "cbt-neuroplasticity"],
      fundamentals: ["dopamine-pathways", "gaba-glutamate", "limbic-pfc"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: "Nosology",
        text: "不重製 DSM-5 準則。評估必須包含病程、功能、物質、神經系統與 Affective psychosis 鑑別。",
      },
      {
        type: "h2",
        id: "axes",
        text: "三條臨床軸",
      },
      {
        type: "table",
        headers: ["軸", "例子", "跨軸連結"],
        rows: [
          [term("Positive symptoms", "正性症狀"), `${term("Hallucinations", "幻覺")}、${term("Delusions", "妄想")}`, "D2 modulation、CBT for psychosis"],
          [term("Negative symptoms", "負性症狀"), `${term("Avolition", "動機缺乏")}、${term("Anhedonia", "缺乏快感")}`, "勿全歸因於藥物鎮靜或憂鬱"],
          [term("Cognitive impairment", "認知缺損"), term("Executive Dysfunction", "執行功能障礙"), "Limbic-PFC、復健而非只加藥"],
        ],
      },
      {
        type: "p",
        text: `${term("Treatment-resistant schizophrenia", "治療阻抗思覺失調症")} 要先確認診斷、順從性、Substance 與足夠試驗，再討論 ${term("Clozapine", "氯氮平")}。`,
      },
    ],
  },
  {
    slug: "generalized-anxiety-disorder",
    axis: "dsm",
    section: "anxiety",
    en: "Generalized Anxiety Disorder",
    zh: "廣泛性焦慮症",
    summary:
      "Worry 被當成責任與預防災難的策略。Intolerance of uncertainty 比「緊張」更能指導介入。",
    related: {
      dsm: ["major-depressive-disorder", "ocd-disorder", "ptsd"],
      symptoms: ["anxious-apprehension", "rumination", "hyperarousal"],
      pharmacology: ["snri-pain-interface"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["hpa-axis", "limbic-pfc", "gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Generalized Anxiety Disorder", "廣泛性焦慮症")} 的維持環是：威脅高估 → 擔心 → 短暫的控制感 → 得不到「不擔心也能過關」的學習。Benzodiazepines 可能成為 Safety behavior。`,
      },
      {
        type: "ul",
        items: [
          `與 ${term("OCD", "強迫症")} 鑑別：GAD 的 worry 多是生活主題，OCD 常有侵入性與儀式。`,
          `與 Depression 共病極高；Rumination 與 Worry 的時間定向不同（過去 vs 未來）。`,
        ],
      },
    ],
  },
  {
    slug: "ocd-disorder",
    axis: "dsm",
    section: "ocd",
    en: "Obsessive-Compulsive Disorder",
    zh: "強迫症",
    summary:
      "Obsession 增加痛苦，Compulsion 短暫減痛並強化循環。ERP 是心理治療核心，CSTC circuit 是常用神經模型。",
    related: {
      dsm: ["generalized-anxiety-disorder"],
      symptoms: ["cognitive-rigidity", "anxious-apprehension"],
      pharmacology: ["d2-modulation"],
      interventions: ["cbt-neuroplasticity", "tms-ect"],
      fundamentals: ["dopamine-pathways", "gaba-glutamate", "limbic-pfc"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Obsessive-Compulsive Disorder", "強迫症")} 不是「愛乾淨」或完美主義人格。要畫出 Obsession → Distress → Compulsion → Relief 的功能環，並找出 Avoidance 與 Reassurance seeking。`,
      },
      {
        type: "callout",
        variant: "clinical",
        title: "SSRI 與劑量脈絡",
        text: "OCD 的藥理討論常涉及相對較高的 SSRI 劑量與足夠時程，但仍須個別化，並以 ERP 為技能主軸。本站不提供處方公式。",
      },
    ],
  },
  {
    slug: "ptsd",
    axis: "dsm",
    section: "trauma",
    en: "Posttraumatic Stress Disorder",
    zh: "創傷後壓力症",
    summary:
      "再體驗、迴避、認知情緒改變與高警覺。穩定化與記憶再處理的順序是倫理問題，不只是技術偏好。",
    related: {
      dsm: ["major-depressive-disorder", "insomnia-disorder"],
      symptoms: ["hyperarousal", "dissociation", "sleep-fragmentation", "anhedonia"],
      pharmacology: ["snri-pain-interface", "opioids-reward"],
      interventions: ["emdr-reconsolidation", "cbt-neuroplasticity"],
      fundamentals: ["hpa-axis", "limbic-pfc", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("PTSD", "創傷後壓力症")} 的記憶不是「記得太清楚」這麼簡單：可能同時有侵入性過度提取與自傳記憶過度類化。${term("Memory Reconsolidation", "記憶再鞏固")} 是 EMDR 與暴露取向的共同生物學語言。`,
      },
      {
        type: "ul",
        items: [
          "當下安全、Substance、解離嚴重度決定能否進入再處理。",
          `${term("Hyperarousal", "高警覺")} 會被咖啡因、睡眠剝奪與疼痛放大。`,
        ],
      },
    ],
  },
  {
    slug: "adhd",
    axis: "dsm",
    section: "neurodevelopmental",
    en: "Attention-Deficit/Hyperactivity Disorder",
    zh: "注意力不足過動症",
    summary:
      "發展性的執行控制與獎賞延宕差異。成人期常以拖延、情緒衝動與自我批評呈現，而非教室過動。",
    related: {
      dsm: ["bipolar-i", "substance-use-disorder"],
      symptoms: ["executive-dysfunction", "cognitive-rigidity"],
      pharmacology: ["dopamine-pathways-drugs"],
      interventions: ["neurofeedback", "cbt-neuroplasticity"],
      fundamentals: ["dopamine-pathways", "reward-system", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("ADHD", "注意力不足過動症")} 要與 Anxiety 的威脅監控、Depression 的處理速度下降、睡眠不足與 Hypomania 鑑別。功能分析應包含環境適配，而非只要求「更努力」。`,
      },
    ],
  },
  {
    slug: "substance-use-disorder",
    axis: "dsm",
    section: "substance",
    en: "Substance Use Disorder",
    zh: "物質使用疾患",
    summary:
      "從正向增強走向負增強（解 Withdrawal、解空無）。Reward System 與前額葉控制的失衡是核心地圖。",
    related: {
      dsm: ["adhd", "major-depressive-disorder", "ptsd"],
      symptoms: ["craving", "anhedonia", "executive-dysfunction"],
      pharmacology: ["opioids-reward", "dopamine-pathways-drugs"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["reward-system", "dopamine-pathways", "hpa-axis"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Substance Use Disorder", "物質使用疾患")} 不是品德失敗。${term("Incentive sensitization", "誘因敏感化")} 使 Cue 觸發 ${term("Craving", "渴求")}，即使「喜歡」已經消失（Anhedonia）。Pain killers 與 Alcohol 在精神醫療現場極為常見。`,
      },
    ],
  },
  {
    slug: "major-ncd-alzheimer",
    axis: "dsm",
    section: "neurocognitive",
    en: "Major NCD due to Alzheimer Disease",
    zh: "阿茲海默病所致之重度神經認知疾患",
    summary:
      "情節記憶與定向先受損的典型剖面。藥理屬 Neurodegeneration 子類，且必須先排除可逆因子。",
    related: {
      dsm: ["insomnia-disorder"],
      symptoms: ["executive-dysfunction", "sleep-fragmentation"],
      pharmacology: ["cholinesterase-and-cognition", "memantine-nmda", "anti-amyloid"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["gaba-glutamate", "sleep-architecture", "limbic-pfc"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `評估 ${term("Major Neurocognitive Disorder", "重度神經認知疾患")} 前，先處理 Delirium、藥物抗膽鹼負擔、憂鬱、睡眠與代謝。阿茲海默病的教學剖面是情節記憶、定向與後續執行功能下降。`,
      },
    ],
  },
  {
    slug: "borderline-personality-disorder",
    axis: "dsm",
    section: "personality",
    en: "Borderline Personality Disorder",
    zh: "邊緣型人格疾患",
    summary:
      "情緒失調、被拋棄敏感與衝動。DBT 技能與 Limbic-PFC 的「高喚起下失控」是跨軸語言。",
    related: {
      dsm: ["ptsd", "major-depressive-disorder", "substance-use-disorder"],
      symptoms: ["hyperarousal", "dissociation", "anhedonia"],
      pharmacology: ["d2-modulation", "snri-pain-interface"],
      interventions: ["cbt-neuroplasticity", "emdr-reconsolidation"],
      fundamentals: ["limbic-pfc", "hpa-axis"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Borderline Personality Disorder", "邊緣型人格疾患")} 的藥理通常是針對共病與危機症狀，而非「治好人格」。優先處理生命風險、治療干擾行為，再進入創傷記憶。`,
      },
    ],
  },
  {
    slug: "insomnia-disorder",
    axis: "dsm",
    section: "sleep-wake",
    en: "Insomnia Disorder",
    zh: "失眠疾患",
    summary:
      "條件化覺醒與錯誤的睡眠努力。CBT-I 優先；藥物是時間有限的工具。",
    related: {
      dsm: ["major-depressive-disorder", "generalized-anxiety-disorder", "ptsd"],
      symptoms: ["sleep-fragmentation", "hyperarousal", "executive-dysfunction"],
      pharmacology: ["gabapentinoids", "opioids-reward"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["sleep-architecture", "hpa-axis", "gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Insomnia Disorder", "失眠疾患")} 會放大疼痛、Craving、Rumination 與自殺風險。先畫 ${term("Sleep Architecture", "睡眠結構")}：入睡、維持、早醒、晝夜節律是否後移。`,
      },
    ],
  },
  {
    slug: "mood-disorders-entry",
    axis: "dsm",
    section: "mood-disorders",
    en: "Mood Disorders — clinical entry",
    zh: "情緒疾患臨床入口",
    summary:
      "Mood Disorders 在 DSM-5 已拆章。此入口協助從「情緒病」快速分到 Bipolar vs Depressive，並連到症狀與藥理。",
    related: {
      dsm: ["major-depressive-disorder", "bipolar-i"],
      symptoms: ["anhedonia", "psychomotor-change", "rumination"],
      pharmacology: ["snri-pain-interface", "d2-modulation"],
      interventions: ["cbt-neuroplasticity", "tms-ect"],
      fundamentals: ["hpa-axis", "monoamine-overview", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `臨床人員常說 ${term("Mood Disorders", "情緒疾患")}。DSM-5 把它拆成 ${term("Bipolar and Related Disorders", "雙相及相關疾患")} 與 ${term("Depressive Disorders", "憂鬱疾患")}。進入 Illness Studies 前先問：是否有獨立的 Mania/Hypomania 史？目前極性？精神病性特徵？混合特徵？`,
      },
      {
        type: "ol",
        items: [
          "有明確 Mania → 進入 Bipolar I 路徑。",
          "只有 Hypomania → 仍走雙相相關，而非單極憂鬱長期策略。",
          "從無極性上揚 → Depressive Disorders，但每次復發都要再問。",
        ],
      },
    ],
  },
];
