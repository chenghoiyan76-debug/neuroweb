export type Locale = "zh" | "en";

export type LocaleText = {
  zh: string;
  en: string;
};

export type ProjectAreaSlug = "special-needs" | "mental-health";
export type ProjectKindSlug = "programmes" | "resources";
export type NoteSessionSlug =
  | "educational"
  | "clinical"
  | "mental-health"
  | "neuroscience"
  | "psychology";
export type BookGenreSlug = "psychology" | "philosophy" | "neuroscience" | "literature";

export type ProjectItem = {
  id: string;
  area: ProjectAreaSlug;
  kind: ProjectKindSlug;
  slug: string;
  title: LocaleText;
  summary: LocaleText;
  body: LocaleText;
  links: { label: string; url: string }[];
  updatedAt: string;
};

export type Note = {
  id: string;
  session: NoteSessionSlug;
  topic: string;
  slug: string;
  title: LocaleText;
  summary: LocaleText;
  body: LocaleText;
  tags: string[];
  updatedAt: string;
};

export type BookReview = {
  id: string;
  genre: BookGenreSlug;
  slug: string;
  bookTitle: string;
  author: string;
  year?: string;
  title: LocaleText;
  summary: LocaleText;
  body: LocaleText;
  rating?: number;
  updatedAt: string;
};

export type Reflection = {
  id: string;
  slug: string;
  date: string;
  title: LocaleText;
  excerpt: LocaleText;
  body: LocaleText;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type SiteProfile = {
  siteName: string;
  personName: LocaleText;
  tagline: LocaleText;
  bio: LocaleText;
  about: LocaleText;
  email: string;
  location: LocaleText;
  socials: { label: string; url: string }[];
  contactNote: LocaleText;
};

export type CustomTopic = {
  session: NoteSessionSlug;
  slug: string;
  parent?: string;
  title: LocaleText;
  summary: LocaleText;
};

export type SiteContent = {
  version: number;
  updatedAt: string;
  profile: SiteProfile;
  projects: ProjectItem[];
  notes: Note[];
  books: BookReview[];
  reflections: Reflection[];
  messages: ContactMessage[];
  customTopics: CustomTopic[];
};

export type TopicNode = {
  slug: string;
  title: LocaleText;
  summary: LocaleText;
  children?: TopicNode[];
};

export type SessionNode = {
  slug: NoteSessionSlug;
  title: LocaleText;
  kicker: LocaleText;
  summary: LocaleText;
  audience: LocaleText;
  color: string;
  topics: TopicNode[];
};

export type ProjectAreaNode = {
  slug: ProjectAreaSlug;
  title: LocaleText;
  summary: LocaleText;
  color: string;
};

export type BookGenreNode = {
  slug: BookGenreSlug;
  title: LocaleText;
  summary: LocaleText;
  color: string;
};
