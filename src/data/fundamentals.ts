import { term } from "@/lib/site";
import type { Note } from "@/lib/types";

export const fundamentalNotes: Note[] = [
  {
    slug: "dopamine-pathways",
    axis: "fundamental",
    en: "Dopamine Pathways",
    zh: "多巴胺系統",
    summary:
      `${term("Mesolimbic", "中腦邊緣")}、${term("Mesocortical", "中腦皮質")}、${term("Nigrostriatal", "黑質紋狀體")}、${term("Tuberoinfundibular", "結節漏斗")}四條路徑，是精神病、動機、運動與泌乳素的共同地圖。`,
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
          [term("Mesolimbic", "中腦邊緣"), `${term("Salience", "顯著性")}、${term("Wanting", "欲求")}、${term("Reward", "獎賞")}`, `正向症狀、${term("Craving", "渴求")}、${term("Incentive sensitization", "誘因敏感化")}`],
          [term("Mesocortical", "中腦皮質"), "執行、動機、工作記憶", "負性／認知症狀；過強 D2 阻斷可能惡化"],
          [term("Nigrostriatal", "黑質紋狀體"), "動作選擇", `${term("EPS", "錐體外徑症狀")}、帕金森主義`],
          [term("Tuberoinfundibular", "結節漏斗"), "抑制泌乳素", "高泌乳素血症"],
        ],
      },
      {
        type: "p",
        text: `${term("Dopamine", "多巴胺")} 比較像「這件事值得注意／值得付出」的訊號，而不是快樂分子。這張地圖必須能解釋：為何 ${term("Antipsychotic", "抗精神病藥")} 能減幻覺、也可能讓人更平、動作更僵、性功能與月經改變。`,
      },
    ],
  },
  {
    slug: "reward-system",
    axis: "fundamental",
    en: "Addiction and the Reward System",
    zh: "成癮機制與獎賞迴路",
    summary:
      `${term("VTA–NAc–PFC", "腹側被蓋區—伏隔核—前額葉")}。${term("Wanting", "欲求")}可以在${term("Liking", "喜歡")}消失後仍被${term("Cue", "線索")}點燃。這是${term("Substance", "物質")}與${term("Opioid", "鴉片類")}止痛的底層。`,
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
          `${term("Incentive sensitization", "誘因敏感化")}：${term("Cue", "線索")} 的 ${term("Wanting", "欲求")} 上升。`,
          "負增強：用物質是為了拿掉戒斷、焦慮、疼痛或空虛。",
          `${term("PFC", "前額葉皮質")} 控制下降使 ${term("Executive Dysfunction", "執行功能障礙")} 變成復發風險因子。`,
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
      `廣泛調控情緒、焦慮、睡眠、食慾與血小板。${term("SSRI", "選擇性血清素再回收抑制劑")}的臨床效應不能化約成「腦中缺血清素」。`,
    related: {
      dsm: ["major-depressive-disorder", "ocd-disorder", "generalized-anxiety-disorder"],
      pharmacology: ["snri-pain-interface"],
      interventions: ["cbt-neuroplasticity"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Serotonin", "血清素")}（5-HT）細胞體主要在 ${term("Raphe nuclei", "中縫核")}，投射幾乎全腦。受體亞型解釋為何同樣「加血清素」會有焦慮短暫升高、性功能、腸胃與睡眠的不同剖面。下游更重要的可能是神經可塑性與網絡重整，而非即時心情。`,
      },
    ],
  },
  {
    slug: "gaba-glutamate",
    axis: "fundamental",
    en: "GABA and Glutamate Pathways",
    zh: "GABA／麩胺酸路徑",
    summary:
      `腦的主要抑制與興奮貨幣。${term("Benzodiazepines", "苯二氮平類")}、${term("Ketamine", "氯胺酮")}、${term("Memantine", "美金剛")}、部分抗癲癇藥與癲癇風險都走這張圖。`,
    related: {
      dsm: ["insomnia-disorder", "major-depressive-disorder", "major-ncd-alzheimer"],
      pharmacology: ["ketamine-nmda", "memantine-nmda", "gabapentinoids"],
      interventions: ["tms-ect"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Glutamate", "麩胺酸")} 是主要興奮性傳導；${term("GABA", "γ-胺基丁酸")} 是主要抑制。${term("E/I balance", "興奮／抑制平衡")}被用來討論焦慮、癲癇、精神分裂症的 Gamma 震盪假說，以及 ${term("TMS", "經顱磁刺激")} 如何改變皮質興奮性。`,
      },
      {
        type: "callout",
        variant: "clinical",
        title: "Benzodiazepines",
        text: `正向調節 GABA-A 可快速減焦慮，也造成 ${term("Tolerance", "耐受")}、${term("Withdrawal", "戒斷")}、跌倒與暴露學習干擾。它們是工具，不是 ${term("GAD", "廣泛性焦慮症")} 的長期地圖。`,
      },
    ],
  },
  {
    slug: "hpa-axis",
    axis: "fundamental",
    en: "HPA Axis and Stress",
    zh: "HPA 軸與壓力反應",
    summary:
      `${term("Hypothalamus–Pituitary–Adrenal", "下視丘—腦垂體—腎上腺")}。慢性${term("Cortisol", "皮質醇")}訊號與憂鬱、創傷、失眠、疼痛敏化互相維持。`,
    related: {
      dsm: ["major-depressive-disorder", "ptsd", "insomnia-disorder"],
      symptoms: ["hyperarousal", "anhedonia", "sleep-fragmentation"],
      interventions: ["cbt-neuroplasticity", "emdr-reconsolidation"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("HPA axis", "下視丘—腦垂體—腎上腺軸")}：${term("PVN", "室旁核")} 釋放 CRH → ACTH → ${term("Cortisol", "皮質醇")}。急性有助應付；慢性則影響海馬、睡眠與免疫。${term("PTSD", "創傷後壓力症")} 的皮質醇發現並不一致，教學上應強調「壓力系統失調」而非單一方向的激素過多。`,
      },
    ],
  },
  {
    slug: "limbic-pfc",
    axis: "fundamental",
    en: "Limbic–PFC Circuitry",
    zh: "邊緣系統與前額葉的解剖關係",
    summary:
      `${term("Amygdala", "杏仁核")}、${term("Hippocampus", "海馬")}、${term("ACC", "前扣帶")}與${term("PFC", "前額葉皮質")}的對話，是情緒調節、暴露學習與執行控制的解剖骨架。`,
    related: {
      dsm: ["ptsd", "borderline-personality-disorder", "ocd-disorder"],
      symptoms: ["executive-dysfunction", "hyperarousal", "dissociation"],
      interventions: ["cbt-neuroplasticity", "tms-ect", "emdr-reconsolidation"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Limbic system", "邊緣系統")}（特別是 ${term("Amygdala", "杏仁核")} 與 ${term("Hippocampus", "海馬")}）快速標記威脅與脈絡；${term("Prefrontal cortex", "前額葉皮質")} 做評估、抑制與目標維持。高喚起時 PFC 效率下降，這能同時說明 ${term("BPD", "邊緣型人格疾患")} 的爆發、${term("PTSD", "創傷後壓力症")} 的閃回與為何技能要在低喚起時先練會。`,
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
      `${term("NREM", "非快速動眼")}（含${term("Slow-wave sleep", "慢波睡眠")}）與${term("REM", "快速動眼")}的交替。幾乎所有精神症狀與可塑性都經過這一晚。`,
    related: {
      dsm: ["insomnia-disorder", "major-depressive-disorder", "ptsd", "bipolar-i"],
      symptoms: ["sleep-fragmentation", "executive-dysfunction"],
      interventions: ["cbt-neuroplasticity"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Sleep architecture", "睡眠結構")} 包含 N1–N3 與 ${term("REM", "快速動眼")} 的週期。${term("Slow-wave sleep", "慢波睡眠")} 與記憶固化、代謝清除有關；快速動眼與情緒記憶處理有關。${term("Antidepressants", "抗憂鬱劑")} 常抑制快速動眼；酒精破碎後半夜睡眠；${term("Mania", "躁狂")} 的睡眠需求下降是臨床警報。`,
      },
      {
        type: "p",
        text: `沒有睡眠，${term("CBT", "認知行為治療")} 的可塑性與暴露學習都會打折。先處理 ${term("Sleep-wake", "睡眠—覺醒")}，再評價「抗憂鬱無效」。`,
      },
    ],
  },
  {
    slug: "monoamine-overview",
    axis: "fundamental",
    en: "Monoamine Overview",
    zh: "單胺總覽",
    summary:
      `${term("Dopamine", "多巴胺")}、${term("Serotonin", "血清素")}、${term("Norepinephrine", "去甲腎上腺素")}的教學起點。有用，但不完整——還必須接上${term("Glutamate", "麩胺酸")}與可塑性。`,
    related: {
      dsm: ["major-depressive-disorder"],
      pharmacology: ["snri-pain-interface", "d2-modulation"],
      fundamentals: ["dopamine-pathways", "serotonin-system"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Monoamines", "單胺")} 是精神藥理的入門語言：DA（動機與顯著性）、5-HT（廣泛調節）、NE（警覺與注意力）。${term("Mood Disorders", "情緒疾患")} 的臨床入口常用這張圖，但快速抗憂鬱與 ${term("TMS", "經顱磁刺激")} 迫使我們把 ${term("GABA/Glutamate", "GABA／麩胺酸")} 與 ${term("Neuroplasticity", "神經可塑性")} 一併教。`,
      },
    ],
  },
];
