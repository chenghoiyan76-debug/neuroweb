export type Pillar =
  | "models"
  | "psychiatry"
  | "therapy"
  | "reviews"
  | "cases";

export type ReviewStatus =
  | "peer-reviewed"
  | "published"
  | "under-review"
  | "editorial";

export type EvidenceLevel =
  | "systematic-review"
  | "rct"
  | "observational"
  | "expert-consensus"
  | "theoretical";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "callout";
      variant: "info" | "warning" | "clinical";
      title: string;
      text: string;
    }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string; cite?: string };

export type Article = {
  slug: string;
  pillar: Pillar;
  title: string;
  englishTitle: string;
  summary: string;
  tags: string[];
  status: ReviewStatus;
  evidence: EvidenceLevel;
  updatedAt: string;
  readingMinutes: number;
  authors: string[];
  reviewers: string[];
  blocks: ContentBlock[];
};

export type GlossaryCategory =
  | "cognition"
  | "psychiatry"
  | "pharmacology"
  | "therapy"
  | "neuroscience"
  | "methods";

export type GlossaryEntry = {
  slug: string;
  termZh: string;
  termEn: string;
  abbr?: string;
  category: GlossaryCategory;
  definition: string;
  related?: string[];
};

export type Tag = {
  slug: string;
  zh: string;
  en: string;
};

export type PillarMeta = {
  slug: Pillar;
  zh: string;
  en: string;
  kicker: string;
  description: string;
  href: string;
};
