import type {
  BookGenreNode,
  LocaleText,
  ProjectAreaNode,
  SessionNode,
  TopicNode,
} from "@/lib/types";

export const projectKinds = [
  {
    slug: "programmes" as const,
    title: { zh: "計劃", en: "Programmes" } satisfies LocaleText,
    summary: {
      zh: "正在進行或曾經策劃的計劃、工作坊與協作。",
      en: "Programmes, workshops, and collaborations in progress or completed.",
    },
  },
  {
    slug: "resources" as const,
    title: { zh: "資源", en: "Resources" } satisfies LocaleText,
    summary: {
      zh: "整理過的工具、閱讀清單、機構與公開資料。",
      en: "Curated tools, reading lists, organisations, and public materials.",
    },
  },
];

export const projectAreas: ProjectAreaNode[] = [
  {
    slug: "special-needs",
    title: { zh: "特殊教育需要", en: "Special Needs" },
    summary: {
      zh: "圍繞特殊教育需要 (SEN) 的計劃與資源：學習差異、課堂支援與家庭協作。",
      en: "Programmes and resources around special educational needs: learning difference, classroom support, and family partnership.",
    },
    color: "#2f7a7a",
  },
  {
    slug: "mental-health",
    title: { zh: "精神健康", en: "Mental Health" },
    summary: {
      zh: "精神健康推廣、心理教育與社區資源，面向公眾與協作者。",
      en: "Mental health promotion, psychoeducation, and community resources for the public and collaborators.",
    },
    color: "#2e3d6d",
  },
];

