import { term } from "@/lib/i18n";
import { note } from "./indexNotes";
import type { Note } from "@/lib/types";

export const clinicalNotes: Note[] = [
  note({
    slug: "dopamine-pathways",
    level: 1,
    domain: "neurotransmitter-systems",
    zh: "多巴胺系統",
    en: "Dopamine Pathways",
    summary: `${term("Mesolimbic", "中腦邊緣")}、${term("Mesocortical", "中腦皮質")}、${term("Nigrostriatal", "黑質紋狀體")}、${term("Tuberoinfundibular", "結節漏斗")}四條路徑。`,
    tags: ["dopamine", "pathways"],
    related: ["reward-system", "d2-modulation", "schizophrenia", "adhd"],
    blocks: [
      {
        type: "table",
        headers: ["路徑", "大致功能", "臨床影射"],
        rows: [
          [term("Mesolimbic", "中腦邊緣"), `${term("Salience", "顯著性")}、${term("Wanting", "欲求")}`, `正向症狀、${term("Craving", "渴求")}`],
          [term("Mesocortical", "中腦皮質"), "執行、動機、工作記憶", "負性／認知症狀"],
          [term("Nigrostriatal", "黑質紋狀體"), "動作選擇", term("EPS", "錐體外徑症狀")],
          [term("Tuberoinfundibular", "結節漏斗"), "抑制泌乳素", "高泌乳素血症"],
        ],
      },
      {
        type: "p",
        text: `${term("Dopamine", "多巴胺")} 比較像「這件事值得注意／值得付出」的訊號，而不是快樂分子。`,
      },
    ],
  }),
  note({
    slug: "reward-system",
    level: 1,
    domain: "neurotransmitter-systems",
    zh: "成癮機制與獎賞迴路",
    en: "Addiction and the Reward System",
    summary: `${term("VTA–NAc–PFC", "腹側被蓋區—伏隔核—前額葉")}。Wanting 可以在 Liking 消失後仍被線索點燃。`,
    tags: ["addiction", "reward"],
    related: ["dopamine-pathways", "opioids-reward", "substance-use-disorder"],
    blocks: [
      {
        type: "p",
        text: `${term("Reward system", "獎賞迴路")} 核心是 VTA 到 ${term("Nucleus accumbens", "伏隔核")}，再受 PFC 調節。成癮教學把狂用、戒斷負情感與盤據／預期分成三階段。`,
      },
      {
        type: "ul",
        items: [
          `${term("Incentive sensitization", "誘因敏感化")}：線索的欲求上升。`,
          "負增強：用物質是為了拿掉戒斷、焦慮、疼痛或空虛。",
          "PFC 控制下降使執行功能障礙變成復發風險。",
        ],
      },
    ],
  }),
  note({
    slug: "serotonin-system",
    level: 1,
    domain: "neurotransmitter-systems",
    zh: "血清素系統",
    en: "Serotonin System",
    summary: `廣泛調控情緒、焦慮、睡眠與食慾。${term("SSRI", "選擇性血清素再回收抑制劑")}不能化約成「腦中缺血清素」。`,
    tags: ["serotonin", "5-HT"],
    related: ["antidepressants-anxiolytics", "major-depressive-disorder"],
    blocks: [
      {
        type: "p",
        text: `${term("Serotonin", "血清素")}（5-HT）細胞體主要在 ${term("Raphe nuclei", "中縫核")}。受體亞型解釋焦慮短暫升高、性功能、腸胃與睡眠的不同剖面。下游更重要的可能是神經可塑性。`,
      },
    ],
  }),
  note({
    slug: "gaba-glutamate",
    level: 1,
    domain: "neurotransmitter-systems",
    zh: "GABA／麩胺酸路徑",
    en: "GABA and Glutamate Pathways",
    summary: "腦的主要抑制與興奮貨幣。",
    tags: ["GABA", "glutamate"],
    related: ["ketamine-nmda", "tms-ect", "antidepressants-anxiolytics"],
    blocks: [
      {
        type: "p",
        text: `${term("Glutamate", "麩胺酸")} 是主要興奮性傳導；${term("GABA", "γ-胺基丁酸")} 是主要抑制。${term("E/I balance", "興奮／抑制平衡")}被用來討論焦慮、癲癇與 TMS 如何改變皮質興奮性。`,
      },
      {
        type: "callout",
        variant: "clinical",
        title: "Benzodiazepines",
        text: `正向調節 GABA-A 可快速減焦慮，也造成耐受、戒斷，並可能干擾暴露學習。`,
      },
    ],
  }),
  note({
    slug: "hpa-axis",
    level: 1,
    domain: "neuroendocrinology",
    zh: "HPA 軸與壓力反應",
    en: "HPA Axis and Stress",
    summary: "慢性皮質醇訊號與憂鬱、創傷、失眠互相維持。",
    tags: ["HPA", "cortisol"],
    related: ["ptsd", "major-depressive-disorder", "embodied-cognition"],
    blocks: [
      {
        type: "p",
        text: `${term("HPA axis", "下視丘—腦垂體—腎上腺軸")}：PVN 釋放 CRH → ACTH → ${term("Cortisol", "皮質醇")}。急性有助應付；慢性則影響海馬、睡眠與免疫。PTSD 的皮質醇發現並不一致，應強調系統失調。`,
      },
    ],
  }),
  note({
    slug: "limbic-pfc",
    level: 1,
    domain: "neuroanatomy-circuitry",
    zh: "邊緣系統與前額葉",
    en: "Limbic–PFC Circuitry",
    summary: "杏仁核、海馬、ACC 與 PFC 的對話。",
    tags: ["amygdala", "PFC"],
    related: ["dmn", "cognition", "ptsd", "cbt-neuroplasticity"],
    blocks: [
      {
        type: "p",
        text: `${term("Amygdala", "杏仁核")} 與 ${term("Hippocampus", "海馬")} 快速標記威脅與脈絡；PFC 做評估與抑制。高喚起時 PFC 效率下降。`,
      },
      {
        type: "ul",
        items: [
          `${term("vmPFC", "腹內側前額葉")}：安全學習、消滅恐懼。`,
          `${term("DLPFC", "背外側前額葉")}：工作記憶與 TMS 常見標的。`,
          `${term("ACC", "前扣帶")}：衝突監控、疼痛的情感成分。`,
        ],
      },
    ],
  }),
  note({
    slug: "sleep-architecture",
    level: 1,
    domain: "sleep-circadian",
    zh: "睡眠結構",
    en: "Sleep Architecture",
    summary: "NREM（含慢波）與 REM 的交替，幾乎所有可塑性都經過這一晚。",
    tags: ["NREM", "REM"],
    related: ["bipolar-i", "cbt-neuroplasticity", "insomnia-disorder"],
    blocks: [
      {
        type: "p",
        text: `${term("Slow-wave sleep", "慢波睡眠")} 與記憶固化、代謝清除有關；快速動眼與情緒記憶處理有關。躁狂的睡眠需求下降是臨床警報。沒有睡眠，CBT 的可塑性會打折。`,
      },
    ],
  }),
  note({
    slug: "cbt-neuroplasticity",
    level: 4,
    domain: "cognitive-behavioral",
    zh: "認知行為治療如何引發神經可塑性",
    en: "Neuroplasticity in CBT",
    summary: "預測誤差、重複練習與睡眠固化，使威脅評估與獎賞網絡權重改變。",
    tags: ["CBT", "plasticity"],
    related: ["act-flexibility", "limbic-pfc", "sleep-architecture"],
    blocks: [
      {
        type: "p",
        text: `${term("CBT", "認知行為治療")} 的生物學問題是：談話如何改變腦？較可用的答案是經驗依賴可塑性：行為實驗製造 ${term("Prediction error", "預測誤差")}，重複與睡眠把它寫進突觸。`,
      },
      {
        type: "ul",
        items: [
          `${term("Exposure / inhibitory learning", "暴露／抑制學習")}：新的安全聯結抑制舊威脅聯結。`,
          `${term("Behavioral activation", "行為啟動")}：提高獎賞可及性。`,
          "家庭作業是劑量。",
        ],
      },
    ],
  }),
  note({
    slug: "emdr-reconsolidation",
    level: 4,
    domain: "trauma-focused",
    zh: "EMDR 與記憶再鞏固",
    en: "EMDR and Memory Reconsolidation",
    summary: "在提取創傷記憶的不穩定窗口加入雙重注意力與新訊息。",
    tags: ["EMDR", "memory"],
    related: ["trauma-focused", "cognition", "ptsd"],
    blocks: [
      {
        type: "p",
        text: `${term("EMDR", "眼動脫敏與歷程處理")} 的假說之一是 ${term("Memory reconsolidation", "記憶再鞏固")}：已固化記憶在提取後短暫不穩定。競爭假說是工作記憶負載使意象變淡。`,
      },
      {
        type: "ol",
        items: [
          "穩定化：耐受窗、安全、物質使用。",
          "提取目標記憶：畫面、認知、身體。",
          "再處理：保持雙重注意力，直到困擾下降。",
          "再評估與日常整合。",
        ],
      },
      {
        type: "callout",
        variant: "clinical",
        title: "解離紅燈",
        text: "明顯解離或當下不安全時，過早再處理可能無法形成新學習。",
      },
    ],
  }),
  note({
    slug: "tms-ect",
    level: 4,
    domain: "neuromodulation-biofeedback",
    zh: "經顱磁刺激與電痙攣治療",
    en: "TMS and ECT",
    summary: "用電場／磁場改變皮質興奮性與網絡連線。",
    tags: ["TMS", "ECT"],
    related: ["gaba-glutamate", "limbic-pfc", "major-depressive-disorder"],
    blocks: [
      {
        type: "h2",
        id: "tms",
        text: "rTMS / iTBS",
      },
      {
        type: "p",
        text: `${term("TMS", "經顱磁刺激")} 以快速變化磁場在皮質誘導電流。高頻或 iTBS 刺激左側 DLPFC 是難治型憂鬱最被討論的協議。`,
      },
      {
        type: "h2",
        id: "ect",
        text: "ECT",
      },
      {
        type: "p",
        text: `${term("ECT", "電痙攣治療")} 誘發治療性發作，對嚴重憂鬱、精神病性憂鬱、緊張型仍具關鍵地位。它不是 TMS 的加強版。`,
      },
    ],
  }),
  note({
    slug: "neurofeedback",
    level: 4,
    domain: "neuromodulation-biofeedback",
    zh: "神經生理回饋",
    en: "Neurofeedback",
    summary: "以即時腦訊號做操作性制約。",
    tags: ["neurofeedback", "EEG"],
    related: ["behavioralism-conditioning", "adhd"],
    blocks: [
      {
        type: "p",
        text: `${term("Neurofeedback", "神經生理回饋")} 讓個案看見 EEG 或其他指標，學習朝目標狀態自我調節。它是學習，不是校正儀器。證據依適應症而異。`,
      },
    ],
  }),
  note({
    slug: "d2-modulation",
    level: 4,
    domain: "psychosis-mood-stabilizers",
    zh: "D2 拮抗與部分促效",
    en: "D2 Antagonism and Partial Agonism",
    summary: "抗精神病藥物的共同核心是多巴胺 D2。",
    tags: ["D2", "antipsychotic"],
    related: ["dopamine-pathways", "clozapine", "schizophrenia"],
    blocks: [
      {
        type: "p",
        text: `抗精神病藥物該被想成 ${term("Receptor binding profile", "受體結合特性")}。第一代以高 D2 佔有為主；第二代加上 5-HT2A 等特性。部分促效劑在高多巴胺狀態表現如拮抗。`,
      },
      {
        type: "callout",
        variant: "warning",
        title: term("NMS", "神經阻斷劑惡性症候群"),
        text: "高熱、肌僵、自主神經不穩、意識改變，是急症。",
      },
    ],
  }),
  note({
    slug: "clozapine",
    level: 4,
    domain: "psychosis-mood-stabilizers",
    zh: "氯氮平",
    en: "Clozapine",
    summary: "治療阻抗思覺失調症的關鍵選項。沒有監測就沒有合格治療。",
    tags: ["clozapine"],
    related: ["schizophrenia", "d2-modulation"],
    blocks: [
      {
        type: "p",
        text: `${term("Clozapine", "氯氮平")} 對治療阻抗思覺失調症與自殺風險有特殊地位。代價包括顆粒性白血球缺乏、心肌炎、重度便秘、代謝與癲癇閾值。`,
      },
    ],
  }),
  note({
    slug: "opioids-reward",
    level: 4,
    domain: "pain-management",
    zh: "鴉片類藥物與獎賞系統",
    en: "Opioids and the Reward System",
    summary: "μ 鴉片受體止痛也劫持 Liking／Wanting。",
    tags: ["opioid", "mu"],
    related: ["reward-system", "pain-management"],
    blocks: [
      {
        type: "p",
        text: `${term("Opioid analgesics", "鴉片類止痛藥")} 透過 μ 受體抑制傷害傳入，並在 VTA–NAc 路徑上改變欲求。教育目標是風險分層，不是提供使用方法。`,
      },
    ],
  }),
  note({
    slug: "gabapentinoids",
    level: 4,
    domain: "pain-management",
    zh: "加巴噴丁類",
    en: "Gabapentinoids",
    summary: "與電壓閘鈣通道 α2δ 次單位結合；鎮靜與誤用風險需納入評估。",
    tags: ["gabapentin"],
    related: ["gaba-glutamate", "pain-management"],
    blocks: [
      {
        type: "p",
        text: `${term("Gabapentin", "加巴噴丁")} 與 ${term("Pregabalin", "普瑞巴林")} 並非直接 GABA 促效劑。對焦慮／失眠的順手使用證據與誤用風險必須同時講。`,
      },
    ],
  }),
  note({
    slug: "snri-pain-interface",
    level: 4,
    domain: "antidepressants-anxiolytics",
    zh: "SNRI 在疼痛—情緒介面",
    en: "SNRIs at the Pain–Mood Interface",
    summary: "血清素—去甲腎上腺素再回收抑制同時進入憂鬱、焦慮與部分慢性疼痛路徑。",
    tags: ["SNRI", "pain"],
    related: ["serotonin-system", "pain-management"],
    blocks: [
      {
        type: "p",
        text: `${term("SNRI", "血清素—去甲腎上腺素再回收抑制劑")} 是精神醫學與疼痛醫學的橋梁之一。本站不提供劑量公式。`,
      },
    ],
  }),
  note({
    slug: "ketamine-nmda",
    level: 4,
    domain: "antidepressants-anxiolytics",
    zh: "NMDA 調節（氯胺酮類）",
    en: "NMDA Modulation (Ketamine class)",
    summary: "指向麩胺酸與突觸可塑性，而非經典單胺慢速假說。",
    tags: ["ketamine", "NMDA"],
    related: ["gaba-glutamate", "tms-ect", "major-depressive-disorder"],
    blocks: [
      {
        type: "p",
        text: `${term("Ketamine", "氯胺酮")} / esketamine 類介入被放在難治型憂鬱討論中。機制教學多指向 NMDA、GABA 中間神經元與隨後的突觸可塑性。解離、血壓與物質使用史是篩檢核心。`,
      },
    ],
  }),
  note({
    slug: "cholinesterase-and-cognition",
    level: 4,
    domain: "neurodegeneration-pharm",
    zh: "膽鹼酶抑制劑",
    en: "Cholinesterase Inhibitors",
    summary: "提高突觸乙醯膽鹼，用於阿茲海默病等 NCD 的症狀性認知藥理。",
    tags: ["AChE", "Alzheimer"],
    related: ["major-ncd-alzheimer", "memantine-nmda"],
    blocks: [
      {
        type: "p",
        text: `${term("Donepezil", "多奈哌齊")} 等乙醯膽鹼酶抑制劑可能帶來有限的認知與功能好處。抗膽鹼藥物會對沖效果。`,
      },
    ],
  }),
  note({
    slug: "memantine-nmda",
    level: 4,
    domain: "neurodegeneration-pharm",
    zh: "美金剛",
    en: "Memantine",
    summary: "非競爭性 NMDA 調節，用於中重度阿茲海默病的症狀性討論。",
    tags: ["memantine", "NMDA"],
    related: ["gaba-glutamate", "cholinesterase-and-cognition"],
    blocks: [
      {
        type: "p",
        text: `${term("Memantine", "美金剛")} 試圖在病理麩胺酸興奮毒性與生理 NMDA 訊號之間取得平衡。頭暈與意識模糊需與瞻妄鑑別。`,
      },
    ],
  }),
  note({
    slug: "major-depressive-disorder",
    level: 4,
    domain: "major-depressive-disorder",
    zh: "重度憂鬱症",
    en: "Major Depressive Disorder",
    summary: "情緒、缺乏快感、軀體與認知群聚。重點在病程、自殺風險、鑑別雙相。",
    tags: ["MDD"],
    related: ["bipolar-i", "anhedonia-index", "hpa-axis", "cbt-neuroplasticity", "tms-ect"],
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: term("Nosology", "疾病分類學"),
        text: "本頁為臨床筆記，**不重製 DSM-5 診斷準則原文**。",
      },
      {
        type: "p",
        text: `${term("Major Depressive Disorder", "重度憂鬱症")} 不是心情不好。評估要分開悲傷、${term("Anhedonia", "缺乏快感")}、反芻、睡眠與自殺風險。每一次發作都要問是否曾有躁狂或輕躁。`,
      },
    ],
  }),
  note({
    slug: "bipolar-i",
    level: 4,
    domain: "bipolar-i",
    zh: "雙相情緒障礙症第一型",
    en: "Bipolar I Disorder",
    summary: "躁狂定義疾病；憂鬱期常是失能主因。睡眠減少是早期預警。",
    tags: ["bipolar", "mania"],
    related: ["lithium", "sleep-architecture", "major-depressive-disorder"],
    blocks: [
      {
        type: "p",
        text: `${term("Bipolar I Disorder", "雙相 I 型")} 的錯誤常見於：把激越性憂鬱當成躁狂、把 ADHD 的慢性浮躁當成輕躁、或忽略抗憂鬱劑誘發轉相。`,
      },
      {
        type: "ul",
        items: [
          "監測睡眠—覺醒週期。",
          `${term("Lithium", "鋰鹽")} 仍是防復發與自殺風險討論的核心之一。`,
        ],
      },
    ],
  }),
  note({
    slug: "schizophrenia",
    level: 4,
    domain: "schizophrenia",
    zh: "思覺失調症",
    en: "Schizophrenia",
    summary: "正性、負性與認知三條軸要分開追蹤。",
    tags: ["schizophrenia"],
    related: ["d2-modulation", "clozapine", "dopamine-pathways"],
    blocks: [
      {
        type: "table",
        headers: ["軸", "例子"],
        rows: [
          [term("Positive symptoms", "正性症狀"), "幻覺、妄想"],
          [term("Negative symptoms", "負性症狀"), "動機缺乏、缺乏快感"],
          [term("Cognitive impairment", "認知缺損"), "執行功能障礙"],
        ],
      },
    ],
  }),
  note({
    slug: "generalized-anxiety-disorder",
    level: 4,
    domain: "generalized-anxiety-disorder",
    zh: "廣泛性焦慮症",
    en: "Generalized Anxiety Disorder",
    summary: "擔心被當成責任與預防災難的策略。",
    tags: ["GAD"],
    related: ["cbt-neuroplasticity", "hpa-axis", "gaba-glutamate"],
    blocks: [
      {
        type: "p",
        text: `${term("GAD", "廣泛性焦慮症")} 的維持環是：威脅高估 → 擔心 → 短暫控制感 → 得不到「不擔心也能過關」的學習。苯二氮平類可能成為安全行為。`,
      },
    ],
  }),
  note({
    slug: "ptsd",
    level: 4,
    domain: "ptsd",
    zh: "創傷後壓力症",
    en: "Posttraumatic Stress Disorder",
    summary: "記憶、安全感與高警覺系統被改寫。",
    tags: ["PTSD"],
    related: ["emdr-reconsolidation", "hpa-axis", "attachment-early-development"],
    blocks: [
      {
        type: "p",
        text: `${term("PTSD", "創傷後壓力症")} 不是「想開一點」。閃回、回避、高警覺與負向認知改變要分開追。穩定化、睡眠與物質使用往往決定能不能做記憶工作。`,
      },
    ],
  }),
  note({
    slug: "adhd",
    level: 4,
    domain: "adhd",
    zh: "注意力不足過動症",
    en: "Attention-Deficit/Hyperactivity Disorder",
    summary: "成人期常以執行崩解、時間盲與情緒波動呈現。",
    tags: ["ADHD"],
    related: ["cognition", "psychological-assessment", "dopamine-pathways"],
    blocks: [
      {
        type: "p",
        text: `成人 ${term("ADHD", "注意力不足過動症")} 的臨床入口常是工作記憶、延宕厭惡與環境支架，而不是「坐不住」。衡鑑要接到認知剖面，而不是只接到量表分數。`,
      },
    ],
  }),
  note({
    slug: "borderline-personality-disorder",
    level: 4,
    domain: "borderline-personality-disorder",
    zh: "邊緣型人格疾患",
    en: "Borderline Personality Disorder",
    summary: "人際風暴、認同不穩與喚起失調；接到依附與創傷。",
    tags: ["BPD"],
    related: ["attachment-early-development", "psychodynamic-insight", "limbic-pfc"],
    blocks: [
      {
        type: "p",
        text: `${term("BPD", "邊緣型人格疾患")} 是金字塔中發展層與臨床層交會最密的點之一。治療關係本身就是暴露：移情風暴、被放棄恐懼與防衛。`,
      },
    ],
  }),
  note({
    slug: "substance-use-disorder",
    level: 4,
    domain: "substance-addictive",
    zh: "物質使用疾患",
    en: "Substance Use Disorder",
    summary: "獎賞、戒斷與執行控制的臨床交界。",
    tags: ["SUD"],
    related: ["reward-system", "opioids-reward"],
    blocks: [
      {
        type: "p",
        text: `${term("Substance Use Disorder", "物質使用疾患")} 必須同時讀獎賞迴路、創傷共病與前額葉控制。它不是品格失敗，也不是單一受體故事。`,
      },
    ],
  }),
  note({
    slug: "major-ncd-alzheimer",
    level: 4,
    domain: "major-ncd-alzheimer",
    zh: "阿茲海默病所致之重度神經認知疾患",
    en: "Major NCD due to Alzheimer Disease",
    summary: "認知剖面、可逆因子與症狀性藥理的教育地圖。",
    tags: ["Alzheimer", "NCD"],
    related: ["cholinesterase-and-cognition", "psychological-assessment"],
    blocks: [
      {
        type: "p",
        text: `精神醫療在 ${term("Alzheimer's Disease", "阿茲海默症")} 的角色是早期辨識、排除瞻妄與憂鬱模仿、與家屬溝通不確定性。藥理是症狀性，不是治癒。`,
      },
    ],
  }),
  note({
    slug: "insomnia-disorder",
    level: 4,
    domain: "insomnia-disorder",
    zh: "失眠疾患",
    en: "Insomnia Disorder",
    summary: "睡眠結構被打斷後，情緒與執行功能一起失真。",
    tags: ["insomnia"],
    related: ["sleep-architecture", "cbt-neuroplasticity"],
    blocks: [
      {
        type: "p",
        text: `失眠往往是其他樓層的放大器。先畫睡眠結構，再評價抗憂鬱無效。`,
      },
    ],
  }),
  note({
    slug: "anhedonia-index",
    level: 3,
    domain: "cognition",
    zh: "缺乏快感",
    en: "Anhedonia",
    summary: "獎賞可及性、努力成本與多巴胺顯著性的交會。",
    tags: ["anhedonia", "reward"],
    related: ["reward-system", "major-depressive-disorder", "dopamine-pathways"],
    blocks: [
      {
        type: "p",
        text: `${term("Anhedonia", "缺乏快感")} 不一定是「快樂分子不夠」，更常是欲求、努力成本與預測獎賞失準。它是症狀入口，也是行為啟動的靶。`,
      },
    ],
  }),
];
