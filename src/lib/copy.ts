import type { ContentBlock, Note } from "@/lib/types";
import { applyTerms, bilingualTitle, term, type Locale } from "@/lib/i18n";
import { localizeBlocks } from "@/lib/localize";

export type EnPack = { summary: string; blocks: ContentBlock[] };

function p(text: string): ContentBlock {
  return { type: "p", text };
}

function ul(items: string[]): ContentBlock {
  return { type: "ul", items };
}

export const noteEn: Record<string, EnPack> = {
  "major-depressive-disorder": {
    summary: `${term("Major Depressive Disorder", "重度憂鬱症")} presents as mood, ${term("Anhedonia", "缺乏快感")}, somatic and cognitive clusters. Chart course, suicide risk, bipolar mimicry, and comorbid anxiety.`,
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: "Nosology",
        text: "These are illness studies, **not reproduced DSM-5 criteria**. Diagnose from the official APA text and a full assessment.",
      },
      { type: "h2", id: "clinical", text: "Clinical notes" },
      p(`${term("Major Depressive Disorder", "重度憂鬱症")} is not “feeling sad.” Separate ${term("Sadness", "悲傷")}, ${term("Anhedonia", "缺乏快感")}, ${term("Rumination", "反芻")}, sleep, and suicide risk. Ask every episode about ${term("Mania", "躁狂")} or ${term("Hypomania", "輕躁")} so bipolar depression is not treated as unipolar antidepressant monotherapy.`),
      ul([
        `${term("Specifier", "標註")} thinking: anxious distress, melancholic, psychotic, atypical, peripartum, seasonal.`,
        "Write functional harm: work, caregiving, self-care—not adjectives of severity alone.",
        `${term("Medical mimics", "醫學模仿")}: thyroid, anemia, sleep apnea, substances, steroids.`,
      ]),
    ],
  },
  "bipolar-i": {
    summary: `${term("Mania", "躁狂")} defines the illness; depression often drives disability. Reduced sleep need is among the most useful early warnings.`,
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: "Nosology",
        text: "DSM-5 criteria are not reproduced. Mania is elevated or irritable mood plus increased energy/activity with marked impairment, hospitalization, or psychosis.",
      },
      p(`Common errors in ${term("Bipolar I Disorder", "雙相 I 型")}: calling ${term("Agitated depression", "激越性憂鬱")} mania, calling chronic ADHD restlessness hypomania, or missing antidepressant-induced switching.`),
      ul([
        `Watch the ${term("Sleep-wake cycle", "睡眠—覺醒週期")}: reduced sleep need often precedes full mania.`,
        `${term("Lithium", "鋰鹽")} remains central in relapse and suicide-risk discussions.`,
        "Substance use both mimics and worsens polarity shifts.",
      ]),
    ],
  },
  schizophrenia: {
    summary: `Track ${term("Positive symptoms", "正性症狀")}, ${term("Negative symptoms", "負性症狀")}, and ${term("Cognitive impairment", "認知缺損")} separately—not only whether hallucinations stopped.`,
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: "Nosology",
        text: "Criteria are not reproduced. Assessment includes course, function, substances, neurology, and affective psychosis.",
      },
      { type: "h2", id: "axes", text: "Three clinical axes" },
      {
        type: "table",
        headers: ["Axis", "Examples", "Cross-links"],
        rows: [
          [term("Positive symptoms", "正性症狀"), `${term("Hallucinations", "幻覺")}, ${term("Delusions", "妄想")}`, "D2 modulation; CBT for psychosis"],
          [term("Negative symptoms", "負性症狀"), `${term("Avolition", "動機缺乏")}, ${term("Anhedonia", "缺乏快感")}`, "Do not attribute all of this to sedation or depression"],
          [term("Cognitive impairment", "認知缺損"), term("Executive Dysfunction", "執行功能障礙"), "Limbic–PFC work and rehabilitation, not only more medication"],
        ],
      },
      p(`For ${term("Treatment-resistant schizophrenia", "治療阻抗思覺失調症")}, confirm diagnosis, adherence, substances, and adequate trials before ${term("Clozapine", "氯氮平")}.`),
    ],
  },
  "generalized-anxiety-disorder": {
    summary: `${term("Worry", "擔心")} is used as a duty and a disaster-prevention strategy. ${term("Intolerance of uncertainty", "對不確定性無法耐受")} guides treatment better than “nervousness.”`,
    blocks: [
      p(`The ${term("Generalized Anxiety Disorder", "廣泛性焦慮症")} loop is threat overestimation → worry → brief control → no learning that life can proceed without worry. Benzodiazepines can become a ${term("Safety behavior", "安全行為")}.`),
      ul([
        `Versus ${term("OCD", "強迫症")}: GAD worry is life-themed; OCD often has intrusion plus ritual.`,
        "Comorbid depression is common; rumination vs worry differ in time orientation (past vs future).",
      ]),
    ],
  },
  "ocd-disorder": {
    summary: `${term("Obsession", "強迫思考")} raises distress; ${term("Compulsion", "強迫行為")} briefly relieves it and strengthens the loop. ERP is the psychotherapy core; the CSTC circuit is a common neural model.`,
    blocks: [
      p(`${term("Obsessive-Compulsive Disorder", "強迫症")} is not tidiness or perfectionism. Draw Obsession → Distress → Compulsion → Relief, including avoidance and reassurance seeking.`),
      {
        type: "callout",
        variant: "clinical",
        title: "SSRI context",
        text: "OCD pharmacology often involves relatively higher SSRI doses and long enough trials, still individualized, with ERP as the skill backbone. No dosing formulas here.",
      },
    ],
  },
  ptsd: {
    summary: `Re-experiencing, avoidance, cognitive-affective change, and hyperarousal. The order of stabilization versus memory work is an ethics issue, not a style preference.`,
    blocks: [
      p(`${term("PTSD", "創傷後壓力症")} memory is not simply “remembering too well”: intrusive over-retrieval can coexist with overgeneral autobiography. ${term("Memory Reconsolidation", "記憶再鞏固")} is a shared biological language for EMDR and exposure.`),
      ul([
        "Present safety, substances, and dissociation severity decide whether reprocessing can start.",
        `${term("Hyperarousal", "高警覺")} is amplified by caffeine, sleep loss, and pain.`,
      ]),
    ],
  },
  adhd: {
    summary: `A developmental difference in executive control and delay of reward. In adults it often shows as procrastination, emotional impulsivity, and self-criticism rather than classroom hyperactivity.`,
    blocks: [
      p(`Differentiate ${term("ADHD", "注意力不足過動症")} from anxious threat monitoring, depressive slowing, sleep loss, and hypomania. Functional analysis includes environment fit, not only “try harder.”`),
    ],
  },
  "substance-use-disorder": {
    summary: `From positive reinforcement toward negative reinforcement (removing withdrawal and emptiness). Imbalance between the ${term("Reward System", "獎賞迴路")} and prefrontal control is the core map.`,
    blocks: [
      p(`${term("Substance Use Disorder", "物質使用疾患")} is not a moral failure. ${term("Incentive sensitization", "誘因敏感化")} lets cues fire ${term("Craving", "渴求")} after liking has gone. Pain killers and alcohol are ubiquitous in psychiatric settings.`),
    ],
  },
  "major-ncd-alzheimer": {
    summary: `Typical profile: episodic memory and orientation first. Pharmacology sits in neurodegeneration, after reversible causes are excluded.`,
    blocks: [
      p(`Before ${term("Major Neurocognitive Disorder", "重度神經認知疾患")}, address delirium, anticholinergic burden, depression, sleep, and metabolic issues. The teaching profile of Alzheimer disease is episodic memory, orientation, then executive decline.`),
    ],
  },
  "borderline-personality-disorder": {
    summary: `Emotion dysregulation, abandonment sensitivity, and impulsivity. DBT skills and “loss of control under high arousal” in limbic–PFC circuitry share a language.`,
    blocks: [
      p(`Medication in ${term("Borderline Personality Disorder", "邊緣型人格疾患")} usually targets comorbidity and crisis symptoms, not “curing personality.” Life risk and therapy-interfering behavior first, then trauma memory.`),
    ],
  },
  "insomnia-disorder": {
    summary: `Conditioned arousal and unhelpful sleep effort. CBT-I first; medication is a time-limited tool.`,
    blocks: [
      p(`${term("Insomnia Disorder", "失眠疾患")} amplifies pain, craving, rumination, and suicide risk. Map ${term("Sleep Architecture", "睡眠結構")}: initiation, maintenance, early waking, circadian delay.`),
    ],
  },
  "mood-disorders-entry": {
    summary: `${term("Mood Disorders", "情緒疾患")} were split in DSM-5. This doorway sorts bipolar versus depressive paths, then links to symptoms and pharmacology.`,
    blocks: [
      p(`Clinicians still say ${term("Mood Disorders", "情緒疾患")}. DSM-5 split them into ${term("Bipolar and Related Disorders", "雙相及相關疾患")} and ${term("Depressive Disorders", "憂鬱疾患")}. Before illness studies, ask: independent mania/hypomania? current polarity? psychosis? mixed features?`),
      { type: "ol", items: [
        "Clear mania → Bipolar I pathway.",
        "Hypomania only → still bipolar-related, not a long unipolar strategy.",
        "No upward polarity → depressive disorders, but re-ask at every relapse.",
      ] },
    ],
  },
  anhedonia: {
    summary: `Reduced anticipatory or consummatory pleasure. Shared currency of depression, negative symptoms, and substance withdrawal.`,
    blocks: [
      p(`Split ${term("Anhedonia", "缺乏快感")} into wanting versus liking. Wanting sits nearer ${term("Dopamine", "多巴胺")} incentive salience; liking nearer opioid / hedonic hotspots. “Just go have fun” hits the wrong mechanism.`),
      {
        type: "table",
        headers: ["Picture", "Likely mechanism", "Direction"],
        rows: [
          ["Cannot start anything", term("Wanting / mesolimbic DA", "欲求／中腦邊緣多巴胺"), "Tiny-step behavioral activation; lower effort cost"],
          ["Activity feels hollow", "Hedonic liking down", "Check substances, antipsychotic sedation, sleep"],
          ["Only addiction cues still feel like something", term("Incentive sensitization", "誘因敏感化"), "Cue management + Reward System note"],
        ],
      },
    ],
  },
  hallucinations: {
    summary: `Perception without a matching external stimulus. Auditory hallucinations are common in schizophrenia spectrum, but systematically exclude substances, neurology, trauma, and affective psychosis.`,
    blocks: [
      p(`Record ${term("Hallucinations", "幻覺")} by channel, content, insight, command quality, and context. ${term("Hypnagogic", "入睡前")} hallucinations are not schizophrenia.`),
      ul([
        `${term("Auditory verbal hallucinations", "言語性聽幻覺")}: D2 plus CBT for psychosis (relationship to the voice, not a truth debate).`,
        "Visual hallucinations raise delirium, Lewy body, and substance weights.",
        `${term("PTSD", "創傷後壓力症")} flashbacks versus hallucinations: trauma timestamp and trigger.`,
      ]),
    ],
  },
  delusions: {
    summary: `Fixed false beliefs. Function, distress, and risk of action matter more than winning an argument in the room.`,
    blocks: [
      p(`${term("Delusions", "妄想")} can be taught as mis-assigned prediction error and salience (Kapur’s aberrant salience). Treat dangerous action and sleep first, then belief work.`),
    ],
  },
  "executive-dysfunction": {
    summary: `Failures of inhibition, shifting, and updating. Seen in ADHD, depression, schizophrenia, NCD, and sleep loss—mechanisms differ, so treatments differ.`,
    blocks: [
      p(`${term("Executive Dysfunction", "執行功能障礙")} is not laziness. Ask: developmental (ADHD), state (depression, mania, sleep), degenerative (NCD), or anticholinergic burden?`),
      ul([
        `${term("Inhibition", "抑制")} failure: impulsivity, self-harm, explosion.`,
        `${term("Shifting", "轉換")} failure: stuck in rumination or obsession.`,
        `${term("Updating", "更新")} failure: cannot hold the plan from the last session.`,
      ]),
    ],
  },
  rumination: {
    summary: `Repetitive, abstract, “why me” thinking that occupies working memory and blocks problem solving.`,
    blocks: [
      p(`${term("Rumination", "反芻")} differs from GAD ${term("Worry", "擔心")}: rumination looks backward at worth; worry looks forward at disaster. Both sustain HPA activation and insomnia.`),
    ],
  },
  hyperarousal: {
    summary: `Startle, irritability, scanning for threat. PTSD, panic, pain, and withdrawal can share this autonomic channel.`,
    blocks: [
      p(`Do not chart ${term("Hyperarousal", "高警覺")} as “an irritable personality.” Measure BP, sleep, caffeine, pain, and substances before choosing exposure, medication, or both.`),
    ],
  },
  dissociation: {
    summary: `A break in connection to the present, body, or self. Common on the trauma spectrum and a red light for memory reprocessing.`,
    blocks: [
      p(`During ${term("Dissociation", "解離")}, reconsolidation work may not encode. Grounding and window of tolerance first, then EMDR or exposure.`),
    ],
  },
  "anxious-apprehension": {
    summary: `Ongoing scan of future threat. Shared by GAD, panic anticipation, and pain catastrophizing.`,
    blocks: [
      p(`${term("Anxious apprehension", "焦慮性預期")} is maintained by safety behaviors. The fix is inhibitory learning, not a guarantee of zero anxiety.`),
    ],
  },
  "psychomotor-change": {
    summary: `Pathological change in speed and movement. Retardation raises melancholia and medical differentials; agitation raises mixed features, akathisia, and suicide risk.`,
    blocks: [
      p(`If the person cannot sit still, separate ${term("Akathisia", "靜坐不能")}, ${term("Mania", "躁狂")}, ${term("Anxiety", "焦慮")}, and ${term("Withdrawal", "戒斷")}. Mislabeling D2 side effects as anxiety leads to stacking the wrong drugs.`),
    ],
  },
  avolition: {
    summary: `Reduced drive to start goal-directed action. Easy to confuse with schizophrenia negative symptoms, depression, and drug sedation.`,
    blocks: [
      p(`${term("Avolition", "動機缺乏")} often coexists with anhedonia but the moves differ: structured initiation and less sedation versus restoring accessible reward.`),
    ],
  },
  craving: {
    summary: `Cue-ignited urge to use. The clinical verb of addiction, not a brief failure of willpower.`,
    blocks: [
      p(`${term("Craving", "渴求")} maps onto cue-induced mesolimbic wanting. Record trigger, peak time, and substitute behavior.`),
    ],
  },
  "cognitive-rigidity": {
    summary: `Difficulty shifting set. Seen in OCD, autism, frontostriatal disease, and severe anxiety.`,
    blocks: [
      p(`${term("Cognitive rigidity", "認知僵直")} is ritual persistence in OCD and set-shifting failure in NCD. Do not use the same “challenge the thought” script for both.`),
    ],
  },
  "sleep-fragmentation": {
    summary: `Repeated micro-arousals that break slow-wave and REM continuity. An amplifier of mood, pain, trauma, and neurodegeneration.`,
    blocks: [
      p(`${term("Sleep fragmentation", "睡眠破碎")} collapses next-day executive function and raises pain and craving. Sleep logs before hypnotics.`),
    ],
  },
  "pain-catastrophizing": {
    summary: `Magnification, rumination, and helplessness about pain. A psychological interface for escalating pain killers and disability.`,
    blocks: [
      p(`${term("Pain catastrophizing", "疼痛災難化")} turns nociception into a threat story. SNRI, selected anticonvulsant analgesics, and CBT for pain belong in the same conversation—or opioids become the only tool.`),
    ],
  },
  "d2-modulation": {
    summary: `The shared core of antipsychotics is dopamine D2. Occupancy explains some efficacy and also EPS and prolactin.`,
    blocks: [
      p(`${term("Antipsychotics", "抗精神病藥物")} are receptor fingerprints, not “strong versus weak.” First-generation agents are high D2 occupancy; second-generation agents add 5-HT2A and diverge on metabolic and sedation profiles. ${term("Partial agonists", "部分促效劑")} behave like antagonists when dopamine is high and spare some signaling when it is low; akathisia remains common.`),
      {
        type: "table",
        caption: "Teaching fingerprints, not a Ki table or a dosing formula.",
        headers: ["Strategy", "Clinical trade-off"],
        rows: [
          ["High D2 occupancy", `${term("EPS", "錐體外徑症狀")}, prolactin`],
          ["H1 / M1 / α1 burden", "Sedation, anticholinergic effects, hypotension, cognitive fog"],
          ["D2 partial agonism", `${term("Akathisia", "靜坐不能")}; often lighter metabolic load`],
        ],
      },
    ],
  },
  clozapine: {
    summary: `The key option in treatment-resistant schizophrenia. Multi-receptor, relatively loose D2; blood and gut hypomotility monitoring are conditions of use.`,
    blocks: [
      p(`${term("Clozapine", "氯氮平")} has a special place in ${term("Treatment-resistant schizophrenia", "治療阻抗思覺失調症")} and suicide risk. Costs include agranulocytosis, myocarditis, severe constipation/ileus, metabolic load, and seizure threshold. No monitoring plan means no competent clozapine treatment.`),
    ],
  },
  "opioids-reward": {
    summary: `μ-opioid analgesia also hijacks liking/wanting. Psychiatry must see pain, anhedonia, and opioid use disorder together.`,
    blocks: [
      p(`${term("Opioid analgesics", "鴉片類止痛藥")} act at ${term("μ-opioid receptors", "μ 鴉片受體")} and alter wanting on the VTA–NAc path. Chronic use brings tolerance, hyperalgesia, and withdrawal that feed both pain and craving.`),
      ul([
        "The educational goal is risk stratification and a cross-specialty pain plan, not instructions for use.",
        `${term("Overdose", "過量")} risk rises with benzodiazepines, alcohol, and dose.`,
        "In trauma–pain comorbidity, opioids alone rarely treat hyperarousal.",
      ]),
    ],
  },
  gabapentinoids: {
    summary: `Bind the α2δ subunit of voltage-gated calcium channels; used in some neuropathic pain. Sedation, edema, and misuse belong in the psychiatric review.`,
    blocks: [
      p(`${term("Gabapentin", "加巴噴丁")} and ${term("Pregabalin", "普瑞巴林")} are not direct GABA agonists. Off-label anxiety/insomnia use must be paired with a frank misuse discussion.`),
    ],
  },
  "snri-pain-interface": {
    summary: `Serotonin–norepinephrine reuptake inhibition sits at the depression–anxiety–chronic pain interface.`,
    blocks: [
      p(`${term("SNRI", "血清素—去甲腎上腺素再回收抑制劑")} can help descending pain modulation and mood together. Still monitor blood pressure, discontinuation syndrome, and bleeding risk. No dosing formulas.`),
    ],
  },
  "ketamine-nmda": {
    summary: `NMDA-related rapid antidepressant and pain research points to glutamate and synaptic plasticity, not the slow classic monoamine story alone.`,
    blocks: [
      p(`${term("Ketamine", "氯胺酮")} / esketamine class work is discussed in treatment-resistant depression and some acute suicidal-ideation pathways. Teaching mechanisms include the ${term("NMDA receptor", "NMDA 受體")}, GABA interneurons, and later synaptic plasticity. Screen dissociation, blood pressure, substance history, and misuse.`),
    ],
  },
  "cholinesterase-and-cognition": {
    summary: `Raise synaptic acetylcholine for symptomatic cognitive pharmacology in Alzheimer-type NCD—not a cure.`,
    blocks: [
      p(`${term("Acetylcholinesterase inhibitors", "乙醯膽鹼酶抑制劑")} may yield limited cognitive and functional benefit. GI effects, bradycardia, and vivid dreams are common. Anticholinergic drugs cancel the point.`),
    ],
  },
  "memantine-nmda": {
    summary: `Non-competitive NMDA modulation discussed in moderate–severe Alzheimer disease.`,
    blocks: [
      p(`${term("Memantine", "美金剛")} tries to balance pathologic glutamate excitotoxicity with physiologic NMDA signaling. Dizziness and confusion must be separated from delirium.`),
    ],
  },
  "anti-amyloid": {
    summary: `Monoclonal and related disease-modifying strategies target pathologic protein, not classic psychiatric symptom receptors. ARIA and indication selection are specialty workflows.`,
    blocks: [
      p(`Anti-${term("Amyloid", "類澱粉")} therapy moves NCD from pure symptom management into disease modification. Psychiatry’s role is early recognition, reversible-cause workup, and honest uncertainty with families.`),
    ],
  },
  "dopamine-pathways-drugs": {
    summary: `Levodopa and agonists improve movement and may bring impulse control and psychotic symptoms—the neurology–psychiatry border.`,
    blocks: [
      p(`${term("Levodopa", "左旋多巴")} uses the nigrostriatal path for motor benefit; spill into mesolimbic circuits can yield impulse-control disorders, dopamine dysregulation, and hallucinations.`),
    ],
  },
  "cbt-neuroplasticity": {
    summary: `CBT is not positive thinking. Prediction error, repetition, and sleep consolidation change weights in threat-appraisal and reward networks.`,
    blocks: [
      p(`The biological question in ${term("Cognitive Behavioral Therapy", "認知行為治療")} (CBT) is how talk changes brain. A usable answer is ${term("Experience-dependent plasticity", "經驗依賴可塑性")}: experiments create ${term("Prediction error", "預測誤差")}; repetition and sleep write it into synapses.`),
      ul([
        `${term("Exposure / inhibitory learning", "暴露／抑制學習")}: a new safety association inhibits the old threat link.`,
        `${term("Behavioral activation", "行為啟動")}: raise accessible reward against anhedonia’s effort cost.`,
        "Homework is dose; without it, plasticity barely happens.",
      ]),
    ],
  },
  "emdr-reconsolidation": {
    summary: `In the labile window after retrieving a trauma memory, dual attention and new information let it restabilize with less distress.`,
    blocks: [
      p(`One biological hypothesis for ${term("EMDR", "眼動脫敏與歷程處理")} is ${term("Memory reconsolidation", "記憶再鞏固")}: consolidated episodic memory is briefly unstable after retrieval. ${term("Dual attention", "雙重注意力")} plus corrective information can lower SUD and update beliefs.`),
      { type: "ol", items: [
        "Stabilize: window of tolerance, safety, substances.",
        "Retrieve the target: image, cognition, body.",
        "Reprocess with dual attention until distress falls.",
        "Re-evaluate and integrate into daily life.",
      ] },
    ],
  },
  "tms-ect": {
    summary: `Electric and magnetic fields change cortical excitability and network coupling. TMS is more focal; ECT remains powerful in severe depression and catatonia.`,
    blocks: [
      { type: "h2", id: "tms", text: "rTMS / iTBS" },
      p(`${term("Transcranial magnetic stimulation", "經顱磁刺激")} (TMS) induces cortical current. High-frequency or ${term("intermittent theta burst stimulation", "間歇 theta 爆發刺激")} (iTBS) of left ${term("DLPFC", "背外側前額葉")} is the most discussed protocol in treatment-resistant depression.`),
      { type: "h2", id: "ect", text: "ECT" },
      p(`${term("Electroconvulsive therapy", "電痙攣治療")} (ECT) induces a therapeutic seizure and remains pivotal in severe, psychotic, or catatonic depression and some acute suicide-risk settings. It is not “stronger TMS.”`),
    ],
  },
  neurofeedback: {
    summary: `Operant conditioning on live brain signals. The principle is learning and plasticity; evidence varies by indication, so consent must be honest.`,
    blocks: [
      p(`${term("Neurofeedback", "神經生理回饋")} lets people see EEG or other metrics and train toward a target state. It is learning, not a “brain-wave correction machine.”`),
      ul([
        "Consent should state evidence grade, session count, cost, and when to stop.",
        "It does not replace risk assessment or established first-line care.",
      ]),
    ],
  },
  "dopamine-pathways": {
    summary: `Four paths—mesolimbic, mesocortical, nigrostriatal, tuberoinfundibular—map psychosis, motivation, movement, and prolactin.`,
    blocks: [
      {
        type: "table",
        headers: ["Path", "Rough function", "Clinical shadow"],
        rows: [
          [term("Mesolimbic", "中腦邊緣"), "Salience, wanting, reward", "Positive symptoms, craving, incentive sensitization"],
          [term("Mesocortical", "中腦皮質"), "Executive function, motivation, working memory", "Negative/cognitive symptoms; heavy D2 blockade can worsen them"],
          [term("Nigrostriatal", "黑質紋狀體"), "Action selection", "EPS, parkinsonism"],
          [term("Tuberoinfundibular", "結節漏斗"), "Prolactin brake", "Hyperprolactinemia"],
        ],
      },
      p(`${term("Dopamine", "多巴胺")} is closer to “this is worth noticing / worth effort” than a happiness molecule. The map must explain why an antipsychotic can quiet hallucination and also flatten, stiffen, and change sexual and menstrual function.`),
    ],
  },
  "reward-system": {
    summary: `VTA–NAc–PFC. Wanting can still be cue-lit after liking is gone. This is the floor under substance use and opioid analgesia.`,
    blocks: [
      p(`The ${term("Reward system", "獎賞迴路")} core is ${term("Ventral tegmental area", "腹側被蓋區")} (VTA) to ${term("Nucleus accumbens", "伏隔核")}, gated by ${term("Prefrontal cortex", "前額葉皮質")}. Modern ${term("Addiction", "成癮")} teaching uses binge/intoxication, withdrawal/negative affect, and preoccupation/anticipation.`),
    ],
  },
  "serotonin-system": {
    summary: `Broad regulation of mood, anxiety, sleep, appetite, and platelets. SSRI effects are not “the brain lacked serotonin.”`,
    blocks: [
      p(`${term("Serotonin", "血清素")} (5-HT) cell bodies sit mainly in raphe nuclei. Receptor subtypes explain why the same “more serotonin” story yields early anxiety, sexual effects, gut effects, or sleep change. Downstream plasticity may matter more than instant mood.`),
    ],
  },
  "gaba-glutamate": {
    summary: `The brain’s main inhibitory and excitatory currencies. Benzodiazepines, ketamine, memantine, some anticonvulsants, and seizure risk all use this map.`,
    blocks: [
      p(`${term("Glutamate", "麩胺酸")} is the main excitatory transmitter; ${term("GABA", "γ-胺基丁酸")} the main inhibitory one. E/I balance is used in anxiety, epilepsy, gamma-oscillation hypotheses in schizophrenia, and how TMS changes excitability.`),
    ],
  },
  "hpa-axis": {
    summary: `Hypothalamus–pituitary–adrenal. Chronic cortisol signaling and depression, trauma, insomnia, and pain sensitization maintain one another.`,
    blocks: [
      p(`The ${term("HPA axis", "下視丘—腦垂體—腎上腺軸")}: PVN releases CRH → ACTH → cortisol. Acute activation helps coping; chronic load hits hippocampus, sleep, and immunity. PTSD cortisol findings are mixed; teach “stress-system dysregulation,” not one-way excess.`),
    ],
  },
  "limbic-pfc": {
    summary: `Dialogue among amygdala, hippocampus, ACC, and PFC is the anatomy of emotion regulation, exposure learning, and executive control.`,
    blocks: [
      p(`The ${term("Limbic system", "邊緣系統")} (especially ${term("Amygdala", "杏仁核")} and ${term("Hippocampus", "海馬")}) tags threat and context quickly; ${term("Prefrontal cortex", "前額葉皮質")} evaluates, inhibits, and holds goals. High arousal drops PFC efficiency—this is a shared story for BPD explosions, PTSD flashbacks, and why skills are trained in a lower-arousal window first.`),
    ],
  },
  "sleep-architecture": {
    summary: `Alternation of NREM (including slow-wave sleep) and REM. Almost every psychiatric symptom and plasticity process passes through this night.`,
    blocks: [
      p(`${term("Sleep architecture", "睡眠結構")} is N1–N3 plus REM cycles. ${term("Slow-wave sleep", "慢波睡眠")} relates to memory consolidation; REM to affective memory. Antidepressants often suppress REM; alcohol fragments the second half of the night; reduced sleep need in mania is an alarm.`),
    ],
  },
  "monoamine-overview": {
    summary: `A teaching start: dopamine, serotonin, norepinephrine. Useful, incomplete—glutamate and plasticity still have to join.`,
    blocks: [
      p(`${term("Monoamines", "單胺")} are the entry language of psychopharmacology: DA (motivation and salience), 5-HT (broad modulation), NE (alerting and attention). Rapid antidepressants and TMS force GABA/glutamate and neuroplasticity onto the same blackboard.`),
    ],
  },
};

export function resolveNote(note: Note, locale: Locale) {
  if (locale === "en") {
    const pack = noteEn[note.slug];
    return {
      title: note.en,
      kicker: note.zh,
      summary: applyTerms(pack?.summary ?? note.summary, "en"),
      blocks: localizeBlocks(pack?.blocks ?? note.blocks, "en"),
    };
  }
  return {
    title: bilingualTitle(note.zh, note.en, "zh"),
    kicker: note.en,
    summary: applyTerms(note.summary, "zh"),
    blocks: localizeBlocks(note.blocks, "zh"),
  };
}