export const studySessions: SessionNode[] = [
  {
    slug: "educational",
    title: { zh: "教育", en: "Educational" },
    kicker: { zh: "學習如何發生", en: "How learning happens" },
    summary: {
      zh: "從特殊教育需要、專注力、執行功能到衡鑑：把學習困難放回教室與發展脈絡。",
      en: "From special educational needs and attention to executive function and assessment: place learning difficulties back in classroom and developmental context.",
    },
    audience: { zh: "教師、家長、教育工作者", en: "Teachers, parents, educators" },
    color: "#2f7a7a",
    topics: [
      {
        slug: "special-needs",
        title: { zh: "特殊教育需要", en: "Special Needs" },
        summary: {
          zh: "特殊教育需要不是單一診斷，而是學習、溝通、感官與社交支援的光譜。",
          en: "Special educational needs is not one diagnosis, but a spectrum of learning, communication, sensory, and social support.",
        },
      },
      {
        slug: "adhd",
        title: { zh: "專注力不足／過度活躍症", en: "ADHD" },
        summary: {
          zh: "注意力、衝動控制與動機系統如何在課堂與日常生活中表現；不是「不夠努力」。",
          en: "How attention, impulse control, and motivational systems show up in class and daily life — not a lack of effort.",
        },
      },
      {
        slug: "executive-function",
        title: { zh: "執行功能", en: "Executive Function" },
        summary: {
          zh: "工作記憶、抑制控制與認知彈性：把「做得到」與「想得到」之間的橋樑畫出來。",
          en: "Working memory, inhibitory control, and cognitive flexibility: the bridge between knowing and doing.",
        },
      },
      {
        slug: "learning-difficulties",
        title: { zh: "學習困難", en: "Learning Difficulties" },
        summary: {
          zh: "讀寫、數學、語言與非語文學習困難的重疊與差異，以及教學上的切入點。",
          en: "Overlaps and differences among literacy, maths, language, and nonverbal learning difficulties, and where teaching can start.",
        },
      },
      {
        slug: "assessment",
        title: { zh: "衡鑑", en: "Assessment" },
        summary: {
          zh: "心理教育衡鑑如何回答教學問題：測什麼、不測什麼、報告如何回到課堂。",
          en: "How psychoeducational assessment answers teaching questions: what to measure, what not to, and how reports return to the classroom.",
        },
      },
    ],
  },
  {
    slug: "clinical",
    title: { zh: "臨床", en: "Clinical" },
    kicker: { zh: "分類、介入與疾患", en: "Classification, intervention, disorders" },
    summary: {
      zh: "面向臨床思考的筆記：分類系統、介入層級與主要疾患群。不作處方、不重製準則原文。",
      en: "Notes for clinical thinking: classification, levels of intervention, and major disorder groups. Not a prescription, and not a reproduction of criteria text.",
    },
    audience: { zh: "臨床學習者與專業對話", en: "Clinical learners and professional dialogue" },
    color: "#b44a55",
    topics: [
      {
        slug: "dsm-5",
        title: { zh: "精神疾病診斷與統計手冊第五版", en: "DSM-5" },
        summary: {
          zh: "把 DSM-5 當地圖而不是聖經：類群邏輯、共病、與臨床判斷的位置。",
          en: "Treat DSM-5 as a map, not scripture: chapter logic, comorbidity, and the place of clinical judgment.",
        },
      },
      {
        slug: "interventions",
        title: { zh: "介入", en: "Interventions" },
        summary: {
          zh: "從侵入性到非侵入性、從心理治療到藥物：比較層級、適應與倫理界線。",
          en: "From intrusive to non-intrusive, psychotherapy to medication: compare levels, fit, and ethical bounds.",
        },
        children: [
          {
            slug: "intrusive",
            title: { zh: "侵入性介入", en: "Intrusive" },
            summary: {
              zh: "需要進入身體或改變腦部生理較直接的介入，例如電痙攣治療與部分腦刺激。",
              en: "Interventions that more directly enter the body or alter brain physiology, such as ECT and some brain stimulation.",
            },
          },
          {
            slug: "non-intrusive",
            title: { zh: "非侵入性介入", en: "Non-intrusive" },
            summary: {
              zh: "生活節奏、心理教育、環境調整與低強度支持：先穩，再深。",
              en: "Routines, psychoeducation, environmental change, and low-intensity support: stabilise first, then go deeper.",
            },
          },
          {
            slug: "psychotherapy",
            title: { zh: "心理治療", en: "Psychotherapy" },
            summary: {
              zh: "認知行為、動力、人本、家庭與第三波取向：機制比學派標籤更重要。",
              en: "CBT, psychodynamic, humanistic, family, and third-wave approaches: mechanisms matter more than school labels.",
            },
          },
          {
            slug: "medications",
            title: { zh: "藥物", en: "Medications" },
            summary: {
              zh: "藥理筆記作為思考索引：作用系統、常見考量與對話方式，不是處方。",
              en: "Pharmacology notes as a thinking index: systems, common considerations, and how to talk about them — not a prescription.",
            },
          },
        ],
      },
      {
        slug: "depression",
        title: { zh: "憂鬱症疾患", en: "Depression Disorder" },
        summary: {
          zh: "心情、動機、身體節奏與認知三角如何糾纏；區分悲傷、耗竭與臨床憂鬱。",
          en: "How mood, motivation, bodily rhythm, and the cognitive triad intertwine; distinguish grief, burnout, and clinical depression.",
        },
      },
      {
        slug: "anxiety",
        title: { zh: "焦慮症疾患", en: "Anxiety Disorder" },
        summary: {
          zh: "威脅偵測系統過度啟動時的身體與認知迴路，以及暴露與安全行為的邏輯。",
          en: "Body and cognitive loops when the threat-detection system is overactive, and the logic of exposure versus safety behaviour.",
        },
      },
      {
        slug: "personality-disorders",
        title: { zh: "人格疾患", en: "Personality Disorders" },
        summary: {
          zh: "關係模式、自我感與情緒調節的長期結構；分類與特質向度可以並讀。",
          en: "Long-standing structures of relating, self, and emotion regulation; categories and trait dimensions can be read together.",
        },
      },
      {
        slug: "psychotic-disorders",
        title: { zh: "精神病性疾患", en: "Psychotic Disorders" },
        summary: {
          zh: "現實檢驗、妄想與幻覺的經驗結構，以及早期介入與 stigma 的倫理。",
          en: "The experiential structure of reality testing, delusion, and hallucination, plus the ethics of early intervention and stigma.",
        },
      },
    ],
  },
  {
    slug: "mental-health",
    title: { zh: "精神健康", en: "Mental Health" },
    kicker: { zh: "給一般公眾", en: "For the general public" },
    summary: {
      zh: "把臨床語言翻譯成日常可用的理解：焦慮、情緒、動機、睡眠、行為與香港資源。",
      en: "Translate clinical language into everyday understanding: anxiety, emotion, motivation, sleep, behaviour, and Hong Kong resources.",
    },
    audience: { zh: "一般公眾、學生、照顧者", en: "General public, students, carers" },
    color: "#5a7184",
    topics: [
      {
        slug: "anxiety-rumination",
        title: { zh: "焦慮與反芻", en: "Anxiety & Rumination" },
        summary: {
          zh: "擔心是試圖控制未來；反芻是試圖改寫過去。兩者都會耗盡注意力。",
          en: "Worry tries to control the future; rumination tries to rewrite the past. Both drain attention.",
        },
      },
      {
        slug: "emotion-regulation",
        title: { zh: "情緒調節", en: "Emotion Regulation" },
        summary: {
          zh: "情緒不是要消滅的敵人，而是需要被命名、承載與選擇回應的訊號。",
          en: "Emotion is not an enemy to extinguish, but a signal to name, hold, and respond to by choice.",
        },
      },
      {
        slug: "motivation",
        title: { zh: "動機", en: "Motivation" },
        summary: {
          zh: "從外在獎賞到自主、勝任與關聯：動機系統比「意志力」更接近科學。",
          en: "From external reward to autonomy, competence, and relatedness: motivational systems are closer to science than 'willpower'.",
        },
      },
      {
        slug: "sleep",
        title: { zh: "睡眠", en: "Sleep" },
        summary: {
          zh: "睡眠是情緒與記憶的夜間維修。作息、光線與 rumination 都會改寫這一晚。",
          en: "Sleep is overnight maintenance for emotion and memory. Schedule, light, and rumination rewrite the night.",
        },
      },
      {
        slug: "behaviour",
        title: { zh: "行為", en: "Behaviour" },
        summary: {
          zh: "行為是環境、習慣與情緒的交會。改變行為往往比先改變想法更容易起步。",
          en: "Behaviour is where environment, habit, and emotion meet. Changing behaviour is often an easier start than changing thoughts first.",
        },
      },
      {
        slug: "procrastination",
        title: { zh: "拖延", en: "Procrastination" },
        summary: {
          zh: "拖延多半不是懶，而是情緒調節失敗：用迴避換取短暫的不安下降。",
          en: "Procrastination is rarely laziness. It is often failed emotion regulation: avoidance buys a brief drop in discomfort.",
        },
      },
      {
        slug: "hk-resources",
        title: { zh: "香港精神健康資源", en: "HK Mental Health Resources" },
        summary: {
          zh: "公開熱線、機構與求援路徑。數字會變，請以官方最新資訊為準，並可在後台更新。",
          en: "Public hotlines, organisations, and help-seeking paths. Numbers change — verify against official sources and update in admin.",
        },
      },
    ],
  },
  {
    slug: "neuroscience",
    title: { zh: "神經科學", en: "Neuroscience" },
    kicker: { zh: "大腦如何生病、如何學習", en: "How brains learn and how they suffer" },
    summary: {
      zh: "成癮、病因、神經發展與神經退化：把精神現象放回迴路、發展與時間軸。",
      en: "Addiction, etiology, neurodevelopment, and neurodegeneration: place mental phenomena back in circuits, development, and time.",
    },
    audience: { zh: "想把臨床接回大腦的讀者", en: "Readers connecting clinic back to the brain" },
    color: "#2e3d6d",
    topics: [
      {
        slug: "addiction",
        title: { zh: "成癮", en: "Addiction" },
        summary: {
          zh: "獎賞預測誤差、習慣化與渴求：成癮是學習系統被劫持，而不只是品格問題。",
          en: "Reward prediction error, habit, and craving: addiction hijacks learning systems; it is not merely a character problem.",
        },
      },
      {
        slug: "psychiatric-etiology",
        title: { zh: "精神疾患病因", en: "Psychiatric Etiology" },
        summary: {
          zh: "基因、環境、發展時機與壓力交互：病因是網絡，不是單一開關。",
          en: "Genes, environment, developmental timing, and stress interact: etiology is a network, not a single switch.",
        },
      },
      {
        slug: "neurodevelopmental",
        title: { zh: "神經發展疾患", en: "Neurodevelopmental Disorder" },
        summary: {
          zh: "大腦在發展窗口中走了不同路徑：ADHD、自閉、學習疾患都要放回發展時間。",
          en: "The brain takes different paths in developmental windows: ADHD, autism, and learning disorders belong back on a developmental timeline.",
        },
      },
      {
        slug: "neurodegeneration",
        title: { zh: "神經退化", en: "Neurodegeneration" },
        summary: {
          zh: "記憶、運動與人格的緩慢流失：臨床表徵、照顧倫理與早期辨識。",
          en: "The slow loss of memory, movement, and personality: clinical signs, care ethics, and earlier recognition.",
        },
      },
    ],
  },
  {
    slug: "psychology",
    title: { zh: "心理學", en: "Psychology" },
    kicker: { zh: "走進傳統心理學", en: "Into traditional psychology" },
    summary: {
      zh: "先把經典理論讀厚：人格、動機、測量與發展。臨床之前，先有心理學的骨架。",
      en: "Read the classics thickly first: personality, motivation, measurement, and development. Before clinic, the skeleton of psychology.",
    },
    audience: { zh: "想打底子的讀者", en: "Readers building foundations" },
    color: "#9a6840",
    topics: [
      {
        slug: "personality",
        title: { zh: "人格心理學", en: "Personality Psychology" },
        summary: {
          zh: "特質、心理動力、敘事與社會認知：人為什麼長期如此，又如何仍能改變。",
          en: "Traits, psychodynamics, narrative, and social cognition: why people stay themselves, and how they can still change.",
        },
      },
    ],
  },
];

