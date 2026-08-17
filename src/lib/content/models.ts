import type { Article } from "../types";

export const modelArticles: Article[] = [
  {
    slug: "attention",
    pillar: "models",
    title: "注意力的基礎認知機制",
    englishTitle: "Basic Cognitive Mechanisms of Attention",
    summary:
      "整理選擇性、持續性與執行性注意力的認知架構，並連結前額葉—頂葉網絡與臨床常見的注意力困擾。",
    tags: ["attention", "cognition", "adhd", "executive-function"],
    status: "peer-reviewed",
    evidence: "theoretical",
    updatedAt: "2026-08-01",
    readingMinutes: 12,
    authors: ["NeuroWeb 認知科學編輯組"],
    reviewers: ["臨床神經心理諮詢席"],
    blocks: [
      {
        type: "callout",
        variant: "info",
        title: "臨床定位",
        text: "注意力不是單一能力，而是可分離的控制系統。評估時應區辨警覺、定向與執行控制，避免把所有「專心不了」都歸因於單一診斷。",
      },
      {
        type: "h2",
        id: "components",
        text: "三個可操作的成分",
      },
      {
        type: "p",
        text: "Posner 與後續認知神經科學研究，通常把注意力拆成**警覺（alerting）**、**定向（orienting）**與**執行控制（executive control）**。警覺負責維持準備狀態；定向負責把資源對準空間或感覺通道；執行控制則處理衝突、抑制優勢反應，並依目標保護當前作業。",
      },
      {
        type: "ul",
        items: [
          "**選擇性注意力（selective attention）**：在干擾中選取目標刺激，與背側注意網絡（額眼區、頂內溝）密切相關。",
          "**持續性注意力（sustained attention）**：長時間維持表現，對右半球腹側注意網絡與去甲腎上腺素系統較敏感。",
          "**分配性注意力（divided attention）**：在工作記憶負荷上升時，表現往往先崩在執行控制而非感覺編碼。",
        ],
      },
      {
        type: "h2",
        id: "networks",
        text: "網絡觀點：不是「專注力開關」",
      },
      {
        type: "p",
        text: "臨床上常見把注意力理解成意志力。較精準的模型是：**目標導向網絡**與**刺激驅動網絡**互相制衡，並由前扣帶與外側前額葉調節衝突。默認模式網絡（DMN）在心智漫遊時活躍；若無法依任務需求抑制 DMN，就會呈現「人在現場、心在別處」的主訴。",
      },
      {
        type: "h2",
        id: "clinical",
        text: "與疾患的對接",
      },
      {
        type: "table",
        caption: "常見主訴與較可能受損的注意力成分（教學用簡表，非診斷規則）",
        headers: ["臨床情境", "較常受影響的成分", "評估時需分開的因素"],
        rows: [
          ["ADHD", "持續性注意力、執行控制", "睡眠、焦慮、學習史、動機"],
          ["憂鬱發作", "警覺與處理速度", "精神運動遲滯、反芻"],
          ["焦慮／威脅監控", "選擇性注意力偏向威脅", "安全行為、睡眠剝奪"],
          ["思覺失調症", "執行控制與過濾無關訊息", "藥物鎮靜、認知缺損基線"],
        ],
      },
      {
        type: "p",
        text: "神經心理測驗（如 CPT、Stroop、Trail Making）能提供常模參照，但不能單獨定診斷。重點是把測驗剖面圖放回功能情境：工作、學業、人際與安全。更完整的執行控制討論見[執行功能：抑制、轉換與更新](/models/executive-functions)。",
      },
    ],
  },
  {
    slug: "memory",
    pillar: "models",
    title: "記憶系統：工作記憶、情節記憶與程序性記憶",
    englishTitle: "Memory Systems: Working, Episodic, and Procedural Memory",
    summary:
      "以多重記憶系統說明編碼、儲存與提取，並對應憂鬱、創傷、失智與藥物效應在臨床上的不同剖面。",
    tags: ["memory", "cognition", "depression", "ptsd"],
    status: "peer-reviewed",
    evidence: "theoretical",
    updatedAt: "2026-07-20",
    readingMinutes: 11,
    authors: ["NeuroWeb 認知科學編輯組"],
    reviewers: ["臨床神經心理諮詢席"],
    blocks: [
      {
        type: "h2",
        id: "systems",
        text: "不要把「記性變差」當成單一症狀",
      },
      {
        type: "p",
        text: "Atkinson–Shiffrin 的階段模型有助於教學，但臨床更需要**系統取向**：工作記憶（暫時維持與操作）、情節記憶（時間地點化的個人事件）、語意記憶（知識概念）與程序性記憶（技能與習慣）。海馬—內側顳葉支持情節記憶的固化；紋狀體與小腦較支持程序性學習；前額葉則支撐工作記憶與提取策略。",
      },
      {
        type: "ul",
        items: [
          "**編碼失敗**：注意力與組織策略不足，常見於憂鬱、ADHD 與高負荷焦慮。",
          "**固化受干擾**：睡眠破碎、酒精、苯二氮平類與抗膽鹼負擔會傷害鞏固。",
          "**提取阻塞**：線索依賴高、過度類化或迴避，常見於創傷相關記憶。",
        ],
      },
      {
        type: "h2",
        id: "clinical-profiles",
        text: "臨床剖面",
      },
      {
        type: "p",
        text: "憂鬱症患者常主訴記憶差，但標準化測驗上較突出的往往是**工作記憶與提取效率**，而非快速遺忘曲線。創傷相關疾患則可能同時存在**侵入性過度提取**與**自傳記憶過度類化**。這與[威脅評估模型](/models/threat-appraisal)中的注意偏向互相加強。",
      },
      {
        type: "callout",
        variant: "clinical",
        title: "藥物與記憶",
        text: "抗膽鹼作用（部分 TCA、低效價抗精神病藥、部分抗組織胺）與苯二氮平類會影響編碼與固化。討論「認知副作用」時，應記錄時序、劑量、酒精與睡眠，而不是只記錄病名。",
      },
      {
        type: "p",
        text: "處遇上，補償策略（外在記憶輔具、編碼時的組織化、提取練習）與針對原疾患的治療同樣重要。若懷疑神經退化，應轉介完整神經心理與醫學評估，而非只在心理治療室處理「粗心」。",
      },
    ],
  },
  {
    slug: "executive-functions",
    pillar: "models",
    title: "執行功能：抑制、轉換與更新",
    englishTitle: "Executive Functions: Inhibition, Shifting, and Updating",
    summary:
      "以 Miyake 等人的三因子架構說明執行功能，並連結個案概念化、復健與心理治療中的「做不到」與「不想做」。",
    tags: ["executive-function", "cognition", "adhd", "schizophrenia"],
    status: "published",
    evidence: "theoretical",
    updatedAt: "2026-06-12",
    readingMinutes: 10,
    authors: ["NeuroWeb 認知科學編輯組"],
    reviewers: ["臨床心理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "執行功能（executive functions, EF）是一組目標導向的控制過程。Miyake 等提出三個相關但可分離的因子：**抑制（inhibition）**、**心智轉換（shifting）**與**工作記憶更新（updating）**。臨床語言裡的「自控力差」「計畫差」「彈性差」，往往混用了這三件事。",
      },
      {
        type: "table",
        headers: ["成分", "日常例子", "治療室觀察"],
        rows: [
          ["抑制", "忍住立刻回訊息、忍住自傷衝動", "家庭作業做了開頭卻無法停在計畫內"],
          ["轉換", "從工作切到照顧、從反芻切到任務", "卡在單一主題，難以依議程移動"],
          ["更新", "記住多步驟醫囑並依新資訊改計畫", "討論中後段忘記前段共識"],
        ],
      },
      {
        type: "h2",
        id: "motivation",
        text: "能力缺損還是動機—情緒干擾？",
      },
      {
        type: "p",
        text: "前額葉控制會被情緒顯著性、睡眠、疼痛與物質使用快速拉低。因此，EF 測驗低分不一定等於發展性缺損。對雙相情緒障礙的輕躁、思覺失調症的認知缺損、以及邊緣型人格特質的狀態性失調，解釋會完全不同。這也是為何[個案概念化](/therapy/cbt)必須把「做不到」拆成技能、抑制、恐懼與環境制約。",
      },
      {
        type: "callout",
        variant: "info",
        title: "與治療取向的接口",
        text: "DBT 的痛苦耐受與情緒調節，可看成在高喚起下重建抑制與轉換；CBT 的行為啟動則降低憂鬱對更新與啟動的拖累；ACT 訓練的是在私密經驗出現時仍能依價值轉換注意。",
      },
    ],
  },
  {
    slug: "cognitive-triad",
    pillar: "models",
    title: "憂鬱症的認知三角與貝克認知模型",
    englishTitle: "The Cognitive Triad and Beck’s Model of Depression",
    summary:
      "說明負向認知三角、基模、中介信念與自動思考的層次，並指出當代研究對認知模型的支持與修正。",
    tags: ["depression", "cognition", "cbt", "case-formulation"],
    status: "peer-reviewed",
    evidence: "expert-consensus",
    updatedAt: "2026-08-10",
    readingMinutes: 14,
    authors: ["NeuroWeb 心理治療編輯組"],
    reviewers: ["臨床心理諮詢席", "情感疾患醫學諮詢席"],
    blocks: [
      {
        type: "quote",
        text: "憂鬱並非只是情緒低落，而是對自我、世界與未來的系統性負向解釋風格開始主導訊息處理。",
        cite: "整理自 Beck 認知模型的臨床教學表述",
      },
      {
        type: "h2",
        id: "triad",
        text: "認知三角",
      },
      {
        type: "p",
        text: "Beck 提出的**認知三角（cognitive triad）**是指對**自我**（我沒有價值）、**世界／經驗**（一切都很苛刻）與**未來**（不會好轉）的負向觀。它不是三句口號，而是一套會自我強化的解釋偏誤：選擇性抽象、過度類化、個人化、災難化與非黑即白。",
      },
      {
        type: "h2",
        id: "architecture",
        text: "從基模到自動思考",
      },
      {
        type: "ol",
        items: [
          "**核心信念／基模**：早年形成、高度概括（例如「我不可愛」「我無能」）。",
          "**中介信念**：規則與假設（「如果我求助，就代表我失敗」）。",
          "**自動思考**：情境中快速出現、往往未被檢視的念頭。",
          "**補償策略**：討好、完美主義、退縮或反芻，短期減痛、長期維持疾患。",
        ],
      },
      {
        type: "p",
        text: "當代認知模型還強調**反芻（rumination）**作為維持因子：不是缺乏想法，而是重複、抽象、以「為什麼是我」為中心的思考，占用工作記憶並阻斷問題解決。這與[執行功能](/models/executive-functions)的轉換困難互相呼應。",
      },
      {
        type: "h2",
        id: "evidence",
        text: "證據與修正",
      },
      {
        type: "p",
        text: "CBT 對憂鬱症的療效有大量隨機對照與統合分析支持；認知改變是否為「唯一」中介機制仍有辯論。行為啟動本身即可產生明顯效果，提示迴避與活動減少是核心維持環。實務上，較穩妥的立場是：**認知與行為路徑都要評估**，並依個案的功能分析決定先介入哪一層。完整技術見[認知行為治療深度專題](/therapy/cbt)。",
      },
      {
        type: "callout",
        variant: "warning",
        title: "文化與表達",
        text: "華語個案較常以身體症狀、關係義務與「對不起家人」表達憂鬱。認知三角仍可用，但用詞需貼近個案的道德語言，避免把文化價值直接標成認知扭曲。",
      },
    ],
  },
  {
    slug: "threat-appraisal",
    pillar: "models",
    title: "焦慮症的威脅評估模型",
    englishTitle: "Threat Appraisal Models of Anxiety",
    summary:
      "以評估、注意偏向、安全行為與不確定性耐受說明焦慮的維持循環，並對應恐慌、社交焦慮與廣泛性焦慮的差異。",
    tags: ["anxiety", "cognition", "cbt", "ptsd"],
    status: "peer-reviewed",
    evidence: "theoretical",
    updatedAt: "2026-07-28",
    readingMinutes: 12,
    authors: ["NeuroWeb 心理治療編輯組"],
    reviewers: ["臨床心理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "多數焦慮的認知模型可收斂成一句話：**系統把不確定或內在感覺評估為迫在眉睫的威脅，並以控制與迴避來換取短期安全。** Clark 的恐慌模型、Rapee 與 Heimberg 的社交焦慮模型、Dugas 的對不確定性無法耐受，都是這一邏輯的特定版本。",
      },
      {
        type: "h2",
        id: "cycle",
        text: "維持循環",
      },
      {
        type: "ol",
        items: [
          "觸發（身體感覺、評價場合、模稜兩可的訊息）。",
          "威脅評估（災難化、機率高估、可應對性低估）。",
          "注意縮窄與身體警覺上升。",
          "安全行為與迴避（查症狀、帶護身物、只講準備好的句子）。",
          "得不到「沒有安全行為也能過關」的經驗，信念被保存。",
        ],
      },
      {
        type: "table",
        headers: ["疾患", "核心評估", "典型安全行為"],
        rows: [
          ["恐慌症", "心悸／氣促 = 即將昏倒或死亡", "反覆就醫、緊抓出口、過度深呼吸"],
          ["社交焦慮", "他人看見我的焦慮 = 羞辱與拒絕", "心中預演、事後回放、避免眼神"],
          ["廣泛性焦慮", "擔心 = 負責任、能防止災禍", "反覆求保證、過度準備"],
          ["強迫症相關", "入侵思考 = 道德或污染危險", "儀式、心智中和"],
        ],
      },
      {
        type: "h2",
        id: "exposure",
        text: "對治療的含義",
      },
      {
        type: "p",
        text: "暴露與行為實驗的目標不是「把焦慮降到零」，而是修正威脅評估，並逐步拿掉安全行為。抑制學習（inhibitory learning）強調變異、去除安全訊號、以及讓個案注意到「預期的災難沒發生／即使不適也能承受」。這與[CBT 專題](/therapy/cbt)中的行為實驗設計直接銜接。",
      },
      {
        type: "callout",
        variant: "clinical",
        title: "藥物與暴露的協作",
        text: "苯二氮平類可能透過降低喚起與提供「藥就是安全行為」而干擾暴露學習。SSRI／SNRI 常作為中重度焦慮的合併選項，但仍需心理教育：藥物減的是強度，不是替代重新評估。",
      },
    ],
  },
  {
    slug: "neurodiversity-development",
    pillar: "models",
    title: "發展視角與神經多樣性",
    englishTitle: "Developmental Perspectives and Neurodiversity",
    summary:
      "把認知發展放回生命階段，並以神經多樣性框架討論自閉、ADHD 與學習差異，避免把所有變異病理化。",
    tags: ["development", "neurodiversity", "adhd", "cognition"],
    status: "published",
    evidence: "expert-consensus",
    updatedAt: "2026-05-30",
    readingMinutes: 11,
    authors: ["NeuroWeb 發展與臨床編輯組"],
    reviewers: ["兒童青少年精神諮詢席", "臨床心理諮詢席"],
    blocks: [
      {
        type: "p",
        text: "發展心理學提醒臨床工作者：同一套認知機制在不同年齡有不同常模與任務需求。工作記憶、抑制與社會認知在青春期仍在大幅重整；老年期則需區辨正常老化、憂鬱假性失智與神經退化。評估若不放回發展階段，很容易把「還沒長好」或「環境不匹配」誤寫成性格問題。",
      },
      {
        type: "h2",
        id: "neurodiversity",
        text: "神經多樣性不是取消疾患",
      },
      {
        type: "p",
        text: "**神經多樣性（neurodiversity）**主張人腦在注意、感覺、社交與學習上的變異是族群層次的事實。它反對把所有差異自動等同於缺陷，但也不否認痛苦、功能損害與共病需要臨床照護。較穩健的臨床立場是：**承認特質、評估損害、改變環境與技能，而非只要求個案裝成神經典型。**",
      },
      {
        type: "ul",
        items: [
          "自閉光譜：社交溝通風格、感覺處理與興趣深度的差異；共病焦慮、憂鬱與執行功能負荷很高。",
          "ADHD：動機—獎賞與執行控制的發展性差異；成人期常以拖延、情緒衝動與自我批評呈現。",
          "學習障礙：特定學業技能缺損，需與整體智能、機會與語言背景分開。",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "倫理",
        text: "診斷標籤可以打開資源，也可能污名。知情同意應討論標籤的用途、限制，以及支持計畫是否真能改變日常功能。",
      },
      {
        type: "p",
        text: "在華語家庭中，發展差異常被放進「乖不乖」「會不會念書」的道德框架。臨床會談需要把行為翻譯回機制與環境適配，才能讓家長與學校成為治療同盟而非監督者。",
      },
    ],
  },
];
