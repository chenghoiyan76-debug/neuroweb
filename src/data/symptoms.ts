import { term } from "@/lib/site";
import type { Note } from "@/lib/types";

export const symptomNotes: Note[] = [
  {
    slug: "anhedonia",
    axis: "symptom",
    en: "Anhedonia",
    zh: "缺乏快感",
    summary:
      "對獎賞的 Anticipatory 或 Consummatory 快感下降。是 Depression、Negative symptoms、Substance withdrawal 的共同貨幣。",
    related: {
      dsm: ["major-depressive-disorder", "schizophrenia", "substance-use-disorder"],
      pharmacology: ["opioids-reward", "dopamine-pathways-drugs"],
      interventions: ["cbt-neuroplasticity", "tms-ect"],
      fundamentals: ["reward-system", "dopamine-pathways"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Anhedonia", "缺乏快感")} 要拆成：想不想做（motivation / wanting）與做了是否感到享受（liking）。前者較靠近 ${term("Dopamine", "多巴胺")} 的 Incentive salience；後者較靠近 Opioid / hedonic hotspots。行為啟動若只叫個案「去開心」，會打在錯誤的機制上。`,
      },
      {
        type: "table",
        headers: ["臨床畫面", "較可能機制", "解方方向"],
        rows: [
          ["什麼都不想開始", term("Wanting / mesolimbic DA", "欲求／中腦邊緣多巴胺"), "極小步的 Behavioral activation、減少 Effort cost"],
          ["做了也空洞", "Hedonic liking 下降", "檢查 Substance、Antipsychotic 鎮靜、Sleep"],
          ["只有成癮線索還有感覺", term("Incentive sensitization", "誘因敏感化"), "Cue 管理 + Reward System 條目"],
        ],
      },
    ],
  },
  {
    slug: "hallucinations",
    axis: "symptom",
    en: "Hallucinations",
    zh: "幻覺",
    summary:
      "無對應外在刺激的知覺。聽幻覺最常見於 Schizophrenia Spectrum，但必須系統排除物質、神經系統、創傷與情感性精神病。",
    related: {
      dsm: ["schizophrenia", "ptsd", "substance-use-disorder"],
      pharmacology: ["d2-modulation", "clozapine"],
      interventions: ["cbt-neuroplasticity", "tms-ect"],
      fundamentals: ["dopamine-pathways", "gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Hallucinations", "幻覺")} 記錄要包含：感官通道、內容、自知力、命令性、出現情境（入睡、物質、創傷 Cue）。${term("Hypnagogic", "入睡前")} 幻覺不等于 Schizophrenia。`,
      },
      {
        type: "ul",
        items: [
          `${term("Auditory verbal hallucinations", "言語性聽幻覺")}：連到 D2 與 CBT for psychosis 的關係改變（不是爭辯真假）。`,
          "視覺幻覺提高 Delirium、Lewy body、物質的權重。",
          `${term("PTSD", "創傷後壓力症")} 的閃回要與幻覺鑑別：有無創傷時間戳與觸發。`,
        ],
      },
    ],
  },
  {
    slug: "delusions",
    axis: "symptom",
    en: "Delusions",
    zh: "妄想",
    summary:
      "固定的錯誤信念。重點是功能、痛苦與行動風險，而非只在會談中駁倒它。",
    related: {
      dsm: ["schizophrenia", "bipolar-i", "major-depressive-disorder"],
      pharmacology: ["d2-modulation", "clozapine"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["dopamine-pathways", "limbic-pfc"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Delusions", "妄想")} 可理解為 Prediction error 與 Salience 被錯誤賦值（Kapur 的 Aberrant salience 是常用教學模型）。治療上先處理危險行動與睡眠，再做信念工作。`,
      },
    ],
  },
  {
    slug: "executive-dysfunction",
    axis: "symptom",
    en: "Executive Dysfunction",
    zh: "執行功能障礙",
    summary:
      "抑制、轉換、更新失敗。出現在 ADHD、Depression、Schizophrenia、NCD 與睡眠剝奪——機制不同，處遇不同。",
    related: {
      dsm: ["adhd", "schizophrenia", "major-ncd-alzheimer", "major-depressive-disorder"],
      pharmacology: ["cholinesterase-and-cognition", "dopamine-pathways-drugs"],
      interventions: ["cbt-neuroplasticity", "neurofeedback"],
      fundamentals: ["limbic-pfc", "dopamine-pathways", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Executive Dysfunction", "執行功能障礙")} 不是懶。先問：這是發展性（ADHD）、狀態性（憂鬱、躁狂、睡眠）、退化性（NCD）還是藥物抗膽鹼負擔？`,
      },
      {
        type: "ul",
        items: [
          `${term("Inhibition", "抑制")} 失敗：衝動、自傷、爆發。`,
          `${term("Shifting", "轉換")} 失敗：卡在 Rumination 或 Obsession。`,
          `${term("Updating", "更新")} 失敗：記不住醫囑與會談共識。`,
        ],
      },
    ],
  },
  {
    slug: "rumination",
    axis: "symptom",
    en: "Rumination",
    zh: "反芻",
    summary:
      "重複、抽象、以「為什麼」為中心的思考，占用 Working memory 並阻斷問題解決。",
    related: {
      dsm: ["major-depressive-disorder", "generalized-anxiety-disorder"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["limbic-pfc", "sleep-architecture"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Rumination", "反芻")} 與 GAD 的 ${term("Worry", "擔心")} 不同：反芻多朝過去與自我價值，擔心多朝未來災難。兩者都會維持 HPA 活化與失眠。`,
      },
    ],
  },
  {
    slug: "hyperarousal",
    axis: "symptom",
    en: "Hyperarousal",
    zh: "高警覺",
    summary:
      "驚跳、易怒、掃描威脅。PTSD、Panic、Pain 與戒斷都可能共用這條自主神經通道。",
    related: {
      dsm: ["ptsd", "generalized-anxiety-disorder", "insomnia-disorder"],
      pharmacology: ["gabapentinoids", "opioids-reward"],
      interventions: ["emdr-reconsolidation", "neurofeedback"],
      fundamentals: ["hpa-axis", "limbic-pfc"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Hyperarousal", "高警覺")} 會被誤寫成「人格易怒」。量血壓、睡眠、咖啡因、疼痛與 Substance，再決定是暴露窗口、藥物或兩者。`,
      },
    ],
  },
  {
    slug: "dissociation",
    axis: "symptom",
    en: "Dissociation",
    zh: "解離",
    summary:
      "對當下、身體或自我的連接中斷。是創傷光譜常見現象，也是再處理治療的紅燈。",
    related: {
      dsm: ["ptsd", "borderline-personality-disorder"],
      interventions: ["emdr-reconsolidation"],
      fundamentals: ["limbic-pfc", "hpa-axis"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Dissociation", "解離")} 時，Memory reconsolidation 工作可能無法編碼新學習。先做 Grounding 與 Window of tolerance，再進入 EMDR 或暴露。`,
      },
    ],
  },
  {
    slug: "anxious-apprehension",
    axis: "symptom",
    en: "Anxious Apprehension",
    zh: "焦慮性預期",
    summary:
      "對未來威脅的持續掃描。是 GAD、Panic 的預期焦慮與疼痛災難化的共同歷程。",
    related: {
      dsm: ["generalized-anxiety-disorder", "ocd-disorder"],
      pharmacology: ["snri-pain-interface"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["hpa-axis", "gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Anxious apprehension", "焦慮性預期")} 透過 Safety behaviors 維持。解方是抑制學習：讓預期的災難被經驗修正，而不是保證「不會焦慮」。`,
      },
    ],
  },
  {
    slug: "psychomotor-change",
    axis: "symptom",
    en: "Psychomotor Retardation / Agitation",
    zh: "精神運動遲滯／激越",
    summary:
      "速度與動作的病理改變。遲滯提高 Melancholia 與醫療鑑別；激越提高混合特徵、靜坐不能與自殺風險。",
    related: {
      dsm: ["major-depressive-disorder", "bipolar-i"],
      pharmacology: ["d2-modulation"],
      fundamentals: ["dopamine-pathways", "gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `看到坐不住，先分 ${term("Akathisia", "靜坐不能")}、${term("Mania", "躁狂")}、${term("Anxiety", "焦慮")} 與 ${term("Withdrawal", "戒斷")}。分錯會把 D2 副作用加成焦慮藥。`,
      },
    ],
  },
  {
    slug: "avolition",
    axis: "symptom",
    en: "Avolition",
    zh: "動機缺乏",
    summary:
      "啟動目標導向行為的驅力下降。Schizophrenia 負性症狀、Depression 與藥物鎮靜容易混淆。",
    related: {
      dsm: ["schizophrenia", "major-depressive-disorder"],
      pharmacology: ["d2-modulation", "clozapine"],
      fundamentals: ["dopamine-pathways", "reward-system"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Avolition", "動機缺乏")} 與 Anhedonia 常共存，但介入不同：前者需要結構化啟動與減少鎮靜負擔；後者需要獎賞可及性。`,
      },
    ],
  },
  {
    slug: "craving",
    axis: "symptom",
    en: "Craving",
    zh: "渴求",
    summary:
      "被 Cue 點燃的想用物質衝動。是 Addiction 的臨床主訴，不是「意志力暫時不足」。",
    related: {
      dsm: ["substance-use-disorder"],
      pharmacology: ["opioids-reward"],
      fundamentals: ["reward-system", "dopamine-pathways"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Craving", "渴求")} 對應 Mesolimbic dopamine 的 Cue-induced wanting。記錄觸發、高峰時間與替代行為，比道德勸說有用。`,
      },
    ],
  },
  {
    slug: "cognitive-rigidity",
    axis: "symptom",
    en: "Cognitive Rigidity",
    zh: "認知僵直",
    summary:
      "難以轉換心智定勢。見於 OCD、ASD、Frontostriatal 病變與嚴重焦慮。",
    related: {
      dsm: ["ocd-disorder", "adhd", "major-ncd-alzheimer"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["limbic-pfc", "gaba-glutamate"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Cognitive rigidity", "認知僵直")} 在 OCD 是儀式堅持，在 NCD 是定勢轉換失敗。不要用同一套「挑戰想法」應付兩者。`,
      },
    ],
  },
  {
    slug: "sleep-fragmentation",
    axis: "symptom",
    en: "Sleep Fragmentation",
    zh: "睡眠破碎",
    summary:
      "反覆微覺醒使 Slow-wave sleep 與 REM 不完整。是情緒、疼痛、創傷與神經退化的放大器。",
    related: {
      dsm: ["insomnia-disorder", "ptsd", "major-ncd-alzheimer"],
      pharmacology: ["gabapentinoids"],
      fundamentals: ["sleep-architecture", "hpa-axis"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Sleep fragmentation", "睡眠破碎")} 會讓 Executive function 隔天崩盤，並提高疼痛與 Craving。先畫睡眠日誌再談助眠藥。`,
      },
    ],
  },
  {
    slug: "pain-catastrophizing",
    axis: "symptom",
    en: "Pain Catastrophizing",
    zh: "疼痛災難化",
    summary:
      "對疼痛的放大、反芻與無助。是 Pain killers 使用升級與失能的心理機制接口。",
    related: {
      dsm: ["major-depressive-disorder", "generalized-anxiety-disorder", "substance-use-disorder"],
      pharmacology: ["opioids-reward", "snri-pain-interface", "gabapentinoids"],
      interventions: ["cbt-neuroplasticity"],
      fundamentals: ["limbic-pfc", "hpa-axis"],
    },
    updatedAt: "2026-08-17",
    blocks: [
      {
        type: "p",
        text: `${term("Pain catastrophizing", "疼痛災難化")} 把傷害訊號變成威脅敘事。SNRI、抗癲癇類止痛與 CBT for pain 必須同場討論，否則只會加 Opioid。`,
      },
    ],
  },
];
