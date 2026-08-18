import { term } from "@/lib/site";
import type { Note, PharmaGroup } from "@/lib/types";

export const pharmaGroups: PharmaGroup[] = [
  {
    slug: "psychosis",
    en: "Psychosis",
    zh: "精神病用藥",
    summary:
      `以${term("Dopamine D2 receptor", "多巴胺 D2 受體")}為核心的${term("Antipsychotics", "抗精神病藥")}：拮抗、部分促效、多受體藥物（含${term("Clozapine", "氯氮平")}）與運動／代謝代價。`,
    summaryEn:
      "Antipsychotics built around dopamine D2: antagonism, partial agonism, multi-receptor agents (including clozapine), plus motor and metabolic costs.",
  },
  {
    slug: "pain",
    en: "Pain killers / Pain management",
    zh: "止痛藥物／疼痛管理",
    summary:
      `${term("Opioids", "鴉片類")}、${term("Gabapentinoids", "加巴噴丁類")}、${term("SNRI", "血清素—去甲腎上腺素再回收抑制劑")}與${term("NMDA pathway", "NMDA 路徑")}如何進入精神醫療的疼痛與成癮現場。`,
    summaryEn:
      "How opioids, gabapentinoids, SNRIs, and NMDA-related agents enter psychiatric pain and addiction care.",
  },
  {
    slug: "neurodegeneration",
    en: "Neurodegeneration",
    zh: "神經退化性疾病用藥",
    summary:
      `${term("Cholinesterase inhibitors", "膽鹼酶抑制劑")}、${term("Memantine", "美金剛")}、多巴胺補充與疾病修飾討論的教育地圖。`,
    summaryEn:
      "An educational map of cholinesterase inhibitors, memantine, dopaminergic replacement, and disease-modifying discussions.",
  },
];

