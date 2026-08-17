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

export type Axis =
  | "dsm"
  | "symptom"
  | "pharmacology"
  | "intervention"
  | "fundamental";

export type PharmaSection = "psychosis" | "pain" | "neurodegeneration";

export type RelatedMap = {
  dsm?: string[];
  symptoms?: string[];
  pharmacology?: string[];
  interventions?: string[];
  fundamentals?: string[];
};

export type Note = {
  slug: string;
  axis: Axis;
  section?: string;
  en: string;
  zh: string;
  summary: string;
  related: RelatedMap;
  blocks: ContentBlock[];
  updatedAt: string;
};

export type DsmCategory = {
  slug: string;
  en: string;
  zh: string;
  summary: string;
};

export type PharmaGroup = {
  slug: PharmaSection;
  en: string;
  zh: string;
  summary: string;
};

export type SiteContent = {
  version: number;
  updatedAt: string;
  dsmCategories: DsmCategory[];
  pharmaGroups: PharmaGroup[];
  notes: Note[];
};
