import type {
  AbilityAreaNode,
  AbilityLevel,
  AgeBand,
  ChallengeSlug,
  DifficultyStars,
  ProblemCard,
  ResourceFormat,
  SenTag,
  TimeNeeded,
} from "@/lib/sen-types";
import type { LocaleText } from "@/lib/types";

const t = (zh: string, en: string): LocaleText => ({ zh, en });

export const abilityAreas: AbilityAreaNode[] = [
  {
    slug: "attention",
    emoji: "🧠",
    color: "#2f7a7a",
    title: t("專注力與執行功能", "Attention & executive function"),
    short: t("專注", "Attention"),
    summary: t(
      "把「開始、維持、檢查、轉換」拆成看得見的步驟，而不是要求學生再專心一點。",
      "Make starting, staying, checking, and switching visible steps — instead of asking a student to 'just focus'.",
    ),
    situations: [
      { slug: "start-homework", title: t("開始做功課", "Starting homework"), summary: t("任務太大、唔知由邊度入手。", "The task feels too big, so starting never happens.") },
      { slug: "fidgeting", title: t("坐唔定", "Can't sit still"), summary: t("身體需要動，但課堂要求靜。", "The body needs to move while the class asks for stillness.") },
      { slug: "task-persistence", title: t("做一半就停", "Stops halfway"), summary: t("開始得到，但維持唔到。", "Starting is possible; staying with it is not.") },
      { slug: "time-management", title: t("時間管理", "Time management"), summary: t("時間係抽象嘅，需要被看見。", "Time is abstract until it is made visible.") },
      { slug: "checking-work", title: t("檢查功課", "Checking work"), summary: t("做完就當完，漏咗最後一步。", "Finished is treated as done — the last step is skipped.") },
      { slug: "working-memory", title: t("記住步驟", "Holding steps in mind"), summary: t("聽到指示，轉頭就唔記得。", "Instructions arrive, then vanish.") },
    ],
  },
  {
    slug: "reading",
    emoji: "📖",
    color: "#2e3d6d",
    title: t("閱讀與理解", "Reading & comprehension"),
    short: t("閱讀", "Reading"),
    summary: t(
      "先幫學生抓住關鍵字、順序同主旨，而不是假設「睇過就等於明」。",
      "Help students catch keywords, sequence, and the main idea — reading is not the same as understanding.",
    ),
    situations: [
      { slug: "after-reading-blank", title: t("睇完唔知講乜", "Read it, still blank"), summary: t("字認得，意思抓唔到。", "Words are recognised; meaning is not.") },
      { slug: "keyword", title: t("搵關鍵字", "Find keywords"), summary: t("整段一齊睇，重點被淹沒。", "The whole paragraph is read as one blur.") },
      { slug: "sequence", title: t("故事排序", "Story sequence"), summary: t("事件先後亂咗。", "Events arrive out of order.") },
      { slug: "main-idea", title: t("搵主旨", "Main idea"), summary: t("細節記得，中心句唔見。", "Details stay; the centre sentence does not.") },
      { slug: "instructions", title: t("理解書面指示", "Written instructions"), summary: t("題目要求比文章本身更難。", "The instruction is harder than the passage.") },
    ],
  },
  {
    slug: "writing",
    emoji: "✏️",
    color: "#9a6840",
    title: t("寫作與文字表達", "Writing & written expression"),
    short: t("寫作", "Writing"),
    summary: t(
      "用框架、詞庫同檢查表把「腦裡有、紙上無」變成一步一步寫得出。",
      "Use frames, word banks, and checklists so ideas that live in the head can land on the page.",
    ),
    situations: [
      { slug: "start-writing", title: t("唔知點落筆", "Don't know how to start"), summary: t("空白紙比題目更可怕。", "The blank page is harder than the prompt.") },
      { slug: "expand-sentence", title: t("句子太短", "Sentences too short"), summary: t("有意思，但寫唔長。", "There is meaning, but it will not grow.") },
      { slug: "structure", title: t("文章結構", "Text structure"), summary: t("材料有，骨架無。", "There is material, but no skeleton.") },
      { slug: "revise", title: t("改寫同檢查", "Revise and check"), summary: t("寫完就交，未見過自己嘅字。", "It is handed in before it has been seen.") },
    ],
  },
  {
    slug: "maths",
    emoji: "🔢",
    color: "#1d4d4f",
    title: t("數學與邏輯思考", "Maths & logical thinking"),
    short: t("數學", "Maths"),
    summary: t(
      "把文字題、數感同生活情境變成看得見的數量關係。",
      "Turn word problems, number sense, and daily situations into visible quantity relationships.",
    ),
    situations: [
      { slug: "word-problems", title: t("文字題拆解", "Unpack word problems"), summary: t("識計，但唔知題目要計乜。", "Calculation is possible; the question is not.") },
      { slug: "number-sense", title: t("數感", "Number sense"), summary: t("數字係符號，未變成數量。", "Numbers are symbols, not yet amounts.") },
      { slug: "operations", title: t("四則運算", "Four operations"), summary: t("步驟一多就亂。", "More steps, more scramble.") },
      { slug: "daily-maths", title: t("生活數學", "Maths in daily life"), summary: t("課堂計到，街市用唔到。", "It works on the worksheet, not at the market.") },
    ],
  },
  {
    slug: "communication",
    emoji: "💬",
    color: "#5a7184",
    title: t("語言與溝通", "Language & communication"),
    short: t("溝通", "Communication"),
    summary: t(
      "提供提問、表達需要、理解指令同情境語言的腳本，讓說話有支架。",
      "Give scripts for asking, expressing needs, following instructions, and situational language.",
    ),
    situations: [
      { slug: "express-need", title: t("表達需要", "Expressing a need"), summary: t("唔舒服，但講唔出要乜。", "Discomfort is there; the request is not.") },
      { slug: "ask-questions", title: t("提問", "Asking questions"), summary: t("只會答，唔會問。", "Answering is easier than asking.") },
      { slug: "follow-instructions", title: t("理解口頭指令", "Following spoken instructions"), summary: t("一步得，三步就掉。", "One step lands; three steps fall.") },
      { slug: "conversation", title: t("對話練習", "Conversation practice"), summary: t("一問一答之後就停。", "After one question and one answer, it stops.") },
    ],
  },
  {
    slug: "social",
    emoji: "👥",
    color: "#3d5a80",
    title: t("社交理解與人際技巧", "Social understanding & people skills"),
    short: t("社交", "Social"),
    summary: t(
      "把輪流、界線、觀點同衝突拆成可練習的情境，而不是要求「識做人」。",
      "Break turn-taking, boundaries, perspective, and conflict into practised situations — not a demand to 'be more social'.",
    ),
    situations: [
      { slug: "joining-in", title: t("加入同學", "Joining in"), summary: t("想玩，但唔知點入口。", "Wanting to play is not the same as knowing how to enter.") },
      { slug: "conflict", title: t("解決衝突", "Solving conflict"), summary: t("一撞就爆，或者一撞就走。", "A bump becomes an explosion, or a disappearance.") },
      { slug: "turn-taking", title: t("輪流", "Turn-taking"), summary: t("等待好難，插隊好快。", "Waiting is hard; interrupting is fast.") },
      { slug: "boundaries", title: t("界線", "Boundaries"), summary: t("距離、身體同秘密都要被教。", "Distance, bodies, and secrets all have to be taught.") },
      { slug: "perspective", title: t("觀點理解", "Perspective-taking"), summary: t("自己覺得明顯，對方未必覺得。", "What is obvious to me may not be obvious to you.") },
    ],
  },
  {
    slug: "emotion",
    emoji: "❤️",
    color: "#b44a55",
    title: t("情緒與自我調節", "Emotion & self-regulation"),
    short: t("情緒", "Emotion"),
    summary: t(
      "先命名、再量度、再選方法：發脾氣之前同之後都有工具。",
      "Name, measure, then choose a method — tools for before and after an outburst.",
    ),
    situations: [
      { slug: "angry-outburst", title: t("好容易發脾氣", "Quick to explode"), summary: t("情緒上得太快，身體跟住走。", "The feeling rises faster than the body can stay.") },
      { slug: "identify-feeling", title: t("情緒辨識", "Identifying feelings"), summary: t("只有「好」同「唔好」。", "There is only 'ok' and 'not ok'.") },
      { slug: "calm-down", title: t("冷靜方法", "Calming down"), summary: t("叫冷靜冇用，要有選單。", "'Calm down' is not a method; a menu is.") },
      { slug: "ask-for-help", title: t("求助", "Asking for help"), summary: t("撐到爆先出聲，或者永遠唔出聲。", "Help is asked for too late, or never.") },
    ],
  },
  {
    slug: "daily-living",
    emoji: "🏠",
    color: "#6b4f3a",
    title: t("日常生活與獨立能力", "Daily living & independence"),
    short: t("生活技能", "Daily living"),
    summary: t(
      "執書包、衞生、交通、購物：把生活程序變成可勾選的步驟。",
      "Packing, hygiene, travel, shopping: turn life routines into checkable steps.",
    ),
    situations: [
      { slug: "forget-things", title: t("成日唔記得帶嘢", "Always forgetting things"), summary: t("記憶唔應該只放喺腦裡面。", "Memory should not live only inside the head.") },
      { slug: "pack-bag", title: t("執書包", "Packing the school bag"), summary: t("出門前最後三分鐘最亂。", "The last three minutes before leaving are the messiest.") },
      { slug: "hygiene", title: t("個人衞生", "Personal hygiene"), summary: t("步驟多、順序易掉。", "Many steps, easy to drop the order.") },
      { slug: "shopping", title: t("購物", "Shopping"), summary: t("選擇太多，付錢好抽象。", "Too many choices; paying is abstract.") },
      { slug: "travel", title: t("交通", "Getting around"), summary: t("路線、安全同求助要預先演練。", "Routes, safety, and help-seeking need rehearsal.") },
    ],
  },
  {
    slug: "sensory-motor",
    emoji: "✋",
    color: "#7a5b8a",
    title: t("感覺與動作能力", "Sensory & motor skills"),
    short: t("感覺動作", "Sensory-motor"),
    summary: t(
      "小肌肉、視覺動作、書寫準備同感覺調節：身體係學習嘅入口。",
      "Fine motor, visual-motor, handwriting readiness, and sensory regulation: the body is an entry to learning.",
    ),
    situations: [
      { slug: "sensory-overload", title: t("對聲音或觸覺好敏感", "Sensitive to sound or touch"), summary: t("環境嘅感覺比功課更大聲。", "The room is louder than the task.") },
      { slug: "fine-motor", title: t("小肌肉活動", "Fine motor work"), summary: t("剪、夾、扣：手未準備好。", "Cut, pinch, button: the hand is not ready yet.") },
      { slug: "handwriting-prep", title: t("書寫準備", "Handwriting preparation"), summary: t("未坐好、未握穩，就要寫。", "Writing is asked for before sitting and grip are ready.") },
      { slug: "visual-motor", title: t("視覺動作", "Visual-motor"), summary: t("眼到手到之間有延遲。", "There is a delay between eye and hand.") },
    ],
  },
  {
    slug: "support-tools",
    emoji: "🧰",
    color: "#8a6a2f",
    title: t("學習支援工具", "Learning support tools"),
    short: t("支援工具", "Support tools"),
    summary: t(
      "視覺時間表、先後卡、選擇板、休息卡：課堂通用的支架，一份工具可以跨多種需要。",
      "Visual schedules, first-then cards, choice boards, break cards: classroom scaffolds that cut across many needs.",
    ),
    situations: [
      { slug: "visual-schedule", title: t("預知今日流程", "Seeing today's flow"), summary: t("未知比困難更令人慌。", "Not knowing is more frightening than hard work.") },
      { slug: "first-then", title: t("先後順序", "First–then"), summary: t("而家同之後要同時被看見。", "Now and next need to be visible together.") },
      { slug: "choice", title: t("俾選擇", "Offering choices"), summary: t("選擇可以降低對抗。", "A choice can lower the fight.") },
      { slug: "break", title: t("需要休息", "Need a break"), summary: t("休息要被允許，先至唔使逃。", "A break has to be allowed, or it becomes an escape.") },
      { slug: "transitions", title: t("轉換活動", "Transitions"), summary: t("停低同開始一樣難。", "Stopping can be as hard as starting.") },
    ],
  },
];

