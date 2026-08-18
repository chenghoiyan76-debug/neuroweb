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

export type LevelId = 0 | 1 | 2 | 3 | 4 | 5;

export type ResourceKind = "link" | "paper" | "book" | "media" | "file" | "note";

export type Resource = {
  id: string;
  title: string;
  titleEn?: string;
  kind: ResourceKind;
  url?: string;
  note?: string;
  domain?: string;
  noteSlug?: string;
};

export type Domain = {
  slug: string;
  level: LevelId;
  parent?: string;
  en: string;
  zh: string;
  summary: string;
  summaryEn: string;
  custom?: boolean;
  kind?: "reflection";
};

export type Note = {
  slug: string;
  level: LevelId;
  domain: string;
  en: string;
  zh: string;
  summary: string;
  summaryEn?: string;
  tags: string[];
  related: string[];
  resources: Resource[];
  blocks: ContentBlock[];
  updatedAt: string;
  custom?: boolean;
};

export type LevelMeta = {
  id: Exclude<LevelId, 0>;
  slug: string;
  en: string;
  zh: string;
  nav: { zh: string; en: string };
  kicker: { zh: string; en: string };
  description: { zh: string; en: string };
  color: string;
};

export type SiteContent = {
  version: number;
  updatedAt: string;
  domains: Domain[];
  notes: Note[];
  resources: Resource[];
};