export const bookGenres: BookGenreNode[] = [
  {
    slug: "psychology",
    title: { zh: "心理學", en: "Psychology" },
    summary: { zh: "人格、臨床、發展與社會心理學。", en: "Personality, clinical, developmental, and social psychology." },
    color: "#9a6840",
  },
  {
    slug: "philosophy",
    title: { zh: "哲學", en: "Philosophy" },
    summary: { zh: "心智、倫理、現象學與存在問題。", en: "Mind, ethics, phenomenology, and questions of existence." },
    color: "#2e3d6d",
  },
  {
    slug: "neuroscience",
    title: { zh: "神經科學", en: "Neuroscience" },
    summary: { zh: "大腦、行為與精神現象的科學敘事。", en: "Scientific narratives of brain, behaviour, and mental life." },
    color: "#2f7a7a",
  },
  {
    slug: "literature",
    title: { zh: "文學", en: "Literature" },
    summary: { zh: "用故事理解人：小說、散文與詩。", en: "Understanding people through stories: fiction, essays, and poetry." },
    color: "#b44a55",
  },
];

export function flattenTopics(topics: TopicNode[], parentPath = ""): { path: string; topic: TopicNode }[] {
  const rows: { path: string; topic: TopicNode }[] = [];
  for (const topic of topics) {
    const path = parentPath ? `${parentPath}/${topic.slug}` : topic.slug;
    rows.push({ path, topic });
    if (topic.children?.length) {
      rows.push(...flattenTopics(topic.children, path));
    }
  }
  return rows;
}

export function findTopic(topics: TopicNode[], path: string[]): TopicNode | undefined {
  if (!path.length) return undefined;
  const [head, ...rest] = path;
  const node = topics.find((topic) => topic.slug === head);
  if (!node) return undefined;
  if (!rest.length) return node;
  return findTopic(node.children ?? [], rest);
}

export function topicHref(session: string, path: string) {
  return `/notes/${session}/${path}`;
}