export const problemCards: ProblemCard[] = [
  {
    slug: "cant-sit-still",
    emoji: "🪑",
    label: t("坐唔定", "Can't sit still"),
    hint: t("身體想郁，但被要求坐好。", "The body wants to move, but sitting still is required."),
    area: "attention",
    situation: "fidgeting",
  },
  {
    slug: "wont-start-homework",
    emoji: "📝",
    label: t("唔肯開始做功課", "Won't start homework"),
    hint: t("唔係懶，係開始這一步卡住。", "Not laziness — the first step is stuck."),
    area: "attention",
    situation: "start-homework",
  },
  {
    slug: "read-but-blank",
    emoji: "📄",
    label: t("睇完文章唔知講乜", "Finished reading, still blank"),
    hint: t("字過咗眼，意思未過腦。", "The words passed the eyes; meaning did not."),
    area: "reading",
    situation: "after-reading-blank",
  },
  {
    slug: "cant-start-writing",
    emoji: "🖊️",
    label: t("寫作唔知點落筆", "Don't know how to start writing"),
    hint: t("空白紙需要支架，唔需要再催。", "A blank page needs a frame, not more pressure."),
    area: "writing",
    situation: "start-writing",
  },
  {
    slug: "word-problem-lost",
    emoji: "➗",
    label: t("睇文字題唔知計乜", "Can't tell what the word problem asks"),
    hint: t("先拆題，再計數。", "Unpack the question before calculating."),
    area: "maths",
    situation: "word-problems",
  },
  {
    slug: "cant-express",
    emoji: "🗣️",
    label: t("唔識表達自己", "Can't express myself"),
    hint: t("需要句式，而唔只係勇氣。", "Sentence frames matter more than courage alone."),
    area: "communication",
    situation: "express-need",
  },
  {
    slug: "peer-trouble",
    emoji: "👫",
    label: t("唔識同同學相處", "Hard to get along with classmates"),
    hint: t("社交係可以教嘅技巧。", "Social skill is teachable skill."),
    area: "social",
    situation: "joining-in",
  },
  {
    slug: "quick-temper",
    emoji: "🌋",
    label: t("好容易發脾氣", "Quick to lose temper"),
    hint: t("爆發之前，身體已經發出訊號。", "The body signals before the explosion."),
    area: "emotion",
    situation: "angry-outburst",
  },
  {
    slug: "always-forgets",
    emoji: "🎒",
    label: t("成日唔記得帶嘢", "Always forgetting things"),
    hint: t("把記憶搬去清單同固定位置。", "Move memory onto lists and fixed places."),
    area: "daily-living",
    situation: "forget-things",
  },
  {
    slug: "sensory-sensitive",
    emoji: "🔊",
    label: t("對聲音或觸覺好敏感", "Sensitive to sound or touch"),
    hint: t("調節環境，先至有學習空間。", "Regulate the environment before asking for learning."),
    area: "sensory-motor",
    situation: "sensory-overload",
  },
  {
    slug: "transition-crash",
    emoji: "⏱️",
    label: t("轉換活動就好難", "Transitions are hard"),
    hint: t("預告、倒數、先後卡可以承住轉換。", "Warnings, countdowns, and first–then cards can hold a transition."),
    area: "support-tools",
    situation: "transitions",
  },
];

