import { term } from "@/lib/i18n";
import { note } from "./indexNotes";
import type { Note } from "@/lib/types";

export const reflectionNotesSeed: Note[] = [
  note({
    slug: "why-self-reflection",
    level: 0,
    domain: "self-reflection",
    zh: "為什麼要有自我反思",
    en: "Why self-reflection",
    summary: "金字塔是地圖；這一頁是鏡子。知識若不照回自己，就只是收藏。",
    tags: ["reflection", "practice"],
    related: ["psychodynamic-insight", "attachment-early-development", "act-flexibility"],
    blocks: [
      {
        type: "p",
        text: `讀${term("Attachment", "依附")}、${term("Countertransference", "反移情")}或${term("Predictive coding", "預測編碼")}，若沒有回到「這件事如何在我身上發生」，知識會停在第三層的黑盒子外面。自我反思不是義務性的日記，而是把理論變成可被身體核對的問題。`,
      },
      {
        type: "ul",
        items: [
          "這套理論讓我對誰更有耐心、對誰更苛刻？",
          "我現在用來解釋自己的句子，是描述還是防衛？",
          "今天有沒有把別人變成我的個案，或把自己變成診斷？",
        ],
      },
    ],
  }),
  note({
    slug: "living-questions",
    level: 0,
    domain: "self-reflection",
    zh: "正在活著的問題",
    en: "Questions I am living with",
    summary: "不急著回答的問題。讓它們待在工作記憶裡，而不是被結論關掉。",
    tags: ["questions", "journal"],
    related: ["eastern-philosophy", "schema-core-beliefs"],
    blocks: [
      {
        type: "p",
        text: "這一則用來存放還沒有答案、卻在生活裡反覆出現的問題。之後可在管理後台繼續加新的反思筆記。",
      },
      {
        type: "ol",
        items: [
          "我在關係裡最常預設對方會怎麼離開？",
          "當我說「我只是累了」，身體其實在說什麼？",
          "哪一種「正確」讓我無法停留在不確定裡？",
        ],
      },
    ],
  }),
  note({
    slug: "countertransference-log",
    level: 0,
    domain: "self-reflection",
    zh: "反移情紀錄",
    en: "Countertransference log",
    summary: `${term("Countertransference", "反移情")}不是錯誤，是資料。先寫被啟動的身體，再寫故事。`,
    tags: ["clinical", "countertransference"],
    related: ["psychodynamic-insight", "borderline-personality-disorder"],
    blocks: [
      {
        type: "p",
        text: `臨床或親密關係裡被啟動時，先記：身體位置、衝動、想對對方做的事。然後才連回${term("Schema", "基模")}或早期劇本。不要在第一句就完成解釋。`,
      },
      {
        type: "callout",
        variant: "info",
        title: "格式",
        text: "情境 → 身體 → 衝動 → 我對自己說的話 → 可能的舊關係。一則一則加在管理後台。",
      },
    ],
  }),
];
