import type { Article } from "../types";

const caseDisclaimer: Article["blocks"][number] = {
  type: "callout",
  variant: "warning",
  title: "教學用匿名個案",
  text: "以下情節為合成教學案例，細節已改寫，不對應真實可辨識個人。評估與處遇僅供臨床推理練習，不能當作特定病人的處方或治療義務。",
};

export const caseArticles: Article[] = [
  {
    slug: "mdd-cbt-ssri",
    pillar: "cases",
    title: "重度憂鬱發作：CBT 與 SSRI 的整合處遇",
    englishTitle: "Major Depressive Episode: Integrating CBT and an SSRI",
    summary:
      "示範如何把認知三角、行為啟動、自殺風險分層與藥物衛教寫進同一份處遇計畫。",
    tags: ["depression", "cbt", "antidepressants", "case-formulation"],
    status: "peer-reviewed",
    evidence: "expert-consensus",
    updatedAt: "2026-08-14",
    readingMinutes: 14,
    authors: ["NeuroWeb 個案研討組"],
    reviewers: ["臨床心理諮詢席", "精神醫學諮詢席"],
    blocks: [
      caseDisclaimer,
      {
        type: "h2",
        id: "present",
        text: "呈現",
      },
      {
        type: "p",
        text: "40 歲受僱專業者，近三個月情緒低落、興趣下降、早醒、食欲減、自我批評增加。PHQ-9 為高度區間。否認目前有計畫與準備，但承認「如果一直這樣，活著沒意義」。無精神病特徵，無躁症史。家族有憂鬱症史。飲酒每週兩次，近期增加。",
      },
      {
        type: "h2",
        id: "formulation",
        text: "概念化",
      },
      {
        type: "p",
        text: "易感為高自我要求與「求助＝無能」的中介信念；誘發為績效考核與睡眠崩壞；維持為反芻、取消社交、週末補班與酒精助眠。認知三角清楚：自我（我是團隊的漏洞）、世界（考核只罰人）、未來（職涯已經結束）。",
      },
      {
        type: "h2",
        id: "plan",
        text: "處遇計畫",
      },
      {
        type: "ol",
        items: [
          "風險：每次會談掃描意念、計畫、保護因子；與個案共寫若惡化時的聯絡步驟。",
          "醫學：由精神科評估 SSRI 適應與監測；衛教起效時間、腸胃與焦慮短暫升高、酒精。",
          "CBT：先行為啟動（可完成的 20 分鐘步行＋一通朋友電話），再做自動思考紀錄。",
          "睡眠：刺激控制原則，停止把床當工作桌。",
          "測量：每週 PHQ-9 與功能目標（出勤、照顧小孩的一段遊戲）。",
        ],
      },
      {
        type: "callout",
        variant: "clinical",
        title: "跨專業一句話",
        text: "心理師若觀察到靜坐不能或突然加重的內在緊張，應回饋處方者，避免被寫成「CBT 做不下去」。理論背景見[認知三角](/models/cognitive-triad)與[合併治療回顧](/reviews/combined-treatment-depression)。",
      },
    ],
  },
  {
    slug: "emotion-dysregulation-dbt",
    pillar: "cases",
    title: "情緒失調與自我傷害風險：DBT 取向路徑",
    englishTitle: "Emotion Dysregulation: A DBT-Informed Pathway",
    summary:
      "以連鎖分析示範如何處理治療干擾行為，並在沒有完整 DBT 團隊時仍守住倫理底線。",
    tags: ["dbt", "personality", "case-formulation", "cbt"],
    status: "published",
    evidence: "expert-consensus",
    updatedAt: "2026-07-30",
    readingMinutes: 12,
    authors: ["NeuroWeb 個案研討組"],
    reviewers: ["臨床心理諮詢席"],
    blocks: [
      caseDisclaimer,
      {
        type: "h2",
        id: "present",
        text: "呈現",
      },
      {
        type: "p",
        text: "24 歲研究生，反覆在衝突後自我傷害，情緒從激怒到空虛可在一小時內翻轉。害怕被拋棄，深夜大量傳訊後又羞愧刪除。過去有兩次過量服藥。目前否認立即計畫，但表示「只有痛才能停下來」。",
      },
      {
        type: "h2",
        id: "chain",
        text: "連鎖分析（一次事件）",
      },
      {
        type: "ol",
        items: [
          "脆弱性：睡眠 4 小時、月經前、論文被退回。",
          "提示：導師已讀不回。",
          "連結：災難化「我被放棄了」→胸悶→查社群→更空。",
          "問題行為：淺層自傷。",
          "後果：短暫麻木，接著恥辱，隔天取消會談。",
        ],
      },
      {
        type: "h2",
        id: "plan",
        text: "路徑",
      },
      {
        type: "ul",
        items: [
          "目標層級：先減自傷與不出席，再做人際效能。",
          "技能：痛苦耐受（溫度、強烈運動、配對肌肉放鬆）放在衝動高峰前 10 分鐘。",
          "治療契約：取消會談的補連絡方式；治療師使用諮詢而非單獨扛風險。",
          "若機構沒有完整 DBT：誠實告知能提供的是 DBT 知情治療，並評估轉介。",
        ],
      },
      {
        type: "p",
        text: "模型見[DBT 專題](/therapy/dbt)。此類個案常被過早做深層創傷再處理；在安全與技能不足時，應抵制「一次挖完」的誘惑。",
      },
    ],
  },
  {
    slug: "ptsd-emdr-phased",
    pillar: "cases",
    title: "PTSD：穩定化之後的 EMDR 階段性處遇",
    englishTitle: "PTSD: Phased Care Before EMDR Reprocessing",
    summary:
      "展示創傷知情評估、穩定化與目標記憶選擇，避免在資源不足時直接進入減敏。",
    tags: ["ptsd", "emdr", "case-formulation", "anxiety"],
    status: "peer-reviewed",
    evidence: "expert-consensus",
    updatedAt: "2026-08-02",
    readingMinutes: 12,
    authors: ["NeuroWeb 個案研討組"],
    reviewers: ["臨床心理諮詢席"],
    blocks: [
      caseDisclaimer,
      {
        type: "h2",
        id: "present",
        text: "呈現",
      },
      {
        type: "p",
        text: "33 歲，交通事故兩年後仍有侵入畫面、開車迴避、易驚與易怒。夢魘每週數次。酒精用來入睡。PCL-5 高於常見切點。無解離性身份問題，但有短暫「當下不在」的經驗。工作需要開車，因而陷入失能與自我責備。",
      },
      {
        type: "h2",
        id: "phased",
        text: "階段",
      },
      {
        type: "ol",
        items: [
          "安全與物質：酒精與睡眠先處理，否則再處理會被麻醉與戒斷干擾。",
          "穩定化：定向技巧、安全位置、窗內耐受練習。",
          "心理教育：侵入不是「我變弱」，而是未消化記憶的再激活。",
          "目標選擇：先處理較短、有清楚畫面的事故記憶，而非一生的失敗敘事。",
          "EMDR 第 3–7 階段僅在能維持雙腳在治療室、能使用停止訊號時進行。",
          "整合：漸進開車作業與威脅評估修正並行。",
        ],
      },
      {
        type: "p",
        text: "理論見[EMDR](/therapy/emdr)與[創傷證據回顧](/reviews/trauma-informed-emdr-evidence)。若夜間惡夢與酒精同時惡化，應暫停再處理並回到穩定化，這不是失敗而是劑量管理。",
      },
    ],
  },
];