export const ageBands: { slug: AgeBand; title: LocaleText }[] = [
  { slug: "k", title: t("幼兒", "Kindergarten") },
  { slug: "p1-p3", title: t("小學低年級", "Lower primary") },
  { slug: "p4-p6", title: t("小學高年級", "Upper primary") },
  { slug: "s1-s3", title: t("初中", "Junior secondary") },
  { slug: "s4-s6", title: t("高中", "Senior secondary") },
];

export const abilityLevels: { slug: AbilityLevel; title: LocaleText; hint: LocaleText }[] = [
  { slug: "emerging", title: t("起步", "Emerging"), hint: t("需要大量示範同成人旁邊支持", "Needs modelling and side-by-side support") },
  { slug: "developing", title: t("發展中", "Developing"), hint: t("有提示就做得到", "Can do it with prompts") },
  { slug: "consolidating", title: t("鞏固", "Consolidating"), hint: t("多數可獨立，偶爾要提醒", "Mostly independent, occasional reminder") },
];

export const senTags: { slug: SenTag; title: LocaleText; note: LocaleText }[] = [
  { slug: "adhd", title: t("專注力不足／過度活躍症", "ADHD"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "asd", title: t("自閉症", "Autism"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "spld", title: t("特殊學習困難（讀寫）", "SpLD / dyslexia"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "sli", title: t("言語障礙", "Speech & language"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "id", title: t("智力障礙", "Intellectual disability"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "mh", title: t("精神健康需要", "Mental health need"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "hi", title: t("聽力障礙", "Hearing impairment"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "vi", title: t("視力障礙", "Visual impairment"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "pd", title: t("肢體傷殘", "Physical disability"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
  { slug: "learning-difficulty", title: t("學習困難", "Learning difficulty"), note: t("適用標籤，不是分類入口", "A fit tag, not a browse path") },
];

export const resourceFormats: { slug: ResourceFormat; title: LocaleText }[] = [
  { slug: "printable", title: t("可列印工作紙", "Printable worksheet") },
  { slug: "card-set", title: t("卡片組", "Card set") },
  { slug: "checklist", title: t("檢查清單", "Checklist") },
  { slug: "visual-schedule", title: t("視覺時間表", "Visual schedule") },
  { slug: "game", title: t("遊戲", "Game") },
  { slug: "poster", title: t("海報", "Poster") },
  { slug: "script", title: t("對話腳本", "Script") },
];

export const timeNeeded: { slug: TimeNeeded; title: LocaleText }[] = [
  { slug: "5min", title: t("約 5 分鐘", "About 5 minutes") },
  { slug: "15min", title: t("約 15 分鐘", "About 15 minutes") },
  { slug: "30min", title: t("約 30 分鐘", "About 30 minutes") },
  { slug: "lesson", title: t("一整堂課", "A full lesson") },
];

export const difficultyOptions: { slug: DifficultyStars; title: LocaleText }[] = [
  { slug: 1, title: t("★☆☆ 起步", "★☆☆ Emerging") },
  { slug: 2, title: t("★★☆ 發展中", "★★☆ Developing") },
  { slug: 3, title: t("★★★ 鞏固", "★★★ Consolidating") },
];

export const challengeTags: { slug: ChallengeSlug; title: LocaleText }[] = [
  { slug: "attention", title: t("專注力", "Attention") },
  { slug: "executive-function", title: t("執行功能", "Executive function") },
  { slug: "procrastination", title: t("拖延", "Procrastination") },
  { slug: "working-memory", title: t("工作記憶", "Working memory") },
  { slug: "impulsivity", title: t("衝動", "Impulsivity") },
  { slug: "task-initiation", title: t("啟動任務", "Task initiation") },
  { slug: "organisation", title: t("組織", "Organisation") },
  { slug: "reading-comprehension", title: t("閱讀理解", "Reading comprehension") },
  { slug: "decoding", title: t("認字解碼", "Decoding") },
  { slug: "vocabulary", title: t("詞彙", "Vocabulary") },
  { slug: "written-expression", title: t("文字表達", "Written expression") },
  { slug: "idea-generation", title: t("構思", "Idea generation") },
  { slug: "spelling", title: t("拼寫", "Spelling") },
  { slug: "number-sense", title: t("數感", "Number sense") },
  { slug: "word-problems", title: t("文字題", "Word problems") },
  { slug: "calculation", title: t("運算", "Calculation") },
  { slug: "expressive-language", title: t("表達性語言", "Expressive language") },
  { slug: "receptive-language", title: t("理解性語言", "Receptive language") },
  { slug: "pragmatics", title: t("語用", "Pragmatics") },
  { slug: "social-understanding", title: t("社交理解", "Social understanding") },
  { slug: "conflict", title: t("衝突", "Conflict") },
  { slug: "boundaries", title: t("界線", "Boundaries") },
  { slug: "emotion-recognition", title: t("情緒辨識", "Emotion recognition") },
  { slug: "self-regulation", title: t("自我調節", "Self-regulation") },
  { slug: "anxiety", title: t("焦慮", "Anxiety") },
  { slug: "independence", title: t("獨立", "Independence") },
  { slug: "routine-memory", title: t("生活程序記憶", "Routine memory") },
  { slug: "fine-motor", title: t("小肌肉", "Fine motor") },
  { slug: "sensory-regulation", title: t("感覺調節", "Sensory regulation") },
  { slug: "visual-motor", title: t("視覺動作", "Visual-motor") },
  { slug: "transitions", title: t("轉換", "Transitions") },
  { slug: "handwriting", title: t("書寫", "Handwriting") },
];

export function senAreaBySlug(slug: string) {
  return abilityAreas.find((area) => area.slug === slug);
}

export function situationBySlug(areaSlug: string, situationSlug: string) {
  return senAreaBySlug(areaSlug)?.situations.find((item) => item.slug === situationSlug);
}

export function problemBySlug(slug: string) {
  return problemCards.find((item) => item.slug === slug);
}

export function labelOf<T extends string | number>(
  list: { slug: T; title: LocaleText }[],
  slug: T,
): LocaleText | undefined {
  return list.find((item) => item.slug === slug)?.title;
}

export function starsLabel(stars: DifficultyStars): string {
  return "★".repeat(stars) + "☆".repeat(3 - stars);
}