export const pharmaNotes: Note[] = [
  {
    slug: "d2-modulation",
    axis: "pharmacology",
    section: "psychosis",
    en: "D2 Antagonism and Partial Agonism",
    zh: "D2 拮抗與部分促效",
    summary:
      `${term("Antipsychotics", "抗精神病藥")}的共同核心是${term("Dopamine D2", "多巴胺 D2")}。佔有率解釋部分療效，也解釋${term("EPS", "錐體外徑症狀")}與泌乳素。`,
    related: {
      dsm: ["schizophrenia", "bipolar-i"],
      symptoms: ["hallucinations", "delusions", "psychomotor-change"],
      interventions: ["tms-ect"],
      fundamentals: ["dopamine-pathways"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Antipsychotics", "抗精神病藥物")} 不該被想成「強或弱」，而該想成 ${term("Receptor binding profile", "受體結合特性")}。第一代以高 ${term("D2 occupancy", "D2 佔有")} 為主；第二代加上 ${term("5-HT2A", "5-HT2A")} 等特性，代謝與鎮靜剖面大幅分化。${term("Partial agonists", "部分促效劑")}（如 ${term("aripiprazole", "阿立哌唑")} 一類）在高多巴胺狀態表現如拮抗，在低狀態保留一些傳導，靜坐不能仍常見。`,
      },
      {
        type: "table",
        caption: "教學指紋，非完整 Ki 表，不能當作處方公式。",
        headers: ["策略", "臨床權衡"],
        rows: [
          ["高 D2 佔有", `${term("EPS", "錐體外徑症狀")}、泌乳素`],
          ["H1 / M1 / α1 負擔", "鎮靜、抗膽鹼、低血壓、認知模糊"],
          ["D2 部分促效", `${term("Akathisia", "靜坐不能")}；代謝相對較輕者常見`],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: term("NMS", "神經阻斷劑惡性症候群"),
        text: `${term("Neuroleptic malignant syndrome", "神經阻斷劑惡性症候群")} 是急症：高熱、肌僵、自主神經不穩、意識改變。`,
      },
    ],
  },
  {
    slug: "clozapine",
    axis: "pharmacology",
    section: "psychosis",
    en: "Clozapine",
    zh: "氯氮平",
    summary:
      "治療阻抗思覺失調症的關鍵選項。多受體、D2 相對較鬆，監測血液與腸胃低動是使用條件而非附加項。",
    related: {
      dsm: ["schizophrenia"],
      symptoms: ["hallucinations", "avolition"],
      fundamentals: ["dopamine-pathways", "gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Clozapine", "氯氮平")} 對 ${term("Treatment-resistant schizophrenia", "治療阻抗思覺失調症")} 與自殺風險有特殊地位。代價包括 ${term("agranulocytosis", "顆粒性白血球缺乏")}、${term("myocarditis", "心肌炎")}、重度便秘／腸阻塞、代謝與癲癇閾值。沒有監測計畫就沒有合格的氯氮平治療。`,
      },
      {
        type: "callout",
        variant: "clinical",
        title: "CYP1A2",
        text: "吸菸誘導 CYP1A2；戒菸後濃度可能上升。交互作用必須問菸、感染與合併用藥。",
      },
    ],
  },
  {
    slug: "opioids-reward",
    axis: "pharmacology",
    section: "pain",
    en: "Opioids and the Reward System",
    zh: "鴉片類藥物與獎賞系統",
    summary:
      `${term("μ-opioid", "μ 鴉片")}受體止痛也劫持${term("Liking", "喜歡")}／${term("Wanting", "欲求")}。精神醫療要同時看見疼痛、${term("Anhedonia", "缺乏快感")}與${term("Opioid use disorder", "鴉片類使用疾患")}。`,
    related: {
      dsm: ["substance-use-disorder", "ptsd"],
      symptoms: ["craving", "anhedonia", "pain-catastrophizing"],
      fundamentals: ["reward-system", "dopamine-pathways"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Opioid analgesics", "鴉片類止痛藥")} 透過 ${term("μ-opioid receptors", "μ 鴉片受體")} 抑制傷害傳入，並在腹側被蓋區—伏隔核路徑上改變 ${term("Wanting", "欲求")}。慢性使用出現 ${term("Tolerance", "耐受")}、${term("Hyperalgesia", "痛覺過敏")} 與 ${term("Withdrawal", "戒斷")}，使疼痛與渴求互相加油。`,
      },
      {
        type: "ul",
        items: [
          "教育目標是風險分層與跨專業疼痛計畫，不是提供使用方法。",
          `${term("Overdose", "過量")} 風險隨 ${term("Benzodiazepines", "苯二氮平類")}、酒精與劑量上升。`,
          `創傷與疼痛共病時，單獨加 ${term("Opioid", "鴉片類")} 很少解決 ${term("Hyperarousal", "高警覺")}。`,
        ],
      },
    ],
  },
  {
    slug: "gabapentinoids",
    axis: "pharmacology",
    section: "pain",
    en: "Gabapentinoids",
    zh: "加巴噴丁類",
    summary:
      "與電壓閘鈣通道 α2δ 次單位結合，用於部分神經痛；鎮靜、水腫與誤用風險需納入精神評估。",
    related: {
      dsm: ["insomnia-disorder", "substance-use-disorder"],
      symptoms: ["pain-catastrophizing", "sleep-fragmentation", "hyperarousal"],
      fundamentals: ["gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Gabapentin", "加巴噴丁")} 與 ${term("Pregabalin", "普瑞巴林")} 並非直接 ${term("GABA agonist", "GABA 促效劑")}，而是減少興奮性神經傳導相關的鈣通道調控。對焦慮／失眠的「順手使用」證據與誤用風險必須同時講。`,
      },
    ],
  },
  {
    slug: "snri-pain-interface",
    axis: "pharmacology",
    section: "pain",
    en: "SNRIs at the Pain–Mood Interface",
    zh: "SNRI 在疼痛—情緒介面",
    summary:
      `${term("Serotonin–norepinephrine reuptake inhibition", "血清素—去甲腎上腺素再回收抑制")}同時進入憂鬱、焦慮與部分慢性疼痛路徑。`,
    related: {
      dsm: ["major-depressive-disorder", "generalized-anxiety-disorder"],
      symptoms: ["pain-catastrophizing", "anhedonia", "anxious-apprehension"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["serotonin-system", "hpa-axis"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("SNRI", "血清素—去甲腎上腺素再回收抑制劑")} 是精神醫學與疼痛醫學的橋梁之一。下降脊髓傷害調節與改善憂鬱可並行，但血壓、停藥症候群與出血風險仍要監測。本站不提供劑量公式。`,
      },
    ],
  },
  {
    slug: "ketamine-nmda",
    axis: "pharmacology",
    section: "pain",
    en: "NMDA Modulation (Ketamine class)",
    zh: "NMDA 調節（氯胺酮類）",
    summary:
      `${term("NMDA antagonism", "NMDA 拮抗")}相關的快速抗憂鬱與疼痛研究，指向${term("Glutamate", "麩胺酸")}與突觸可塑性，而非經典單胺慢速假說。`,
    related: {
      dsm: ["major-depressive-disorder"],
      interventions: ["tms-ect", "cbt-neuroplasticity"],
      fundamentals: ["gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Ketamine", "氯胺酮")} / ${term("esketamine", "艾司氯胺酮")} 類介入被放在難治型憂鬱與急性自殺意念的研究與部分臨床路徑中。機制教學多指向 ${term("NMDA receptor", "NMDA 受體")}、${term("GABA", "GABA")} 中間神經元與隨後的 ${term("Synaptic plasticity", "突觸可塑性")}。解離、血壓、${term("Substance use", "物質使用")}史與濫用風險是篩檢核心。`,
      },
    ],
  },
  {
    slug: "cholinesterase-and-cognition",
    axis: "pharmacology",
    section: "neurodegeneration",
    en: "Cholinesterase Inhibitors",
    zh: "膽鹼酶抑制劑",
    summary:
      `提高突觸${term("Acetylcholine", "乙醯膽鹼")}，用於${term("Alzheimer", "阿茲海默病")}等${term("NCD", "神經認知疾患")}的症狀性認知藥理，不是治癒疾病。`,
    related: {
      dsm: ["major-ncd-alzheimer"],
      symptoms: ["executive-dysfunction"],
      fundamentals: ["limbic-pfc", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Donepezil", "多奈哌齊")} 等 ${term("Acetylcholinesterase inhibitors", "乙醯膽鹼酶抑制劑")} 可能帶來有限的認知與功能好處。腸胃、心搏過緩、作夢生動是常見耐受問題。抗膽鹼藥物會對沖效果。`,
      },
    ],
  },
  {
    slug: "memantine-nmda",
    axis: "pharmacology",
    section: "neurodegeneration",
    en: "Memantine",
    zh: "美金剛",
    summary:
      `非競爭性${term("NMDA modulation", "NMDA 調節")}，用於中重度${term("Alzheimer", "阿茲海默病")}的症狀性治療討論。`,
    related: {
      dsm: ["major-ncd-alzheimer"],
      fundamentals: ["gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Memantine", "美金剛")} 試圖在病理 ${term("Glutamate", "麩胺酸")} 興奮毒性與生理 NMDA 訊號之間取得平衡。頭暈與意識模糊需與 ${term("Delirium", "瞻妄")} 鑑別。`,
      },
    ],
  },
  {
    slug: "anti-amyloid",
    axis: "pharmacology",
    section: "neurodegeneration",
    en: "Disease-modifying discussions (anti-amyloid)",
    zh: "疾病修飾討論（抗類澱粉）",
    summary:
      `單株抗體等疾病修飾策略改變的是病理蛋白，不是經典精神症狀藥。${term("ARIA", "類澱粉相關影像異常")}與適應症選擇屬於專科流程。`,
    related: {
      dsm: ["major-ncd-alzheimer"],
      fundamentals: ["gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `抗 ${term("Amyloid", "類澱粉")} 治療把 ${term("NCD", "神經認知疾患")} 從純症狀管理推進到疾病修飾討論。精神醫療角色是早期辨識、排除可逆因子、與家屬溝通不確定性，而不是在門診直接複製神經內科流程。`,
      },
    ],
  },
  {
    slug: "dopamine-pathways-drugs",
    axis: "pharmacology",
    section: "neurodegeneration",
    en: "Dopaminergic Replacement (Parkinsonian axis)",
    zh: "多巴胺補充（帕金森軸）",
    summary:
      `${term("Levodopa", "左旋多巴")}與促效劑改善運動，也可能帶來${term("Impulse control", "衝動控制")}與精神病性症狀——精神與神經科的交界。`,
    related: {
      dsm: ["adhd", "substance-use-disorder"],
      symptoms: ["hallucinations", "craving", "executive-dysfunction"],
      fundamentals: ["dopamine-pathways", "reward-system"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Levodopa", "左旋多巴")} 走 ${term("Nigrostriatal", "黑質紋狀體")} 路徑改善運動；溢到 ${term("Mesolimbic", "中腦邊緣")} 則可能出現 ${term("Impulse control disorders", "衝動控制疾患")}、${term("Dopamine dysregulation", "多巴胺調節異常")} 與幻覺。這是 ${term("Dopamine pathways", "多巴胺路徑")} 地圖的臨床考題。`,
      },
    ],
  },
];
