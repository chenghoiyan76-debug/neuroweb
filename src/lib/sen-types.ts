import type { LocaleText } from "@/lib/types";

export type AbilityAreaSlug =
  | "attention"
  | "reading"
  | "writing"
  | "maths"
  | "communication"
  | "social"
  | "emotion"
  | "daily-living"
  | "sensory-motor"
  | "support-tools";

export type AgeBand = "k" | "p1-p3" | "p4-p6" | "s1-s3" | "s4-s6";

export type AbilityLevel = "emerging" | "developing" | "consolidating";

/** Secondary tags only — never the primary browse path. */
export type SenTag =
  | "adhd"
  | "asd"
  | "spld"
  | "sli"
  | "id"
  | "mh"
  | "hi"
  | "vi"
  | "pd"
  | "learning-difficulty";

export type ResourceFormat =
  | "printable"
  | "card-set"
  | "checklist"
  | "visual-schedule"
  | "game"
  | "poster"
  | "script";

export type TimeNeeded = "5min" | "15min" | "30min" | "lesson";

export type DifficultyStars = 1 | 2 | 3;

export type ChallengeSlug =
  | "attention"
  | "executive-function"
  | "procrastination"
  | "working-memory"
  | "impulsivity"
  | "task-initiation"
  | "organisation"
  | "reading-comprehension"
  | "decoding"
  | "vocabulary"
  | "written-expression"
  | "idea-generation"
  | "spelling"
  | "number-sense"
  | "word-problems"
  | "calculation"
  | "expressive-language"
  | "receptive-language"
  | "pragmatics"
  | "social-understanding"
  | "conflict"
  | "boundaries"
  | "emotion-recognition"
  | "self-regulation"
  | "anxiety"
  | "independence"
  | "routine-memory"
  | "fine-motor"
  | "sensory-regulation"
  | "visual-motor"
  | "transitions"
  | "handwriting";

export type WorksheetBlock =
  | { kind: "goal"; text: LocaleText }
  | { kind: "adult"; steps: LocaleText[] }
  | { kind: "student"; text: LocaleText }
  | { kind: "checklist"; title: LocaleText; items: LocaleText[] }
  | { kind: "boxes"; title: LocaleText; labels: LocaleText[]; lines?: number }
  | { kind: "grid"; title: LocaleText; headers: LocaleText[]; rowCount: number; starterRows?: LocaleText[][] }
  | { kind: "cards"; title: LocaleText; cards: { title: LocaleText; body: LocaleText }[] }
  | { kind: "scale"; title: LocaleText; min: LocaleText; max: LocaleText; steps: number; labels?: LocaleText[] }
  | { kind: "choice"; title: LocaleText; options: LocaleText[] }
  | { kind: "sequence"; title: LocaleText; steps: LocaleText[] }
  | { kind: "script"; title: LocaleText; lines: { speaker: LocaleText; text: LocaleText }[] }
  | { kind: "note"; text: LocaleText };

export type SenResource = {
  slug: string;
  title: LocaleText;
  summary: LocaleText;
  howToUse: LocaleText;
  area: AbilityAreaSlug;
  situations: string[];
  ages: AgeBand[];
  levels: AbilityLevel[];
  challenges: ChallengeSlug[];
  senTags: SenTag[];
  format: ResourceFormat;
  time: TimeNeeded;
  difficulty: DifficultyStars;
  worksheet: WorksheetBlock[];
};

export type ProblemCard = {
  slug: string;
  emoji: string;
  label: LocaleText;
  hint: LocaleText;
  area: AbilityAreaSlug;
  situation: string;
};

export type SituationNode = {
  slug: string;
  title: LocaleText;
  summary: LocaleText;
};

export type AbilityAreaNode = {
  slug: AbilityAreaSlug;
  emoji: string;
  color: string;
  title: LocaleText;
  short: LocaleText;
  summary: LocaleText;
  situations: SituationNode[];
};

export type SenFilters = {
  area?: AbilityAreaSlug;
  situation?: string;
  ages?: AgeBand[];
  levels?: AbilityLevel[];
  senTags?: SenTag[];
  formats?: ResourceFormat[];
  times?: TimeNeeded[];
  difficulties?: DifficultyStars[];
  challenges?: ChallengeSlug[];
  query?: string;
};
