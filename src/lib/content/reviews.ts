import type { Article } from "../types";

export const reviewArticles: Article[] = [
  {
    slug: "combined-treatment-depression",
    pillar: "reviews",
    title: "憂鬱症：心理治療與藥物治療合併的實證讀法",
    englishTitle: "Combined Psychotherapy and Pharmacotherapy for Depression",
    summary:
      "整理中重度憂鬱合併治療的指引邏輯、可能機制與實務分工，協助專業人員向個案解釋「為什麼兩邊都要」。",
    tags: ["depression", "cbt", "antidepressants", "ebm"],
    status: "peer-reviewed",
    evidence: "systematic-review",
    updatedAt: "2026-08-11",
    readingMinutes: 12,
    authors: ["NeuroWeb 文獻編輯組"],
    reviewers: ["精神醫學諮詢席", "臨床心理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "多數主要指引對**中重度憂鬱**採取相似立場：藥物與結構性心理治療（尤其 CBT、人際心理治療）皆為有效選項；當嚴重度高、復發多次、功能崩潰或單一治療反應不足，**合併**往往優於堅持單一路徑。STAR*D 等序列試驗提醒我們：真實世界的緩解常是逐步的，需要測量、調整與停留足夠久。",
      },
      {
        type: "h2",
        id: "why",
        text: "可能相加的機制",
      },
      {
        type: "ul",
        items: [
          "藥物先降低生理喚起、改善睡眠與食欲，使會談變得可執行。",
          "心理治療提供技能與環境改變，降低停藥後的復發風險。",
          "測量（PHQ-9 等）讓兩邊專業用同一語言討論反應、部分反應與無反應。",
        ],
      },
      {
        type: "h2",
        id: "practice",
        text: "臨床意義",
      },
      {
        type: "p",
        text: "合併不是兩份治療各做各的。處方者需要知道這週行為啟動是否卡在罪惡感；心理師需要知道是否剛調劑、是否有靜坐不能被誤認為焦慮。共享決策應呈現選擇：先藥、先心理、同時開始，以及各自的時間表。細節概念見[CBT 專題](/therapy/cbt)與[抗憂鬱劑剖面](/psychiatry/antidepressants)。",
      },
      {
        type: "callout",
        variant: "info",
        title: "閱讀文獻時",
        text: "注意樣本嚴重度、心理治療忠誠度、藥物劑量是否充分、以及「治療如常」控制組的內容。效果量會被這些設計選擇強烈影響。",
      },
    ],
  },
  {
    slug: "rtms-trd-update",
    pillar: "reviews",
    title: "難治型憂鬱與 rTMS：指引更新的臨床解讀",
    englishTitle: "rTMS for Treatment-Resistant Depression",
    summary:
      "解讀 rTMS／iTBS 在藥物反應不足憂鬱症中的位置、協議差異，以及如何與心理社會治療銜接。",
    tags: ["tms", "depression", "neuroplasticity", "ebm"],
    status: "peer-reviewed",
    evidence: "rct",
    updatedAt: "2026-08-09",
    readingMinutes: 11,
    authors: ["NeuroWeb 文獻編輯組"],
    reviewers: ["精神醫學諮詢席"],
    blocks: [
      {
        type: "p",
        text: "「難治型憂鬱（TRD）」定義並不一致，通常指對一定數量、劑量與時程的抗憂鬱試驗反應不足。rTMS 被多個證據基礎指引列為這一情境的非藥物選項。iTBS 以較短時間提供類似的脈衝模式，使臨床通量提高，但定位品質、運動閾值測定與療程完整性仍然決定結果。",
      },
      {
        type: "ul",
        items: [
          "適合討論 rTMS 的典型畫面：足夠藥物與心理治療嘗試後仍功能差、無緊急性 ECT 適應。",
          "需要預先處理的期待：不是一次治療、可能頭痛、需要密集到診。",
          "維持期如何做、何時重作，證據少於急性期，應誠實告知不確定性。",
        ],
      },
      {
        type: "p",
        text: "技術背景見[非侵入性腦刺激](/therapy/nibs-tms)。若個案同時有未處理的失眠、物質使用或嚴重心理社會危機，只加 TMS 很少足夠。",
      },
    ],
  },
  {
    slug: "trauma-informed-emdr-evidence",
    pillar: "reviews",
    title: "創傷知情照護與 EMDR 的證據等級",
    englishTitle: "Trauma-Informed Care and EMDR Evidence",
    summary:
      "區分創傷知情原則與特定創傷焦點治療，並說明 EMDR 在 PTSD 中的證據及其對複雜創傷的限制。",
    tags: ["emdr", "ptsd", "ebm", "case-formulation"],
    status: "published",
    evidence: "systematic-review",
    updatedAt: "2026-07-19",
    readingMinutes: 10,
    authors: ["NeuroWeb 文獻編輯組"],
    reviewers: ["臨床心理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "**創傷知情照護**是系統原則：安全、可信任、選擇、協作、賦權，並避免再創傷。它適用於所有服務，包括藥局與病房。**創傷焦點治療**（創傷聚焦 CBT、EMDR、延長暴露等）則是針對 PTSD 等疾患的特定協議。把前者當成後者，會讓需要再處理的個案只停留在穩定化；把後者當成前者，則可能在不安全的系統裡硬做暴露。",
      },
      {
        type: "p",
        text: "對成人 PTSD，EMDR 與創傷聚焦 CBT 在多個系統性回顧中都顯示中到大的效果。複雜創傷、解離疾患與持續暴力環境中的證據較薄，階段性模式仍是倫理上較穩妥的預設。見[EMDR 專題](/therapy/emdr)與[教學個案](/cases/ptsd-emdr-phased)。",
      },
      {
        type: "callout",
        variant: "clinical",
        title: "測量",
        text: "PCL-5 等量表可追蹤，但不可單獨定診斷。解離、物質使用與當下安全必須同時評估。",
      },
    ],
  },
];
