import type { Article } from "../types";

export const psychiatryArticles: Article[] = [
  {
    slug: "nosology-dsm-icd",
    pillar: "psychiatry",
    title: "精神疾病分類：DSM-5-TR 與 ICD-11 的臨床邏輯",
    englishTitle: "Psychiatric Nosology: DSM-5-TR and ICD-11",
    summary:
      "說明兩套分類系統的定位、向度化趨勢與臨床使用原則，並強調官方診斷標準文本的著作權與正確引用。",
    tags: ["nosology", "dsm", "icd", "ebm"],
    status: "peer-reviewed",
    evidence: "expert-consensus",
    updatedAt: "2026-08-05",
    readingMinutes: 13,
    authors: ["NeuroWeb 精神醫學編輯組"],
    reviewers: ["精神醫學諮詢席"],
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: "官方文本",
        text: "DSM-5-TR 與 ICD-11 的診斷準則受著作權保護。本站提供分類邏輯、臨床更新方向與使用注意事項，**不重製官方準則條文**。實際診斷請以 APA、WHO 出版品及所屬機構授權資源為準。",
      },
      {
        type: "h2",
        id: "two-systems",
        text: "兩套系統，兩種工作方式",
      },
      {
        type: "p",
        text: "**DSM-5-TR** 是美國精神醫學學會的臨床與研究分類，強調操作性描述、共病記錄與文化表述。**ICD-11** 是 WHO 的國際疾病分類，服務統計、給付與全球公衛，並在精神與行為單元引入較明顯的向度與臨床指引風格。許多實務現場會同時碰到兩者：研究用 DSM 語言，病歷與保險用 ICD 編碼。",
      },
      {
        type: "table",
        headers: ["面向", "DSM-5-TR", "ICD-11"],
        rows: [
          ["主要使用者", "臨床、教學、研究", "健康資訊、統計、國際比較"],
          ["更新邏輯", "文本修訂（Text Revision）補充病程與文化", "持續線上維護與編碼結構"],
          ["向度化", "嚴重度說明、部分量表建議", "部分疾患採邊界更彈性的描述"],
          ["華語現場", "訓練與期刊常用", "健保／死因／國際報告常用"],
        ],
      },
      {
        type: "h2",
        id: "updates",
        text: "臨床更新的讀法",
      },
      {
        type: "ul",
        items: [
          "TR 版本強化延長哀傷、自殺行為記錄、種族與歧視相關壓力的文化討論，而不是全面改寫疾患名單。",
          "ICD-11 將部分過往「排除」關係鬆綁，使共病記錄更貼近真實個案。",
          "分類改變不等于病理機轉已闡明；nosology 仍是**溝通公約**，不是腦的地圖。",
        ],
      },
      {
        type: "h2",
        id: "practice",
        text: "負責任的使用",
      },
      {
        type: "p",
        text: "診斷應來自臨床會談、心智狀態檢查、功能損害、病程與鑑別，而不是量表切點或單次觀察。對華語個案，需注意身體化表達、家庭決策結構，以及污名造成的少報。若要跨領域檢索，本站文章可同時標記疾患與取向，例如[抗精神病藥物受體圖譜](/psychiatry/antipsychotics)會與「思覺失調症」標籤並行。",
      },
    ],
  },
  {
    slug: "antidepressants",
    pillar: "psychiatry",
    title: "抗憂鬱劑的受體結合特性與臨床選擇",
    englishTitle: "Antidepressants: Receptor Binding Profiles",
    summary:
      "以作用機轉與受體／轉運體特性整理常用抗憂鬱劑類別，協助把「副作用剖面」轉成可溝通的選藥邏輯。",
    tags: ["antidepressants", "neuropharmacology", "depression", "anxiety"],
    status: "peer-reviewed",
    evidence: "expert-consensus",
    updatedAt: "2026-08-12",
    readingMinutes: 16,
    authors: ["NeuroWeb 精神藥理編輯組"],
    reviewers: ["精神藥理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "抗憂鬱劑的教學不應停在「增加血清素」。臨床選擇更常取決於**轉運體親和力、次要受體、藥物動力學、共病與耐受性**。單胺假說是歷史起點，不是完整病理；神經可塑性、BDNF 與網絡重整，提供了為何治療常需數週才出現功能改善的部分解釋。見[神經可塑性專題](/therapy/neuroplasticity)。",
      },
      {
        type: "h2",
        id: "classes",
        text: "類別與關鍵結合特性",
      },
      {
        type: "table",
        caption: "教學用簡表。個別藥物差異大，請查閱藥品說明與互動資料庫。",
        headers: ["類別", "主要標的", "常見臨床後果"],
        rows: [
          ["SSRI", "SERT 抑制", "第一線；腸胃不適、性功能、焦慮短暫升高、停藥症候群"],
          ["SNRI", "SERT + NET", "疼痛共病、部分個案血壓上升"],
          ["NDRI（安非他酮）", "DAT／NET（相對弱）", "較少性功能影響；降低癲癇閾值；對焦慮型個案不一定友善"],
          ["NaSSA（米氮平）", "α2 拮抗、5-HT2/3、H1", "鎮靜與食慾／體重；可減少部分性功能抱怨"],
          ["SARI（曲唑酮等）", "5-HT2A 與 SERT（劑量依賴）", "低劑量常用於睡眠；姿勢性低血壓"],
          ["TCA", "SERT/NET + M1/H1/α1", "抗膽鹼、鎮靜、心臟傳導；中毒窗口窄"],
          ["MAOI", "MAO-A/B 抑制", "飲食與藥物交互作用；特定非典型憂鬱／治療阻抗情境"],
        ],
      },
      {
        type: "h2",
        id: "receptors",
        text: "次要受體為什麼重要",
      },
      {
        type: "ul",
        items: [
          "**H1 拮抗**：鎮靜、體重增加。",
          "**M1 拮抗**：口乾、便祕、認知模糊、尿滯留。",
          "**α1 拮抗**：姿勢性低血壓。",
          "**5-HT2C／5-HT3**：與食慾、噁心、部分焦慮反應有關。",
        ],
      },
      {
        type: "p",
        text: "例如：同樣「抗憂鬱」，米氮平的 H1／5-HT2 剖面與 SSRI 完全不同；安非他酮幾乎不走 SERT，因此對性功能與情感遲鈍的主訴可能較友善，但對飲食疾患或癲癇史需更謹慎。選藥是**匹配剖面**，不是比較誰比較強。",
      },
      {
        type: "callout",
        variant: "clinical",
        title: "安全訊號",
        text: "年輕族群的自殺意念監測、血清素症候群、低鈉血症（尤其年長與併用利尿劑）、出血風險（併用 NSAID／抗凝血）、以及停藥症候群，應寫進衛教而非只寫在同意書末段。劑量與適應症必須個別化，本站不提供處方公式。",
      },
      {
        type: "p",
        text: "合併心理治療時，藥物常先降低強度，讓[認知重組與行為啟動](/therapy/cbt)進得去。文獻討論見[憂鬱症合併治療回顧](/reviews/combined-treatment-depression)。",
      },
    ],
  },
  {
    slug: "antipsychotics",
    pillar: "psychiatry",
    title: "抗精神病藥物的受體圖譜",
    englishTitle: "Antipsychotics: Receptor Binding Profiles",
    summary:
      "以 D2、5-HT2A 與其他受體說明第一代與第二代抗精神病藥的療效與副作用權衡，並標出氯氮平在治療阻抗中的位置。",
    tags: ["antipsychotics", "neuropharmacology", "schizophrenia", "bipolar"],
    status: "peer-reviewed",
    evidence: "expert-consensus",
    updatedAt: "2026-08-08",
    readingMinutes: 15,
    authors: ["NeuroWeb 精神藥理編輯組"],
    reviewers: ["精神藥理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "抗精神病藥的共同核心是對**多巴胺 D2 受體**的作用（拮抗或部分促效），這與陽性症狀的緩解有關，也與錐體外徑症狀（EPS）與泌乳素上升有關。第二代藥物多加上**5-HT2A** 等特性，代謝與鎮靜剖面因此大幅分化。把藥物想成「強／弱」不如想成**受體指紋**。",
      },
      {
        type: "table",
        caption: "高度簡化的教學指紋，非完整 Ki 表。",
        headers: ["藥物／類型", "關鍵受體特徵", "臨床權衡"],
        rows: [
          ["第一代（如 haloperidol）", "高 D2 佔有", "EPS、遲發性運動障礙風險較受關注"],
          ["risperidone／paliperidone", "D2 + 5-HT2A，α1", "泌乳素、劑量依賴 EPS"],
          ["olanzapine", "5-HT2A/D2、H1、M", "代謝症候群、鎮靜"],
          ["quetiapine", "H1、α1、5-HT2A；D2 相對較鬆", "鎮靜、低血壓；需注意適應症與劑量脈絡"],
          ["aripiprazole 等部分促效", "D2 部分促效 + 5-HT1A/2A", "靜坐不能；代謝相對較輕者常見"],
          ["clozapine", "多受體、D2 相對較鬆", "治療阻抗思覺失調之關鍵選項；需血液監測"],
        ],
      },
      {
        type: "h2",
        id: "eps-metabolic",
        text: "兩組必須分開追蹤的代價",
      },
      {
        type: "p",
        text: "EPS、靜坐不能與遲發性運動障礙是神經運動代價；體重、血糖、血脂與 QT 是代謝與心臟代價。部分促效劑並非「沒有副作用」，靜坐不能可能被誤認為焦慮惡化。氯氮平對治療阻抗與自殺風險有特殊地位，但也有粒细胞缺乏、心肌炎、便秘導致腸阻塞等必須系統監測的風險。",
      },
      {
        type: "callout",
        variant: "warning",
        title: "惡性症候群與腸胃低動",
        text: "NMS 是急症。氯氮平相關的嚴重便秘同樣可以致命。監測計畫應寫進處遇，而不是只在出現後補救。",
      },
      {
        type: "p",
        text: "對雙相躁狂或憂鬱的使用，適應症與證據強度因藥物而異，不可由思覺失調症的經驗直接外推。認知缺損與陰性症狀對現有 D2 策略反應有限，需結合心理社會復健與[執行功能](/models/executive-functions)導向的功能訓練。",
      },
    ],
  },
  {
    slug: "mood-stabilizers",
    pillar: "psychiatry",
    title: "情緒穩定劑的作用機轉",
    englishTitle: "Mood Stabilizers: Mechanisms of Action",
    summary:
      "整理鋰鹽、丙戊酸、拉莫三嗪與部分非典型抗精神病藥在雙相情緒障礙中的機轉假說與臨床分工。",
    tags: ["mood-stabilizers", "neuropharmacology", "bipolar", "depression"],
    status: "published",
    evidence: "expert-consensus",
    updatedAt: "2026-07-15",
    readingMinutes: 12,
    authors: ["NeuroWeb 精神藥理編輯組"],
    reviewers: ["情感疾患醫學諮詢席"],
    blocks: [
      {
        type: "p",
        text: "「情緒穩定劑」不是單一受體類別，而是**臨床功能標籤**：減少躁狂／輕躁復發、治療急性躁狂，或預防雙相憂鬱。鋰鹽仍是證據最深厚的核心藥物之一；抗癲癇藥與部分抗精神病藥則依發作極性與耐受性進入組合。",
      },
      {
        type: "table",
        headers: ["藥物", "常被討論的機轉", "臨床印象（教學）"],
        rows: [
          ["鋰鹽", "肌醇循環、GSK-3、神經保護相關假說", "防復發與自殺風險降低的關鍵角色；治療窗窄"],
          ["丙戊酸", "Na 通道、GABA 相關、表觀遺傳效應", "混合特徵／快速循環等情境常被考慮；注意致畸"],
          ["拉莫三嗪", "電壓閘 Na 通道、減少麩胺酸釋放", "雙相憂鬱預防角色較受重視；皮疹／SJS 需緩慢滴定"],
          ["卡馬西平／草酸卡馬西平", "Na 通道；強酶誘導（卡馬西平）", "交互作用多；HLA 相關皮疹風險需依族群評估"],
        ],
      },
      {
        type: "callout",
        variant: "clinical",
        title: "監測不是附加項",
        text: "鋰鹽需腎功能、甲狀腺、鈣與血中濃度；丙戊酸需肝功能、血小板與妊娠預防；拉莫三嗪任何皮疹都要嚴肅對待。機轉再漂亮，也無法取代監測流程。",
      },
      {
        type: "p",
        text: "心理教育、規律作息、物質使用與抗憂鬱劑可能誘發躁狂的風險，都屬於穩定化的一部分。藥物機轉必須接上生活節律，否則「穩定劑」只穩定了處方箋。",
      },
    ],
  },
  {
    slug: "pharmacokinetics",
    pillar: "psychiatry",
    title: "臨床藥物動力學與藥物交互作用",
    englishTitle: "Clinical Pharmacokinetics and Drug-Drug Interactions",
    summary:
      "以吸收、代謝、CYP450 與蛋白結合說明精神藥物交互作用的讀法，並提供可在會談中使用的提問架構。",
    tags: ["pharmacokinetics", "ddi", "neuropharmacology", "antidepressants"],
    status: "peer-reviewed",
    evidence: "expert-consensus",
    updatedAt: "2026-08-03",
    readingMinutes: 14,
    authors: ["NeuroWeb 精神藥理編輯組"],
    reviewers: ["精神藥理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "藥效學回答「藥物對腦做什麼」；**藥物動力學（PK）**回答「身體對藥物做什麼」。臨床上，很多「這藥對我無效／突然中毒」其實是吸收、代謝或交互作用的問題，而不是診斷開錯。",
      },
      {
        type: "h2",
        id: "adme",
        text: "ADME 的臨床讀法",
      },
      {
        type: "ul",
        items: [
          "**吸收**：胃腸手術、制酸劑、食物（如部分藥物需隨餐）會改變暴露。",
          "**分布**：脂溶性、蛋白結合、血腦障壁；低白蛋白時游離濃度可能上升。",
          "**代謝**：第一期 CYP450、第二期葡萄糖醛酸化；基因多型與誘導／抑制劑。",
          "**排除**：腎功能對鋰鹽、部分代謝物與水溶性藥物特別關鍵。",
        ],
      },
      {
        type: "h2",
        id: "cyp",
        text: "CYP450：先記路線，再查表",
      },
      {
        type: "table",
        headers: ["酶", "精神藥相關例子（教學）", "臨床提醒"],
        rows: [
          ["CYP2D6", "多種抗憂鬱劑、部分抗精神病藥", "強抑制劑可讓受質濃度上升；代謝型因人而異"],
          ["CYP3A4", "多種苯二氮平類、部分抗精神病藥", "葡萄柚、某些抗感染藥與抗癲癇藥影響大"],
          ["CYP1A2", "clozapine、olanzapine 等", "吸菸誘導；戒菸後濃度可能上升"],
          ["CYP2C19", "部分 SSRI、苯二氮平類", "東亞族群代謝型分布值得注意"],
        ],
      },
      {
        type: "p",
        text: "會談應固定問：處方藥、成藥、中草藥、咖啡因、菸、酒、葡萄柚，以及近期是否戒菸或開始抗生素。交互作用資料庫（如機構採用的正式 DDI 工具）應高於記憶。副作用管理見[副作用監測與安全管理](/psychiatry/side-effect-management)。",
      },
      {
        type: "callout",
        variant: "info",
        title: "半衰期與穩態",
        text: "評估療效或副作用，要對齊穩態時間與耐受發展，而不是第三天就宣判失敗。長半衰期藥物的停藥與轉換同樣需要時間表。",
      },
    ],
  },
  {
    slug: "side-effect-management",
    pillar: "psychiatry",
    title: "副作用監測與安全管理",
    englishTitle: "Adverse Effect Monitoring and Safety Management",
    summary:
      "把常見精神藥物不良反應整理成可執行的監測清單，強調共享決策與紅旗症狀的轉介門檻。",
    tags: ["neuropharmacology", "ddi", "pharmacokinetics", "ebm"],
    status: "published",
    evidence: "expert-consensus",
    updatedAt: "2026-06-22",
    readingMinutes: 11,
    authors: ["NeuroWeb 精神藥理編輯組"],
    reviewers: ["精神醫學諮詢席"],
    blocks: [
      {
        type: "p",
        text: "安全管理不是等病人抱怨。它是一套**基線—追蹤—門檻—行動**的循環。共享決策要把「為什麼值得冒險」講清楚，也要把「什麼情況半夜要急診」講清楚。",
      },
      {
        type: "table",
        headers: ["領域", "基線", "紅旗"],
        rows: [
          ["代謝", "體重、腰圍、血糖、血脂", "快速增重、高血糖症狀"],
          ["運動", "EPS／靜坐不能檢查", "嚴重肌僵、高熱、意識改變（NMS）"],
          ["心臟", "危險因子、必要時 ECG", "暈厥、嚴重心悸、QTc 相關警訊"],
          ["血液", "clozapine 依規範", "感染、喉嚨痛、發燒"],
          ["電解質", "年長、利尿劑、SSRI", "意識模糊、抽搐（低鈉）"],
          ["生殖／性健康", "月經、性功能、妊娠計畫", "未保護之妊娠、泌乳"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "本站不是處方工具",
        text: "監測項目與頻率依藥品、適應症、共病與機構指引而異。此表是教學架構，不能取代藥品說明書、實驗室閾值與值班流程。",
      },
      {
        type: "p",
        text: "心理師與其他非處方專業同樣需要識讀紅旗，以便在合併照護中即時回饋處方者。安全計畫應與[個案研討](/cases)中的風險評估同一語言。",
      },
    ],
  },
];
