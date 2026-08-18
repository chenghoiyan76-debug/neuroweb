import { term } from "@/lib/i18n";
import type { ContentBlock, LevelId, Note, Resource } from "@/lib/types";

const DATE = "2026-08-18";

export function note(opts: {
  slug: string;
  level: LevelId;
  domain: string;
  zh: string;
  en: string;
  summary: string;
  summaryEn?: string;
  tags?: string[];
  related?: string[];
  resources?: Resource[];
  blocks: ContentBlock[];
  custom?: boolean;
}): Note {
  return {
    slug: opts.slug,
    level: opts.level,
    domain: opts.domain,
    zh: opts.zh,
    en: opts.en,
    summary: opts.summary,
    summaryEn: opts.summaryEn,
    tags: opts.tags ?? [],
    related: opts.related ?? [],
    resources: opts.resources ?? [],
    blocks: opts.blocks,
    updatedAt: DATE,
    custom: opts.custom,
  };
}

export const indexNotes: Note[] = [
  note({
    slug: "map-of-our-mind",
    level: 1,
    domain: "classical-psychodynamics",
    zh: "心智地圖總索引",
    en: "Map of Our Mind — master index",
    summary: "五層金字塔的入口卡：結構 → 測量 → 互動 → 健康／疾病 → 形而上學。",
    summaryEn: "Entry card for the five-level pyramid: structure → measure → interaction → sick/healthy → metaphysics.",
    tags: ["index", "pyramid", "second-brain"],
    related: [
      "classical-psychodynamics",
      "computational-consciousness",
      "cognition",
      "psychiatry-dsm5",
      "eastern-philosophy",
    ],
    blocks: [
      {
        type: "quote",
        text: "知識依照思考邏輯自然生長，而不是依照科別堆積。",
        cite: "Mind-Note",
      },
      {
        type: "p",
        text: `這座${term("Map of Our Mind", "心智地圖")}是 Mind-Note 的索引：心理學、神經科學與哲學的研讀。Level 1 問心智是什麼；Level 2 把它變成數據；Level 3 看迴路如何即時互動；Level 4 處理失衡與修復；Level 5 承認科學盡頭是哲學。`,
      },
      {
        type: "ul",
        items: [
          "每個領域都是可生長的索引，不是封閉百科。",
          "臨床筆記不重製 DSM-5 準則原文。",
          "內容更新走密碼保護的管理後台（/admin）。",
        ],
      },
    ],
  }),
  note({
    slug: "classical-psychodynamics",
    level: 1,
    domain: "classical-psychodynamics",
    zh: "古典心理動力學",
    en: "Classical Psychodynamics",
    summary: `${term("Freud", "佛洛伊德")}的潛意識地形學與${term("Jung", "榮格")}的原型，是理解驅力與性格的第一張底圖。`,
    tags: ["Freud", "Jung", "unconscious"],
    related: ["attachment-early-development", "psychodynamic-insight", "jungian-depth"],
    blocks: [
      {
        type: "p",
        text: `${term("Classical psychodynamics", "古典心理動力學")}把心智看成有層次的結構：意識只是冰山一角。${term("Sigmund Freud", "佛洛伊德")}以 ${term("Id / Ego / Superego", "本我／自我／超我")} 與防衛機制解釋衝突；${term("Carl Jung", "卡爾·榮格")}把個人潛意識接到 ${term("Collective Unconscious", "集體潛意識")} 與原型。`,
      },
      {
        type: "ul",
        items: [
          "驅力與早期經驗如何變成性格的重複劇本。",
          `這層是「人之所以為人」的敘事底層；測量與迴路在 Level 2–3 才量化。`,
          `通往 Level 5 的橋是榮格，而不是急著把潛意識還原成受體。`,
        ],
      },
    ],
  }),
  note({
    slug: "developmental-personality",
    level: 1,
    domain: "developmental-personality",
    zh: "發展與人格動力",
    en: "Developmental & Personality Dynamics",
    summary: "行為差異來自早期適應路徑：依附、基模、特質與創傷的代間刻痕。",
    tags: ["development", "personality", "pathology"],
    related: [
      "attachment-early-development",
      "schema-core-beliefs",
      "personality-trait-models",
      "trauma-epigenetics",
    ],
    blocks: [
      {
        type: "p",
        text: `Personality 與 Pathology 不是兩套物種，而是同一條發展軌跡上的不同穩定性。這張索引把 ${term("Attachment Theory", "依附理論")}、${term("Early Maladaptive Schemas", "早期適應不良基模")}、特質模型與 ${term("Epigenetics", "表觀遺傳學")} 放在同一層，避免「只有大腦」或「只有童年」的假對立。`,
      },
    ],
  }),
  note({
    slug: "attachment-early-development",
    level: 1,
    domain: "attachment-early-development",
    zh: "依附與早期發展",
    en: "Attachment & Early Development",
    summary: `${term("Insecure Attachment Styles", "不安全依附型態")}如何預測成年${term("Interpersonal Patterns", "人際互動模式")}。`,
    tags: ["attachment", "Bowlby", "Ainsworth"],
    related: ["schema-core-beliefs", "borderline-personality-disorder", "ptsd", "psychodynamic-insight"],
    blocks: [
      {
        type: "p",
        text: `${term("Attachment", "依附")} 是愛的起點，也是威脅調節的第一套作業系統。安全、焦慮、逃避與混亂型態，會在成年親密關係與治療關係中重演。這不是標籤遊戲，而是預測 ${term("Interpersonal Patterns", "人際互動模式")} 的地圖。`,
      },
      {
        type: "ul",
        items: [
          `${term("Internal working models", "內在運作模式")}：他人可不可得、自己值不值得被安撫。`,
          "混亂依附常與早期創傷、解離傾向一起讀。",
          `臨床上接到 ${term("Transference", "移情")} 與邊緣型人格的人際風暴。`,
        ],
      },
    ],
  }),
  note({
    slug: "schema-core-beliefs",
    level: 1,
    domain: "schema-core-beliefs",
    zh: "基模理論與核心信念",
    en: "Schema Theory & Core Beliefs",
    summary: `${term("Early Maladaptive Schemas", "早期適應不良基模")}（EMS）與${term("Maladaptive Coping Styles", "適應不良因應型態")}。`,
    tags: ["schema", "EMS", "Young"],
    related: ["attachment-early-development", "cbt-neuroplasticity", "act-flexibility"],
    blocks: [
      {
        type: "p",
        text: `${term("Schema", "基模")} 是大腦的預設程式：童年為了活下去而寫死的規則。${term("Early Maladaptive Schemas", "早期適應不良基模")}（EMS）透過屈服、逃避或過度補償維持自己。CBT 改的是自動化想法；基模工作改的是那台作業系統。`,
      },
    ],
  }),
  note({
    slug: "personality-trait-models",
    level: 1,
    domain: "personality-trait-models",
    zh: "人格特質模型",
    en: "Personality Trait Models",
    summary: `${term("Big Five", "五大人格")}、${term("Dark Triad", "黑暗三角")}與病態人格維度。`,
    tags: ["Big Five", "Dark Triad", "traits"],
    related: ["personality-trait-measurement", "personality-disorders"],
    blocks: [
      {
        type: "p",
        text: `特質模型把性格看成可測量的維度：${term("Big Five", "五大人格")}（OCEAN）描述常態變異；${term("Dark Triad", "黑暗三角")}（自戀、馬基維利、精神病態）描述人際剝削的陰影；${term("AMPD", "人格障礙替代模型")} 把病態看成特質的極端與功能損害。光與影是同一條軸。`,
      },
    ],
  }),
  note({
    slug: "trauma-epigenetics",
    level: 1,
    domain: "trauma-epigenetics",
    zh: "創傷與表觀遺傳學",
    en: "Trauma & Epigenetics",
    summary: `${term("ACEs", "童年逆境經驗")}與創傷代間傳遞。`,
    tags: ["ACEs", "epigenetics", "trauma"],
    related: ["hpa-axis", "ptsd", "emdr-reconsolidation", "historical-sick-mind"],
    blocks: [
      {
        type: "p",
        text: `${term("Adverse Childhood Experiences", "童年逆境經驗")}（ACEs）把早期傷害寫進風險曲線；${term("Epigenetics", "表觀遺傳學")} 討論壓力如何在不改 DNA 序列的情況下改變表達。代間傳遞不是宿命論，而是提醒：身體記得的東西，有時比敘事更早到場。`,
      },
      {
        type: "callout",
        variant: "info",
        title: "讀法",
        text: "這層解釋「為什麼有人的壓力系統比較容易失準」，不是把所有疾患還原成童年。",
      },
    ],
  }),
  note({
    slug: "computational-consciousness",
    level: 1,
    domain: "computational-consciousness",
    zh: "運算意識與底層結構",
    en: "Computational Consciousness & Architecture",
    summary: `大腦作為${term("Predictive Coding Machine", "預測編碼機")}：意識、傳導物質與解剖是同一座建築的不同樓層。`,
    tags: ["predictive coding", "consciousness"],
    related: ["neurotransmitter-systems", "neuroanatomy-circuitry", "cognition", "eastern-philosophy"],
    blocks: [
      {
        type: "p",
        text: `${term("Predictive coding", "預測編碼")}把大腦看成不斷產生預測、用感覺修正誤差的機器。意識不必先被定義成靈魂，也可以被定義成「被允許進入全局工作空間的預測」。這張底圖讓神經傳導物質、解剖迴路與睡眠修復有同一個運算語言。`,
      },
    ],
  }),
  note({
    slug: "neurotransmitter-systems",
    level: 1,
    domain: "neurotransmitter-systems",
    zh: "神經傳導物質系統",
    en: "Neurotransmitter Systems",
    summary: "多巴胺路徑、獎賞、血清素與 GABA／麩胺酸平衡。",
    tags: ["dopamine", "serotonin", "GABA"],
    related: ["dopamine-pathways", "reward-system", "serotonin-system", "gaba-glutamate"],
    blocks: [
      {
        type: "p",
        text: `通訊網路不是「一種分子對應一種疾病」。${term("Dopamine", "多巴胺")} 管顯著性與欲求；${term("Serotonin", "血清素")} 廣泛調節；${term("GABA/Glutamate", "GABA／麩胺酸")} 是興奮／抑制貨幣。成癮與獎賞是這張網的臨床考題。`,
      },
    ],
  }),
  note({
    slug: "neuroanatomy-circuitry",
    level: 1,
    domain: "neuroanatomy-circuitry",
    zh: "神經解剖與迴路",
    en: "Neuroanatomy & Circuitry",
    summary: `${term("Limbic-PFC", "邊緣系統—前額葉")}與${term("DMN", "預設模式網絡")}。`,
    tags: ["limbic", "PFC", "DMN"],
    related: ["limbic-pfc", "dmn", "cognition"],
    blocks: [
      {
        type: "p",
        text: `情緒與理智不是兩個器官，而是迴路對話。${term("Amygdala", "杏仁核")} 快速標記威脅；${term("PFC", "前額葉皮質")} 評估與抑制；${term("Default Mode Network", "預設模式網絡")}（DMN）在心智遊走、自我敘事與反芻時點亮。這是 Level 3 互動層的解剖底圖。`,
      },
    ],
  }),
  note({
    slug: "neuroendocrinology",
    level: 1,
    domain: "neuroendocrinology",
    zh: "神經內分泌學",
    en: "Neuroendocrinology",
    summary: `${term("HPA Axis", "HPA 軸")}、壓力反應與皮質醇。`,
    tags: ["HPA", "cortisol", "stress"],
    related: ["hpa-axis", "ptsd", "major-depressive-disorder"],
    blocks: [
      {
        type: "p",
        text: `${term("HPA Axis", "下視丘—腦下垂體—腎上腺軸")}是壓力與身體的橋樑。急性 ${term("Cortisol", "皮質醇")} 有用；慢性則可能傷害海馬、睡眠與免疫。教學重點是「系統失調」，不是單一方向的激素過多。`,
      },
    ],
  }),
  note({
    slug: "sleep-circadian",
    level: 1,
    domain: "sleep-circadian",
    zh: "睡眠結構與日夜節律",
    en: "Sleep Architecture & Circadian Rhythms",
    summary: "REM／NREM 循環對記憶鞏固的影響。",
    tags: ["sleep", "REM", "circadian"],
    related: ["sleep-architecture", "cbt-neuroplasticity", "bipolar-i"],
    blocks: [
      {
        type: "p",
        text: `夜間修復廠同時做代謝清除與${term("Memory Consolidation", "記憶鞏固")}。${term("NREM", "非快速動眼")}（尤其慢波）偏陳述記憶；${term("REM", "快速動眼")} 偏情緒記憶。日夜節律一亂，Level 3 的執行功能與 Level 4 的情緒穩定性都會一起垮。`,
      },
    ],
  }),
  note({
    slug: "behavioralism-conditioning",
    level: 2,
    domain: "behavioralism-conditioning",
    zh: "行為主義與條件化",
    en: "Behavioralism & Conditioning",
    summary: `${term("Classical Conditioning", "古典制約")}與${term("Operant Conditioning", "操作制約")}把行為變成可測量的反應。`,
    tags: ["Pavlov", "Skinner", "conditioning"],
    related: ["neurofeedback", "cbt-neuroplasticity", "psychological-assessment"],
    blocks: [
      {
        type: "p",
        text: `測量心智的第一種方法，是不先問「裡面有什麼」，而問「刺激之後發生什麼」。古典制約測量聯結；操作制約測量增強與懲罰的權重。暴露、行為啟動、成癮線索，其實都還在這套可觀察語言裡。`,
      },
    ],
  }),
  note({
    slug: "personality-trait-measurement",
    level: 2,
    domain: "personality-trait-measurement",
    zh: "人格特質測量",
    en: "Personality Trait Measurement",
    summary: "把五大人格與黑暗三角變成可比較的分數剖面。",
    tags: ["psychometrics", "Big Five", "Dark Triad"],
    related: ["personality-trait-models", "psychological-assessment"],
    blocks: [
      {
        type: "p",
        text: `特質測量把 Level 1 的性格模型變成常模、信度與剖面。重點不是測驗名稱，而是：這個分數改變的是機率，不是命運；病態維度要接到功能損害，而不是只接到標籤。`,
      },
    ],
  }),
  note({
    slug: "psychological-assessment",
    level: 2,
    domain: "psychological-assessment",
    zh: "心理衡鑑與認知數據",
    en: "Psychological Assessment",
    summary: `${term("WAIS-IV", "魏氏智力測驗")}認知剖面與${term("Psychometrics", "測量學")}基礎。`,
    tags: ["WAIS-IV", "psychometrics", "cognitive profile"],
    related: ["cognition", "adhd", "major-ncd-alzheimer"],
    blocks: [
      {
        type: "p",
        text: `${term("WAIS-IV", "魏氏成人智力量表")} 的價值在 ${term("Cognitive Profile", "認知剖面")}：指數之間的落差、工作記憶與處理速度，往往比單一 IQ 更能對接到 ADHD、學習與神經認知疾患。${term("Psychometrics", "測量學")} 是把心理狀態投射為數據的語言，不是把人變成數字。`,
      },
    ],
  }),
  note({
    slug: "cognition",
    level: 3,
    domain: "cognition",
    zh: "認知科學",
    en: "Cognition",
    summary: `${term("Executive Functions", "執行功能")}、${term("Working Memory", "工作記憶")}與${term("Attention Control", "注意力控制")}的即時互動。`,
    tags: ["executive function", "working memory", "attention"],
    related: ["limbic-pfc", "adhd", "emdr-reconsolidation", "psychological-assessment"],
    blocks: [
      {
        type: "p",
        text: `這是神經科學專業的火力展示區之一：高階認知不是模組清單，而是互搶資源的即時系統。工作記憶負載可以干擾創傷意象（EMDR 假說之一）；執行功能一垮，Level 4 的衝動、成癮與情緒風暴都會被放大。`,
      },
    ],
  }),
  note({
    slug: "embodied-cognition",
    level: 3,
    domain: "embodied-cognition",
    zh: "具身認知",
    en: "Embodied Cognition",
    summary: `${term("Interoception", "內感受")}、腸腦軸、神經免疫學與 heart node。`,
    tags: ["interoception", "gut-brain", "neuroimmunology", "heart"],
    related: ["hpa-axis", "neuroendocrinology", "spirituality-mindfulness"],
    blocks: [
      {
        type: "p",
        text: `心智不只住在顱骨裡。${term("Interoception", "內感受")} 讀身體訊號；${term("Gut–Brain Axis", "腸腦軸")} 讓免疫與微生物群參與情緒；${term("Neuroimmunology", "神經免疫學")} 把發炎變成認知迷霧的候選機制。Heart node 在這份筆記裡指心—腦軸：心跳變異、迷走張力與「被感覺到的安全」。`,
      },
      {
        type: "callout",
        variant: "info",
        title: "定位",
        text: "具身不是反智，而是把預測編碼的「感覺證據」從視聽擴充到內臟與免疫。",
      },
    ],
  }),
  note({
    slug: "neuroscience-brain-networks",
    level: 3,
    domain: "neuroscience-brain-networks",
    zh: "神經科學與大腦網絡",
    en: "Neuroscience & Brain Networks",
    summary: "DMN 與邊緣—前額葉迴路的動態，以及壓力內分泌的交集。",
    tags: ["DMN", "networks", "stress"],
    related: ["dmn", "limbic-pfc", "hpa-axis"],
    blocks: [
      {
        type: "p",
        text: `網絡語言讓解剖活起來：${term("DMN", "預設模式網絡")} 負責自我與反芻；顯著性網絡偵測該不該切換；執行網絡抓住目標。壓力經 ${term("HPA Axis", "HPA 軸")} 改變這些切換的閾值——這是 Level 1 結構與 Level 4 疾患之間的即時橋梁。`,
      },
    ],
  }),
  note({
    slug: "dmn",
    level: 3,
    domain: "neuroscience-brain-networks",
    zh: "預設模式網絡",
    en: "Default Mode Network",
    summary: "心智遊走、自我敘事與反芻的網絡。",
    tags: ["DMN", "rumination", "self"],
    related: ["limbic-pfc", "major-depressive-disorder", "spirituality-mindfulness"],
    blocks: [
      {
        type: "p",
        text: `${term("Default Mode Network", "預設模式網絡")}（DMN）在無外在任務時活躍，與自我參照、未來模擬與反芻有關。冥想與某些抗憂鬱介入被討論為「降低僵硬的 DMN 耦合」。它不是疾病，而是敘事自我的硬體。`,
      },
    ],
  }),
  note({
    slug: "psychiatry-dsm5",
    level: 4,
    domain: "psychiatry-dsm5",
    zh: "精神醫學與分類",
    en: "Psychiatry & DSM-5 Disorders",
    summary: "臨床檢索索引：表徵與機制，不重製準則原文。",
    tags: ["DSM-5", "nosology"],
    related: ["neurodevelopmental", "depressive-disorders", "historical-sick-mind"],
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: term("Nosology", "疾病分類學"),
        text: "本層是檢索地圖，**不重製 DSM-5 診斷準則原文**。正式診斷以 APA 官方文本與完整評估為準。",
      },
      {
        type: "p",
        text: `分類讓對話成為可能，也讓歷史偏見被凍結成類別。使用 DSM-5 時，同時打開「病態心智的歷史脈絡」，避免把當代類別當成自然種類。`,
      },
      {
        type: "p",
        text: "十九個類群各自展開疾患；每個疾患固定五個子頁：認知模式、行為、衡鑑、藥物簡介與心理介入、案例分享（合成教學敘事）。",
      },
    ],
  }),
  note({
    slug: "mood-disorders",
    level: 4,
    domain: "depressive-disorders",
    zh: "情感疾患",
    en: "Mood Disorders",
    summary: "重鬱與雙相的光譜與發作週期檢索。",
    tags: ["MDD", "bipolar"],
    related: ["major-depressive-disorder", "bipolar-i", "sleep-architecture", "lithium"],
    blocks: [
      {
        type: "p",
        text: `${term("Mood Disorders", "情感疾患")} 的檢索鍵是極性、週期、睡眠與自殺風險。MDD 與 Bipolar I/II 必須被放在同一張光譜上讀，否則抗憂鬱策略會走錯樓層。`,
      },
    ],
  }),
  note({
    slug: "anxiety-stressor",
    level: 4,
    domain: "anxiety-disorders",
    zh: "焦慮與壓力相關疾患",
    en: "Anxiety & Stressor-Related Disorders",
    summary: "恐慌、GAD 與 PTSD 的分類索引。",
    tags: ["panic", "GAD", "PTSD"],
    related: ["generalized-anxiety-disorder", "ptsd", "hpa-axis"],
    blocks: [
      {
        type: "p",
        text: `焦慮疾患偏預期威脅；創傷及壓力相關疾患偏已發生的不可整合事件。恐慌是身體警報誤報；GAD 是擔心被當成責任；PTSD 是記憶與安全感系統被改寫。`,
      },
    ],
  }),
  note({
    slug: "schizophrenia-spectrum",
    level: 4,
    domain: "schizophrenia-spectrum",
    zh: "思覺失調光譜",
    en: "Schizophrenia Spectrum",
    summary: "正性、負性與認知三軸檢索。",
    tags: ["psychosis", "cognition"],
    related: ["schizophrenia", "d2-modulation", "clozapine"],
    blocks: [
      {
        type: "p",
        text: `正性症狀最顯眼，負性症狀與認知退化決定長期功能。藥理多走 D2；復健走執行功能與社會認知。不要用幻覺消失當作唯一終點。`,
      },
    ],
  }),
  note({
    slug: "neurodevelopmental",
    level: 4,
    domain: "neurodevelopmental",
    zh: "神經發展障礙症",
    en: "Neurodevelopmental Disorders",
    summary: "ADHD 與 ASD 的成人期表現。",
    tags: ["ADHD", "ASD", "adult"],
    related: ["adhd", "cognition", "psychological-assessment"],
    blocks: [
      {
        type: "p",
        text: `成人期 ${term("ADHD", "注意力不足過動症")} 常以執行崩解與情緒波動呈現；${term("ASD", "自閉症光譜")} 常以感官、社交預測誤差與耗竭呈現。兩者都是發展軌跡，不是兒童專屬標籤。`,
      },
    ],
  }),
  note({
    slug: "personality-disorders",
    level: 4,
    domain: "personality-disorders",
    zh: "人格障礙症",
    en: "Personality Disorders",
    summary: "A/B/C 群與替代模型。",
    tags: ["Cluster B", "AMPD"],
    related: ["borderline-personality-disorder", "personality-trait-models", "psychodynamic-insight"],
    blocks: [
      {
        type: "p",
        text: `類別模型（Cluster A, B, C）便於溝通；${term("Alternative Model", "替代模型")} 把嚴重度（自我／人際功能）與特質維度拆開。邊緣型人格是這張圖與依附、創傷最常相交的點。`,
      },
    ],
  }),
  note({
    slug: "historical-sick-mind",
    level: 4,
    domain: "historical-sick-mind",
    zh: "病態心智的歷史脈絡",
    en: "Historical Context of the Sick Mind",
    summary: "收容所、精神分析到生物精神醫學：分類如何被時代塑造。",
    tags: ["history", "asylum", "nosology"],
    related: ["psychiatry-dsm5", "classical-psychodynamics", "jungian-depth"],
    blocks: [
      {
        type: "p",
        text: `「病態心智」從來不是純自然事實。從監禁、道德治療、精神分析、精神藥理革命到神經科學，每一個時代都重新劃健康與疾病的界線。讀 DSM 之前，先讀這條歷史，才不會把當下的地圖當成地形本身。`,
      },
    ],
  }),
  note({
    slug: "neuropharmacology",
    level: 4,
    domain: "neuropharmacology",
    zh: "神經藥理學",
    en: "Neuropharmacology",
    summary: "受體層級的化學介入地圖。教育用途。",
    tags: ["receptors", "psychopharmacology"],
    related: ["psychosis-mood-stabilizers", "antidepressants-anxiolytics", "pain-management"],
    blocks: [
      {
        type: "p",
        text: `化學介入改的是受體、網絡與可塑性窗口，不是「人格」。教學單位是結合特性與權衡，而不是商品名清單。`,
      },
    ],
  }),
  note({
    slug: "psychosis-mood-stabilizers",
    level: 4,
    domain: "psychosis-mood-stabilizers",
    zh: "精神病用藥與情緒穩定劑",
    en: "Psychosis & Mood Stabilizers",
    summary: "典型／非典型抗精神病與鋰鹽的神經保護。",
    tags: ["antipsychotic", "lithium"],
    related: ["d2-modulation", "clozapine", "lithium", "bipolar-i"],
    blocks: [
      {
        type: "p",
        text: `${term("Typical/Atypical Antipsychotics", "典型／非典型抗精神病藥物")} 的共同核心多在 D2；差異在其他受體負擔。${term("Lithium", "鋰鹽")} 不只是「情緒穩定」，教學上要接到神經保護、自殺風險與監測。`,
      },
    ],
  }),
  note({
    slug: "lithium",
    level: 4,
    domain: "psychosis-mood-stabilizers",
    zh: "鋰鹽的神經保護",
    en: "Lithium — neuroprotective effects",
    summary: `${term("Lithium", "鋰鹽")}在雙相防復發、自殺風險與神經保護討論中的位置。`,
    tags: ["lithium", "neuroprotection", "bipolar"],
    related: ["bipolar-i", "gaba-glutamate"],
    blocks: [
      {
        type: "p",
        text: `${term("Lithium", "鋰鹽")} 被討論的機制包括 GSK-3、細胞存活與抗自殺效應。臨床現實是治療窗窄、腎甲狀腺監測不可省。本頁是索引，不是處方。`,
      },
    ],
  }),
  note({
    slug: "antidepressants-anxiolytics",
    level: 4,
    domain: "antidepressants-anxiolytics",
    zh: "抗鬱劑與抗焦慮藥",
    en: "Antidepressants & Anxiolytics",
    summary: "SSRI、SNRI 與苯二氮平類的模組化機制。",
    tags: ["SSRI", "SNRI", "benzodiazepine"],
    related: ["serotonin-system", "gaba-glutamate", "snri-pain-interface"],
    blocks: [
      {
        type: "p",
        text: `${term("SSRI", "選擇性血清素回收抑制劑")} 與 ${term("SNRI", "血清素與正腎上腺素回收抑制劑")} 改的是調控與可塑性時程，不是即時快樂。${term("Benzodiazepines", "苯二氮平類")} 經 GABA-A ${term("Allosteric Modulation", "異位調節")} 快速降焦慮，也干擾暴露學習。`,
      },
    ],
  }),
  note({
    slug: "pain-management",
    level: 4,
    domain: "pain-management",
    zh: "疼痛管理用藥",
    en: "Pain Management",
    summary: "鴉片類 Mu 受體與下行抑制路徑。",
    tags: ["opioid", "mu receptor", "pain"],
    related: ["opioids-reward", "reward-system", "snri-pain-interface"],
    blocks: [
      {
        type: "p",
        text: `${term("Opioids", "鴉片類藥物")} 的 ${term("Mu-receptor", "μ 受體")} 機制同時進入止痛與獎賞。${term("Descending Inhibitory Pathways", "下行抑制路徑")} 解釋為何情緒、期待與 SNRI 也會改變痛覺。精神醫療看見的是疼痛—成癮—創傷的交界。`,
      },
    ],
  }),
  note({
    slug: "neurodegeneration-pharm",
    level: 4,
    domain: "neurodegeneration-pharm",
    zh: "神經退化疾病用藥",
    en: "Neurodegeneration pharmacology",
    summary: "AChE 抑制劑與 NMDA 拮抗劑在阿茲海默症。",
    tags: ["Alzheimer", "AChE", "NMDA"],
    related: ["cholinesterase-and-cognition", "memantine-nmda", "major-ncd-alzheimer"],
    blocks: [
      {
        type: "p",
        text: `${term("AChE Inhibitors", "乙醯膽鹼酯酶抑制劑")} 與 ${term("NMDA Antagonists", "NMDA 拮抗劑")} 是症狀性認知藥理，不是治癒。精神醫療角色是早期辨識、排除可逆因子，並接到執行功能與照顧者負荷。`,
      },
    ],
  }),
  note({
    slug: "psychotherapy-processes",
    level: 4,
    domain: "psychotherapy-processes",
    zh: "心理治療歷程",
    en: "Psychotherapy Processes",
    summary: "談話如何變成神經可塑性。",
    tags: ["psychotherapy", "neuroplasticity"],
    related: ["cbt-neuroplasticity", "emdr-reconsolidation", "psychodynamic-insight"],
    blocks: [
      {
        type: "p",
        text: `治療歷程的共同問題：何種經驗依賴可塑性被寫進迴路？CBT 用預測誤差；精神動力用關係中的重演；創傷焦點用記憶再鞏固窗口；神經調節用電場打開可塑性。`,
      },
    ],
  }),
  note({
    slug: "cognitive-behavioral",
    level: 4,
    domain: "cognitive-behavioral",
    zh: "認知行為學派",
    en: "Cognitive-Behavioral Therapies",
    summary: "CBT 認知重塑與 ACT 認知解離、心理彈性。",
    tags: ["CBT", "ACT", "flexibility"],
    related: ["cbt-neuroplasticity", "act-flexibility", "eastern-philosophy"],
    blocks: [
      {
        type: "p",
        text: `${term("CBT", "認知行為治療")} 改預測與行為實驗；${term("ACT", "接受與承諾治療")} 用 ${term("Cognitive Defusion", "認知解離")} 與 ${term("Psychological Flexibility", "心理彈性")}，不再與想法搏鬥。ACT 的底層與佛學的觀察者位置高度同構——這是接到 Level 5 的暗門。`,
      },
    ],
  }),
  note({
    slug: "act-flexibility",
    level: 4,
    domain: "cognitive-behavioral",
    zh: "接受與承諾治療",
    en: "Acceptance and Commitment Therapy",
    summary: "認知解離與心理彈性，作為當代心理學與東方框架的接口。",
    tags: ["ACT", "defusion", "values"],
    related: ["eastern-philosophy", "spirituality-mindfulness", "cbt-neuroplasticity"],
    blocks: [
      {
        type: "p",
        text: `${term("ACT", "接受與承諾治療")} 不要求想法正確，而要求與想法的關係改變。${term("Defusion", "解離")} 讓想法變成可觀察事件；價值導向行動讓生命不被症狀定義。這與無常、正念的實踐語言可以互相翻譯，但不互相取代。`,
      },
    ],
  }),
  note({
    slug: "psychodynamic-insight",
    level: 4,
    domain: "psychodynamic-insight",
    zh: "心理動力與洞察取向",
    en: "Psychodynamic & Insight-Oriented",
    summary: `${term("Transference", "移情")}、${term("Countertransference", "反移情")}與防衛機制。`,
    tags: ["transference", "defense"],
    related: ["classical-psychodynamics", "attachment-early-development", "borderline-personality-disorder"],
    blocks: [
      {
        type: "p",
        text: `洞察取向把治療室當成舊關係的實驗室。${term("Transference", "移情")} 是病人把過去放到你身上；${term("Countertransference", "反移情")} 是你的神經系統被那套劇本啟動。防衛機制是當時活下去的智慧，現在可能變成人際的牆。`,
      },
    ],
  }),
  note({
    slug: "trauma-focused",
    level: 4,
    domain: "trauma-focused",
    zh: "創傷焦點介入",
    en: "Trauma-Focused Interventions",
    summary: "EMDR、記憶再鞏固與工作記憶負載假說。",
    tags: ["EMDR", "reconsolidation", "working memory"],
    related: ["emdr-reconsolidation", "cognition", "ptsd"],
    blocks: [
      {
        type: "p",
        text: `創傷焦點介入假設：提取後的記憶有短暫不穩定窗口。${term("EMDR", "眼動脫敏與歷程處理")} 的競爭假說包括 ${term("Memory Reconsolidation", "記憶再鞏固")} 破壞，以及 ${term("Working Memory Taxation", "工作記憶負載")} 使意象變得較不鮮明。穩定化先於再處理。`,
      },
    ],
  }),
  note({
    slug: "neuromodulation-biofeedback",
    level: 4,
    domain: "neuromodulation-biofeedback",
    zh: "神經調節與生理回饋",
    en: "Neuromodulation & Biofeedback",
    summary: "TMS、ECT 與 Neurofeedback。",
    tags: ["TMS", "ECT", "neurofeedback"],
    related: ["tms-ect", "neurofeedback", "limbic-pfc"],
    blocks: [
      {
        type: "p",
        text: `直接與大腦對話：磁場、電流或即時回饋。它們打開可塑性或操作性學習，仍需要心理社會內容寫進去，否則網絡沒有新的行為可儲存。`,
      },
    ],
  }),
  note({
    slug: "jungian-depth",
    level: 5,
    domain: "jungian-depth",
    zh: "榮格與深度心理學",
    en: "Jungian & Depth Psychology",
    summary: `${term("Collective Unconscious", "集體潛意識")}、${term("Synchronicity", "共時性")}與${term("Individuation", "個體化")}。`,
    tags: ["Jung", "archetype", "individuation"],
    related: ["classical-psychodynamics", "eastern-philosophy", "spirituality-mindfulness"],
    blocks: [
      {
        type: "p",
        text: `${term("Carl Jung", "榮格")} 把個人潛意識接到更大的圖像層。${term("Archetypes", "原型")} 是重複出現的心智形式；${term("Individuation", "個體化歷程")} 是讓自我與陰影、阿尼瑪／阿尼姆斯對話，而不是被它們劫持。${term("Synchronicity", "共時性")} 不是因果定律，而是意義同時發生的經驗範疇——科學地圖在這裡必須承認自己的邊界。`,
      },
    ],
  }),
  note({
    slug: "spirituality-mindfulness",
    level: 5,
    domain: "spirituality-mindfulness",
    zh: "靈性與正念實踐",
    en: "Spirituality & Mindfulness",
    summary: "冥想與心智鍛鍊的實踐筆記。",
    tags: ["mindfulness", "meditation", "practice"],
    related: ["dmn", "act-flexibility", "eastern-philosophy", "embodied-cognition"],
    blocks: [
      {
        type: "p",
        text: `${term("Mental Workouts", "心智鍛鍊")} 在這座金字塔裡不是雞湯，而是改變 DMN 僵硬耦合、內感受精度與注意控制的練習場。冥想筆記記錄方法與主觀效應，不假裝自己是隨機對照試驗。`,
      },
    ],
  }),
  note({
    slug: "eastern-philosophy",
    level: 5,
    domain: "eastern-philosophy",
    zh: "東方哲學與底層框架",
    en: "Eastern Philosophy",
    summary: `${term("I Ching", "易經")}的變動思維、佛學無常與正念，作為 ACT 等當代心理學的底層模型。`,
    tags: ["I Ching", "Buddhism", "impermanence"],
    related: ["act-flexibility", "jungian-depth", "computational-consciousness"],
    resources: [
      {
        id: "iching-intro",
        title: "易經作為變動模型（筆記入口）",
        titleEn: "I Ching as a model of change",
        kind: "note",
        note: "把六十四卦讀成情境轉換圖，而不是占卜手冊。",
      },
    ],
    blocks: [
      {
        type: "p",
        text: `${term("I Ching", "易經")} 的核心不是算命，而是：情境會變，對立會互含，行動要合時。佛學提供 ${term("Anicca", "無常")}、${term("Anatta", "無我")} 與正念的觀察技術。當代 ${term("ACT", "接受與承諾治療")} 的接受、解離與價值行動，可以視為這套底層心智模型的臨床方言。`,
      },
      {
        type: "quote",
        text: "變動不是例外，而是心智與世界的預設狀態。",
        cite: term("I Ching", "易經"),
      },
    ],
  }),
];
