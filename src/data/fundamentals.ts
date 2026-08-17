import { term } from "@/lib/site";
import type { Note } from "@/lib/types";

export const fundamentalNotes: Note[] = [
  {
    slug: "dopamine-pathways",
    axis: "fundamental",
    en: "Dopamine Pathways",
    zh: "多巴胺系統",
    summary:
      "Mesolimbic、Mesocortical、Nigrostriatal、Tuberoinfundibular 四條路徑，是精神病、動機、運動與泌乳素的共同地圖。",
    related: {
      dsm: ["schizophrenia", "adhd", "substance-use-disorder", "bipolar-i"],
      symptoms: ["anhedonia", "avolition", "craving", "psychomotor-change"],
      pharmacology: ["d2-modulation", "dopamine-pathways-drugs", "clozapine"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "table",
        headers: ["路徑", "大致功能", "臨床影射"],
        rows: [
          [term("Mesolimbic", "中腦邊緣"), "Salience、Wanting、Reward", "正向症狀、Craving、Incentive sensitization"],
          [term("Mesocortical", "中腦皮質"), "執行、動機、工作記憶", "負性／認知症狀；過強 D2 阻斷可能惡化"],
          [term("Nigrostriatal", "黑質紋狀體"), "動作選擇", "EPS、帕金森主義"],
          [term("Tuberoinfundibular", "結節漏斗"), "抑制泌乳素", "高泌乳素血症"],
        ],
      },
      {
        type: "p",
        text: `${term("Dopamine", "多巴胺")} 比較像「這件事值得注意／值得付出」的訊號，而不是快樂分子。這張地圖必須能解釋：為何 Antipsychotic 能減幻覺、也可能讓人更平、動作更僵、性功能與月經改變。`,
      },
    ],
  },
  {
    slug: "reward-system",
    axis: "fundamental",
    en: "Addiction and the Reward System",
    zh: "成癮機制與獎賞迴路",
    summary:
      "VTA–NAc–PFC。Wanting 可以在 Liking 消失後仍被 Cue 點燃。這是 Substance 與 Opioid 止痛的底層。",
    related: {
      dsm: ["substance-use-disorder", "adhd"],
      symptoms: ["craving", "anhedonia"],
      pharmacology: ["opioids-reward", "dopamine-pathways-drugs"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Reward system", "獎賞迴路")} 核心是 ${term("Ventral tegmental area", "腹側被蓋區")}（VTA）到 ${term("Nucleus accumbens", "伏隔核")}，再受 ${term("Prefrontal cortex", "前額葉皮質")} 調節。${term("Addiction", "成癮")} 的現代教學把 ${term("Binge/intoxication", "狂用")}、${term("Withdrawal/negative affect", "戒斷負情感")} 與 ${term("Preoccupation/anticipation", "盤據／預期")} 分成三階段。`,
      },
      {
        type: "ul",
        items: [
          `${term("Incentive sensitization", "誘因敏感化")}：Cue 的 Wanting 上升。`,
          "負增強：用物質是為了拿掉戒斷、焦慮、疼痛或空虛。",
          "PFC 控制下降使 Executive Dysfunction 變成復發風險因子。",
        ],
      },
    ],
  },
  {
    slug: "serotonin-system",
    axis: "fundamental",
    en: "Serotonin System",
    zh: "血清素系統",
    summary:
      "廣泛調控情緒、焦慮、睡眠、食慾與血小板。SSRI 的臨床效應不能化約成「腦中缺血清素」。",
    related: {
      dsm: ["major-depressive-disorder", "ocd-disorder", "generalized-anxiety-disorder"],
      pharmacology: ["snri-pain-interface"],
      interventions: ["cbt-neuroplasticity"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Serotonin", "血清素")}（5-HT）細胞體主要在 Raphe nuclei，投射幾乎全腦。受體亞型解釋為何同樣「加血清素」會有焦慮短暫升高、性功能、腸胃與睡眠的不同剖面。下游更重要的可能是神經可塑性與網絡重整，而非即時心情。`,
      },
    ],
  },
  {
    slug: "gaba-glutamate",
    axis: "fundamental",
    en: "GABA and Glutamate Pathways",
    zh: "GABA／麩胺酸路徑",
    summary:
      "腦的主要抑制與興奮貨幣。Benzodiazepines、Ketamine、Memantine、部分抗癲癇藥與癲癇風險都走這張圖。",
    related: {
      dsm: ["insomnia-disorder", "major-depressive-disorder", "major-ncd-alzheimer"],
      pharmacology: ["ketamine-nmda", "memantine-nmda", "gabapentinoids"],
      interventions: ["tms-ect"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Glutamate", "麩胺酸")} 是主要興奮性傳導；${term("GABA", "γ-胺基丁酸")} 是主要抑制。E/I balance（興奮／抑制平衡）被用來討論焦慮、癲癇、精神分裂症的 Gamma 震盪假說，以及 TMS 如何改變皮質興奮性。`,
      },
      {
        type: "callout",
        variant: "clinical",
        title: "Benzodiazepines",
        text: "正向調節 GABA-A 可快速減焦慮，也造成 Tolerance、Withdrawal、跌倒與暴露學習干擾。它們是工具，不是 GAD 的長期地圖。",
      },
    ],
  },
  {
    slug: "hpa-axis",
    axis: "fundamental",
    en: "HPA Axis and Stress",
    zh: "HPA 軸與壓力反應",
    summary:
      "Hypothalamus–Pituitary–Adrenal。慢性 Cortisol 訊號與憂鬱、創傷、失眠、疼痛敏化互相維持。",
    related: {
      dsm: ["major-depressive-disorder", "ptsd", "insomnia-disorder"],
      symptoms: ["hyperarousal", "anhedonia", "sleep-fragmentation"],
      interventions: ["cbt-neuroplasticity", "emdr-reconsolidation"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("HPA axis", "下視丘—腦垂體—腎上腺軸")}：PVN 釋放 CRH → ACTH → Cortisol。急性有助應付；慢性則影響海馬、睡眠與免疫。PTSD 的 Cortisol 發現並不一致，教學上應強調「壓力系統失調」而非單一方向的激素過多。`,
      },
    ],
  },
  {
    slug: "limbic-pfc",
    axis: "fundamental",
    en: "Limbic–PFC Circuitry",
    zh: "邊緣系統與前額葉的解剖關係",
    summary:
      "Amygdala、Hippocampus、ACC 與 PFC 的對話，是情緒調節、暴露學習與執行控制的解剖骨架。",
    related: {
      dsm: ["ptsd", "borderline-personality-disorder", "ocd-disorder"],
      symptoms: ["executive-dysfunction", "hyperarousal", "dissociation"],
      interventions: ["cbt-neuroplasticity", "tms-ect", "emdr-reconsolidation"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Limbic system", "邊緣系統")}（特別是 ${term("Amygdala", "杏仁核")} 與 ${term("Hippocampus", "海馬")}）快速標記威脅與脈絡；${term("Prefrontal cortex", "前額葉皮質")} 做評估、抑制與目標維持。高喚起時 PFC 效率下降，這能同時說明 BPD 的爆發、PTSD 的閃回與為何技能要在低喚起時先練會。`,
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
  },
  {
    slug: "sleep-architecture",
    axis: "fundamental",
    en: "Sleep Architecture",
    zh: "睡眠結構",
    summary:
      "NREM（含 Slow-wave sleep）與 REM 的交替。幾乎所有精神症狀與可塑性都經過這一晚。",
    related: {
      dsm: ["insomnia-disorder", "major-depressive-disorder", "ptsd", "bipolar-i"],
      symptoms: ["sleep-fragmentation", "executive-dysfunction"],
      interventions: ["cbt-neuroplasticity"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Sleep architecture", "睡眠結構")} 包含 N1–N3 與 REM 的週期。${term("Slow-wave sleep", "慢波睡眠")} 與記憶固化、代謝清除有關；REM 與情緒記憶處理有關。Antidepressants 常抑制 REM；酒精破碎後半夜睡眠；Mania 的睡眠需求下降是臨床警報。`,
      },
      {
        type: "p",
        text: `沒有睡眠，CBT 的可塑性與暴露學習都會打折。先處理 Sleep-wake，再評價「抗憂鬱無效」。`,
      },
    ],
  },
  {
    slug: "monoamine-overview",
    axis: "fundamental",
    en: "Monoamine Overview",
    zh: "單胺總覽",
    summary:
      "Dopamine、Serotonin、Norepinephrine 的教學起點。有用，但不完整——還必須接上 Glutamate 與可塑性。",
    related: {
      dsm: ["major-depressive-disorder"],
      pharmacology: ["snri-pain-interface", "d2-modulation"],
      fundamentals: ["dopamine-pathways", "serotonin-system"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Monoamines", "單胺")} 是精神藥理的入門語言：DA（動機與顯著性）、5-HT（廣泛調節）、NE（警覺與注意力）。Mood Disorders 的臨床入口常用這張圖，但快速抗憂鬱與 TMS 迫使我們把 GABA/Glutamate 與 Neuroplasticity 一併教。`,
      },
    ],
  },
];
