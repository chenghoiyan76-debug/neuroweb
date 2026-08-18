import { term } from "@/lib/site";
import type { Note } from "@/lib/types";

export const interventionNotes: Note[] = [
  {
    slug: "cbt-neuroplasticity",
    axis: "intervention",
    en: "Neuroplasticity in CBT",
    zh: "認知行為治療如何引發神經可塑性",
    summary:
      `${term("CBT", "認知行為治療")}不是正向思考。${term("Prediction error", "預測誤差")}、重複練習與睡眠固化，使${term("Threat appraisal", "威脅評估")}與${term("Reward", "獎賞")}的網絡權重改變。`,
    related: {
      dsm: ["major-depressive-disorder", "generalized-anxiety-disorder", "ptsd"],
      symptoms: ["anhedonia", "rumination", "anxious-apprehension", "pain-catastrophizing"],
      pharmacology: ["snri-pain-interface", "ketamine-nmda"],
      fundamentals: ["limbic-pfc", "sleep-architecture", "gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Cognitive Behavioral Therapy", "認知行為治療")}（CBT）的生物學問題是：談話如何改變腦？較可用的答案是 ${term("Experience-dependent plasticity", "經驗依賴可塑性")}：行為實驗製造 ${term("Prediction error", "預測誤差")}，重複與睡眠把它寫進突觸。`,
      },
      {
        type: "ul",
        items: [
          `${term("Exposure / inhibitory learning", "暴露／抑制學習")}：新的安全聯結抑制舊威脅聯結，${term("Amygdala–PFC", "杏仁核—前額葉")}對話改變。`,
          `${term("Behavioral activation", "行為啟動")}：提高 ${term("Reward", "獎賞")} 可及性，對抗 ${term("Anhedonia", "缺乏快感")} 的 ${term("Effort cost", "付出成本")}。`,
          "家庭作業是劑量；沒有會談外重複，就幾乎沒有可塑性。",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "與藥物的接口",
        text: `${term("Antidepressants", "抗憂鬱劑")} 與 ${term("Ketamine", "氯胺酮")} 類可能打開可塑性窗口；${term("CBT", "認知行為治療")} 提供要寫進去的內容。${term("Benzodiazepines", "苯二氮平類")} 過強的降低喚起，可能干擾暴露學習。`,
      },
    ],
  },
  {
    slug: "emdr-reconsolidation",
    axis: "intervention",
    en: "EMDR and Memory Reconsolidation",
    zh: "EMDR 與記憶再鞏固",
    summary:
      "在提取創傷記憶的不穩定窗口加入雙重注意力與新訊息，使記憶以較低困擾的形式再儲存。",
    related: {
      dsm: ["ptsd", "borderline-personality-disorder"],
      symptoms: ["hyperarousal", "dissociation", "sleep-fragmentation"],
      fundamentals: ["limbic-pfc", "hpa-axis", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("EMDR", "眼動脫敏與歷程處理")} 的生物學假說之一是 ${term("Memory reconsolidation", "記憶再鞏固")}：已固化的情節記憶在提取後短暫不穩定，若此時有 ${term("Dual attention", "雙重注意力")}（眼動、輕拍或音調）與修正性訊息，再儲存時 ${term("SUD", "主觀困擾單位")} 下降、信念更新。`,
      },
      {
        type: "ol",
        items: [
          `穩定化：${term("Window of tolerance", "耐受窗")}、安全、${term("Substance use", "物質使用")}。`,
          "提取目標記憶：畫面、認知、身體。",
          "再處理：保持雙重注意力，直到困擾下降。",
          "再評估與日常整合。",
        ],
      },
      {
        type: "callout",
        variant: "clinical",
        title: "解離紅燈",
        text: `明顯 ${term("Dissociation", "解離")} 或當下不安全時，過早再處理可能無法形成新學習。階段性處遇是倫理，不是保守。`,
      },
    ],
  },
  {
    slug: "tms-ect",
    axis: "intervention",
    en: "TMS and ECT — principles of brain stimulation",
    zh: "經顱磁刺激與電痙攣治療的作用原理",
    summary:
      `用電場／磁場改變皮質興奮性與網絡連線。${term("TMS", "經顱磁刺激")}較局灶；${term("ECT", "電痙攣治療")}仍是嚴重憂鬱與緊張型等情境的強力選項。`,
    related: {
      dsm: ["major-depressive-disorder", "schizophrenia"],
      symptoms: ["anhedonia", "hallucinations", "executive-dysfunction"],
      pharmacology: ["ketamine-nmda", "d2-modulation"],
      fundamentals: ["gaba-glutamate", "limbic-pfc"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "h2",
        id: "tms",
        text: "rTMS / iTBS",
      },
      {
        type: "p",
        text: `${term("Transcranial magnetic stimulation", "經顱磁刺激")}（TMS）以快速變化磁場在皮質誘導電流。高頻或 ${term("intermittent theta burst stimulation", "間歇 theta 爆發刺激")}（iTBS）刺激左側 ${term("DLPFC", "背外側前額葉")} 是難治型憂鬱最被討論的協議。機制語言是局部興奮性 + 網絡重整 + 可塑性。`,
      },
      {
        type: "h2",
        id: "ect",
        text: "ECT",
      },
      {
        type: "p",
        text: `${term("Electroconvulsive therapy", "電痙攣治療")}（ECT）誘發治療性發作，對嚴重憂鬱、精神病性憂鬱、緊張型與部分急性自殺風險仍具關鍵地位。認知副作用需要知情同意；它不是 ${term("TMS", "經顱磁刺激")} 的「加強版」，適應症與風險剖面不同。`,
      },
      {
        type: "callout",
        variant: "warning",
        title: "安全",
        text: `${term("TMS", "經顱磁刺激")}：癲癇史、金屬植入。${term("ECT", "電痙攣治療")}：麻醉與認知風險。兩者都需要與心理社會治療銜接，否則網絡沒有行為可寫入。`,
      },
    ],
  },
  {
    slug: "neurofeedback",
    axis: "intervention",
    en: "Neurofeedback",
    zh: "神經生理回饋",
    summary:
      "以即時腦訊號做操作性制約。原理靠近可塑性與學習，證據依適應症而異，知情同意必須誠實。",
    related: {
      dsm: ["adhd", "insomnia-disorder", "generalized-anxiety-disorder"],
      symptoms: ["executive-dysfunction", "hyperarousal"],
      fundamentals: ["limbic-pfc", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Neurofeedback", "神經生理回饋")} 讓個案看見 ${term("EEG", "腦電圖")} 或其他指標，學習朝目標狀態自我調節。它是學習，不是「校正腦波儀器」。${term("ADHD", "注意力不足過動症")}、部分焦慮與失眠有研究，但協定異質、安慰劑與注意力訓練效應很難剝離。`,
      },
      {
        type: "ul",
        items: [
          "同意書要寫：證據等級、次數、費用、何時停止。",
          "不能取代風險評估或已確立的第一線治療。",
        ],
      },
    ],
  },
];
