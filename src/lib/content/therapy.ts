import type { Article } from "../types";

export const therapyArticles: Article[] = [
  {
    slug: "cbt",
    pillar: "therapy",
    title: "認知行為治療深度專題：從模型到華語現場",
    englishTitle: "Cognitive Behavioral Therapy: A Depth Primer",
    summary:
      "本站深度內容測試篇。完整展開 CBT 的個案概念化、認知技術、行為實驗、結構與華語文化適應，並標出與藥物、第三波治療的接口。",
    tags: ["cbt", "depression", "anxiety", "case-formulation", "culture", "ebm"],
    status: "peer-reviewed",
    evidence: "systematic-review",
    updatedAt: "2026-08-15",
    readingMinutes: 22,
    authors: ["NeuroWeb 心理治療編輯組"],
    reviewers: ["臨床心理諮詢席", "精神醫學諮詢席"],
    blocks: [
      {
        type: "callout",
        variant: "info",
        title: "深度內容測試",
        text: "本篇是 NeuroWeb 的旗艦示範：用單一療法把「理論—評估—技術—證據—文化—跨專業」走完一遍，作為後續 DBT、EMDR、ACT 與藥理條目的寫作標尺。",
      },
      {
        type: "h2",
        id: "definition",
        text: "CBT 是什麼（以及不是什麼）",
      },
      {
        type: "p",
        text: "認知行為治療（Cognitive Behavioral Therapy, CBT）是一組以**學習理論**與**訊息處理**為基礎的心理治療。它假設：情緒與行為受到當下解釋、注意與迴避模式影響；這些模式可以被觀察、檢驗與練習改變。CBT 不是「正向思考」，也不是只填表格。有效的 CBT 是**個別化的功能分析**加上有結構的實驗。",
      },
      {
        type: "p",
        text: "歷史上，行為治療處理制約與暴露；Beck 與 Ellis 把認知層帶進來；近二十年的歷程研究則顯示：行為改變、認知改變、治療關係與家庭作業完成度都可能是中介。實務上應避免門派自我設限——同一個案可能需要行為啟動、暴露、技能訓練與基模工作的不同比例。",
      },
      {
        type: "h2",
        id: "formulation",
        text: "個案概念化：五層可以寫在一頁",
      },
      {
        type: "p",
        text: "建議用一頁紙（或電子模板）回答五個問題，而不是堆疊病史。這五層直接對應[認知三角](/models/cognitive-triad)與[威脅評估](/models/threat-appraisal)。",
      },
      {
        type: "ol",
        items: [
          "**易感**：氣質、早年經驗、神經多樣性、文化腳本（例如孝道、面子、成就）。",
          "**誘發**：失落、疾病、睡眠崩壞、人際拒絕、物質、產後或季節因素。",
          "**維持**：反芻、安全行為、社交退縮、睡眠週期後移、人際增強。",
          "**保護**：技能、關係、價值、可運用的行為活化起點。",
          "**假設**：若 X 信念／迴避成立，則會看到 Y 行為與 Z 情緒；若介入成功，兩週內應出現可觀察的改變。",
        ],
      },
      {
        type: "callout",
        variant: "clinical",
        title: "可檢驗的概念化",
        text: "寫「低自尊」幾乎無法引導技術選擇。改寫成「當被上司改稿時，自動思考是『我立刻會被換掉』，接著檢查郵件三小時並取消週末計畫」。後者才能設計行為實驗。",
      },
      {
        type: "h2",
        id: "structure",
        text: "會談結構",
      },
      {
        type: "ul",
        items: [
          "情緒與風險快速掃描（含自殺、他傷、物質）。",
          "議程共構：一次只深做一到兩個目標。",
          "回顧家庭作業：沒做完是資料，不是品德。",
          "當次工作：認知、行為或技能，擇一為主。",
          "指派下週實驗，並預演障礙。",
          "回饋與摘要：讓個案用自己的話複述學習點。",
        ],
      },
      {
        type: "h2",
        id: "cognitive",
        text: "認知技術：從自動思考到信念",
      },
      {
        type: "p",
        text: "標準路徑是：捕捉情境—情緒—身體—念頭—行為，再做**證據檢驗**、**替代解釋**與**去災難化**。蘇格拉底提問的關鍵是好奇心而非盤問。對反芻型憂鬱，過早挑戰內容會變成一起反芻；此時應改用注意轉換、具體化問題解決，或限制反芻時段。",
      },
      {
        type: "table",
        headers: ["層次", "技術", "常見錯誤"],
        rows: [
          ["自動思考", "想法紀錄、機率估計、雙欄證據", "變成辯論；忽略情緒強度"],
          ["中介信念", "優缺點分析、規則改寫", "在急性危機時硬挖核心信念"],
          ["核心信念", "歷史檢驗、正向資料日誌、意象改寫", "沒有行為證據就只在語言層翻轉"],
        ],
      },
      {
        type: "h2",
        id: "behavioral",
        text: "行為實驗與暴露",
      },
      {
        type: "p",
        text: "行為實驗問的是「這個預測準不準」；暴露問的是「我能否在焦慮中學習新的安全」。兩者都要拿掉安全行為。憂鬱的行為啟動（behavioural activation）則先做功能分析：什麼活動被正增強、什麼被憂鬱與迴避懲罰，再排程有價值而可完成的小步。",
      },
      {
        type: "ol",
        items: [
          "寫下預測（最壞、最可能、可忍受的不適分數）。",
          "設計最小足夠的實驗，明確允許／禁止哪些安全行為。",
          "執行並記錄實際結果與可忍受性。",
          "更新信念百分比，而不是只寫「還好」。",
        ],
      },
      {
        type: "h2",
        id: "evidence",
        text: "證據位置",
      },
      {
        type: "p",
        text: "對成人憂鬱與多種焦慮疾患，CBT 是指引中反覆出現的第一線心理治療。效果量因疾患、嚴重度、治療師忠誠度與家庭作業而異。對中重度憂鬱，[合併藥物與心理治療](/reviews/combined-treatment-depression)常優於單一治療。CBT 對思覺失調症的妄想困擾、失眠（CBT-I）與慢性疼痛也有特定協議，不可把憂鬱協議原封搬過去。",
      },
      {
        type: "h2",
        id: "culture",
        text: "華語現場的適應",
      },
      {
        type: "ul",
        items: [
          "家庭作業需考慮工時、孝親與「給自己時間＝自私」的信念。",
          "情緒詞彙可能較身體化；可從身體定位再連回認知。",
          "面子使「記錄失敗念頭」變成羞愧作業——改為「實驗日誌」常較可接受。",
          "家庭成員可能是維持因子也是資源；概念化要畫出循環，而不是把家人寫成阻力。",
        ],
      },
      {
        type: "h2",
        id: "interfaces",
        text: "與其他取向及神經科學的接口",
      },
      {
        type: "p",
        text: "當情緒失調與自我傷害成為主軸，應考慮轉向或整合[DBT](/therapy/dbt)。當創傷記憶以侵入與軀體化主導，[EMDR](/therapy/emdr)或創傷聚焦 CBT 可能更對題。當問題是經驗迴避與價值脫節，[ACT](/therapy/act)提供另一套語言。藥物可改變喚起與睡眠，使實驗做得進去；[TMS](/therapy/nibs-tms)則是難治型憂鬱的另一條生理路徑。CBT 並不排斥腦，它是改變網絡的行為接口。",
      },
      {
        type: "quote",
        text: "好的 CBT 結束時，個案帶走的不是治療師的解釋，而是一套自己能再做一次的方法。",
      },
    ],
  },
  {
    slug: "dbt",
    pillar: "therapy",
    title: "辯證行為治療：辯證、技能與高風險照護",
    englishTitle: "Dialectical Behavior Therapy",
    summary:
      "介紹 Linehan 的辯證架構、四個技能模組、階段治療與團隊諮詢，並說明適用於情緒失調與自殺風險的照護邏輯。",
    tags: ["dbt", "personality", "case-formulation", "cbt"],
    status: "peer-reviewed",
    evidence: "rct",
    updatedAt: "2026-07-22",
    readingMinutes: 13,
    authors: ["NeuroWeb 心理治療編輯組"],
    reviewers: ["臨床心理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "辯證行為治療（DBT）起源於對慢性自殺與情緒失調個案的行為治療改裝。它的哲學核心是**辯證**：同時做**接納**與**改變**。生物社會模型主張：高情緒敏感的氣質，遇上使情緒被否定的環境，會讓技能發展受阻，並以問題行為調節極度痛苦。",
      },
      {
        type: "h2",
        id: "modes",
        text: "標準模式不是「上技能課」而已",
      },
      {
        type: "ul",
        items: [
          "個別治療：層級化目標（生命風險 → 治療干擾 → 生活品質）。",
          "技能訓練團體：正念、人際效能、情緒調節、痛苦耐受。",
          "電話教練：在衝動高峰把技能用出來。",
          "治療師諮詢團隊：防止治療師被耗竭或滑入極端。",
        ],
      },
      {
        type: "h2",
        id: "skills",
        text: "四模組的臨床功能",
      },
      {
        type: "table",
        headers: ["模組", "要解決的問題", "與認知模型的關係"],
        rows: [
          ["正念", "被情緒淹沒、解離、判斷性自我攻擊", "訓練注意的定向與回到當下"],
          ["痛苦耐受", "自傷、物質、爆炸性衝突", "在無法立刻解題時抑制傷害行為"],
          ["情緒調節", "情緒快速升高且恢復慢", "命名、減少脆弱性、反向行動"],
          ["人際效能", "被拒絕敏感、討好或攻擊", "目標、關係與自尊三變數平衡"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "風險",
        text: "DBT 不是鼓勵宣洩傷害行為。行為分析（連鎖分析）要找出提示、脆弱性、連結與後果。沒有團隊與危機流程的「DBT 風」技能教學，不足以稱為完整 DBT。",
      },
      {
        type: "p",
        text: "對不符合人格疾患診斷、但有明顯情緒失調的個案，技能訓練仍可能有幫助。教學個案見[情緒失調的 DBT 路徑](/cases/emotion-dysregulation-dbt)。",
      },
    ],
  },
  {
    slug: "emdr",
    pillar: "therapy",
    title: "EMDR 與適應性訊息處理模型",
    englishTitle: "EMDR and the Adaptive Information Processing Model",
    summary:
      "說明 Shapiro 的 AIP 模型、標準八個階段，以及雙側刺激在創傷記憶再處理中的定位與證據爭議。",
    tags: ["emdr", "ptsd", "neuroplasticity", "case-formulation"],
    status: "peer-reviewed",
    evidence: "systematic-review",
    updatedAt: "2026-08-01",
    readingMinutes: 12,
    authors: ["NeuroWeb 創傷照護編輯組"],
    reviewers: ["臨床心理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "眼動脫敏與歷程處理（EMDR）以**適應性訊息處理（AIP）**為理論：創傷記憶可能以未消化的形式儲存，維持侵入、迴避與高警覺。治療透過結構化程序，在雙側刺激（眼動、輕拍或音調）下讓記憶進入再處理，直到困擾下降、信念更新。",
      },
      {
        type: "h2",
        id: "phases",
        text: "八個階段（務必依序）",
      },
      {
        type: "ol",
        items: [
          "病史與治療計畫：目標記憶、資源、解離風險。",
          "準備：穩定化、安全位置、知情同意。",
          "評估：畫面、負向／正向認知、情緒、身體、SUD 與 VoC。",
          "減敏：雙側刺激與自由聯想式再處理。",
          "安植：強化正向認知。",
          "身體掃描。",
          "結束：完整性與穩定。",
          "再評估。",
        ],
      },
      {
        type: "callout",
        variant: "clinical",
        title: "穩定化先於再處理",
        text: "對複雜創傷、明顯解離或當下安全不足的個案，過早進入第 4 階段可能造成失穩。階段性創傷治療與[創傷知情回顧](/reviews/trauma-informed-emdr-evidence)必須一起讀。",
      },
      {
        type: "p",
        text: "眼動是否為必要成分仍有研究辯論；若干試驗顯示其他雙側刺激或暴露成分也可能有效。臨床上更應抓住：**記憶的結構化再處理、雙重注意力，以及足夠的窗口耐受**。教學流程見[PTSD 階段性處遇](/cases/ptsd-emdr-phased)。",
      },
    ],
  },
  {
    slug: "act",
    pillar: "therapy",
    title: "接受與承諾治療：心理彈性六角模型",
    englishTitle: "Acceptance and Commitment Therapy",
    summary:
      "以六個歷程說明心理彈性，強調經驗迴避、認知解離與價值導向行動，並與 CBT 的異同並列。",
    tags: ["act", "anxiety", "depression", "cbt"],
    status: "published",
    evidence: "systematic-review",
    updatedAt: "2026-06-18",
    readingMinutes: 11,
    authors: ["NeuroWeb 心理治療編輯組"],
    reviewers: ["臨床心理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "接受與承諾治療（ACT）把痛苦的核心機制看成**經驗迴避**與**認知融合**：人被念頭的字面內容黏住，並把人生窄化成「不要再有這種感覺」。治療目標不是消除症狀，而是增加**心理彈性（psychological flexibility）**：在此時此地，帶著私密經驗，做對價值重要的事。",
      },
      {
        type: "table",
        headers: ["六角歷程", "僵化時的樣子", "彈性時的樣子"],
        rows: [
          ["接納", "壓抑、麻木、戰鬥情緒", "允許感覺在場"],
          ["解離", "被「我就是失敗」黏住", "看見念頭是念頭"],
          ["當下", "反芻過去、預支未來", "回到感官與任務"],
          ["觀察的我", "完全等同於病識標籤", "能從更穩定的視角看經驗"],
          ["價值", "只剩應該與面子", "能說出在乎什麼"],
          ["承諾行動", "等感覺好了再生活", "小步而可重複的行為"],
        ],
      },
      {
        type: "p",
        text: "與傳統 CBT 的差異常被誇大。兩者都做行為改變；ACT 較少直接打真假值，較多改變人與想法的關係。對華語個案，「接受」易被聽成認命，需翻譯成「允許感覺在場，同時行動」，而非放棄爭取。",
      },
    ],
  },
  {
    slug: "neurofeedback",
    pillar: "therapy",
    title: "神經生理回饋與生物回饋",
    englishTitle: "Neurofeedback and Biofeedback",
    summary:
      "說明 EEG 神經回饋與周邊生理回饋的學習原理、適應症證據的強弱，以及臨床上應如何知情同意。",
    tags: ["neurofeedback", "neuroplasticity", "adhd", "anxiety"],
    status: "published",
    evidence: "observational",
    updatedAt: "2026-05-08",
    readingMinutes: 10,
    authors: ["NeuroWeb 神經介入編輯組"],
    reviewers: ["臨床神經生理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "生物回饋讓個案即時看到呼吸、心率變異、肌電或皮溫，從而學習自主調節。神經生理回饋（neurofeedback）則以 EEG 或其他腦訊號為回饋，訓練特定頻率或網絡指標。原理上都是**操作性制約加上神經可塑性**，但協定異質性極高。",
      },
      {
        type: "ul",
        items: [
          "相對較常被討論的領域：ADHD、焦慮相關生理過度喚起、偏頭痛、部分失眠。",
          "限制：盲法困難、安慰劑與非特異性注意力訓練效應、設備與師資品質不一。",
          "不應把商業化「腦波優化」包裝成已確立的第一線治療。",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "知情同意要講的話",
        text: "說明證據等級、需要的次數、費用、與現有藥物／心理治療如何並行，以及何時該停止（無功能改善）。回饋訓練不能取代風險評估。",
      },
    ],
  },
  {
    slug: "nibs-tms",
    pillar: "therapy",
    title: "非侵入性腦刺激：以 TMS 為核心",
    englishTitle: "Non-invasive Brain Stimulation and TMS",
    summary:
      "介紹 rTMS、iTBS 的原理、難治型憂鬱的證據位置、安全篩檢與多專業協作。",
    tags: ["tms", "neuroplasticity", "depression", "ebm"],
    status: "peer-reviewed",
    evidence: "rct",
    updatedAt: "2026-08-09",
    readingMinutes: 13,
    authors: ["NeuroWeb 神經介入編輯組"],
    reviewers: ["精神醫學諮詢席"],
    blocks: [
      {
        type: "p",
        text: "非侵入性腦刺激（NIBS）包括經顱磁刺激（TMS／rTMS）、經顱電刺激（tDCS 等）與相關技術。TMS 以快速變化的磁場在皮質誘導電流，調節局部興奮性與網絡連結。高頻或間歇 theta burst（iTBS）刺激左側背外側前額葉，是難治型憂鬱最被討論的協議之一。",
      },
      {
        type: "h2",
        id: "evidence",
        text: "證據與定位",
      },
      {
        type: "p",
        text: "多項隨機對照與指引支持 rTMS 作為藥物反應不足之憂鬱症的選項之一。效果因線圈定位、劑量（脈衝數、休息運動閾值百分比）、治療次數與共病而異。它不是電痙攣治療（ECT）的全面替代；對精神病性憂鬱、緊急性自殺風險，ECT 仍可能更適切。延伸閱讀：[rTMS 與難治型憂鬱](/reviews/rtms-trd-update)。",
      },
      {
        type: "ul",
        items: [
          "安全篩檢：癲癇史、金屬植入、藥物造成的癲癇閾值變化。",
          "常見不良：頭痛、頭皮不適；癲癇是罕見但需知情的風險。",
          "需與心理治療銜接，否則症狀減輕可能沒有行為網絡接住。",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "適應症外使用",
        text: "強迫症、聽幻覺、成癮等領域有研究，但協議與證據強度不同。臨床服務應清楚標示適應症層級，避免把實驗性協定當成常規。",
      },
    ],
  },
  {
    slug: "neuroplasticity",
    pillar: "therapy",
    title: "神經可塑性的臨床應用",
    englishTitle: "Clinical Applications of Neuroplasticity",
    summary:
      "把突觸可塑性、敏感期與經驗依賴重整，翻譯成心理治療、藥物、刺激與復健可以共同使用的語言。",
    tags: ["neuroplasticity", "cbt", "tms", "depression"],
    status: "published",
    evidence: "theoretical",
    updatedAt: "2026-07-01",
    readingMinutes: 11,
    authors: ["NeuroWeb 神經科學編輯組"],
    reviewers: ["臨床神經科學諮詢席"],
    blocks: [
      {
        type: "p",
        text: "神經可塑性是神經系統依經驗改變結構與功能的能力。臨床上有用的不是口號「大腦會改變」，而是：**改變需要重複、情緒顯著性、睡眠、以及錯誤後的再嘗試。** 長期增益（LTP）、突觸修剪、髓鞘化與網絡再權重，時間尺度從分鐘到年。",
      },
      {
        type: "table",
        headers: ["介入", "可能的可塑性窗口", "臨床含義"],
        rows: [
          ["心理治療練習", "會談中的預測誤差 + 會談外重複", "家庭作業不是附加，是劑量"],
          ["抗憂鬱劑", "單胺調節後的 BDNF／突觸相關改變", "需時間；與學習並用可能相加"],
          ["rTMS／iTBS", "局部興奮性與網絡連線", "若無行為重整，效果可能較難維持"],
          ["睡眠與運動", "固化與單胺—營養因子環境", "是治療的一部分而非生活建議附錄"],
        ],
      },
      {
        type: "p",
        text: "發展上，敏感期意味著早期介入對感覺與語言網絡影響較大；成人仍保有可觀的經驗依賴可塑性，只是代價是需要更結構化的練習。這為[CBT 行為實驗](/therapy/cbt)與[暴露學習](/models/threat-appraisal)提供神經科學語言，而不必把治療還原成單一分子。",
      },
    ],
  },
];
