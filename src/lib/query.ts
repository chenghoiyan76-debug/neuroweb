import { bookGenres, findTopic, flattenTopics, projectAreas, studySessions } from "@/lib/taxonomy";
import type {
  BookGenreSlug,
  BookReview,
  CustomTopic,
  Note,
  NoteSessionSlug,
  ProjectAreaSlug,
  ProjectItem,
  ProjectKindSlug,
  SessionNode,
  SiteContent,
  TopicNode,
} from "@/lib/types";

export function sessionsWithCustom(content: SiteContent): SessionNode[] {
  return studySessions.map((session) => {
    const extras = content.customTopics.filter((topic) => topic.session === session.slug);
    if (!extras.length) return session;
    return {
      ...session,
      topics: mergeCustomTopics(session.topics, extras),
    };
  });
}

function mergeCustomTopics(topics: TopicNode[], extras: CustomTopic[]): TopicNode[] {
  const next: TopicNode[] = topics.map((topic) => ({
    ...topic,
    children: topic.children ? topic.children.map((child) => ({ ...child })) : undefined,
  }));
  for (const extra of extras) {
    const node: TopicNode = {
      slug: extra.slug,
      title: extra.title,
      summary: extra.summary,
    };
    if (!extra.parent) {
      next.push(node);
      continue;
    }
    const parent = findTopic(next, extra.parent.split("/"));
    if (parent) {
      parent.children = [...(parent.children ?? []), node];
    } else {
      next.push(node);
    }
  }
  return next;
}

export function sessionBySlug(content: SiteContent, slug: string) {
  return sessionsWithCustom(content).find((session) => session.slug === slug);
}

export function notesForTopic(content: SiteContent, session: NoteSessionSlug, topicPath: string) {
  return content.notes
    .filter((note) => note.session === session && note.topic === topicPath)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function notesForSession(content: SiteContent, session: NoteSessionSlug) {
  return content.notes
    .filter((note) => note.session === session)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function noteByPath(content: SiteContent, session: NoteSessionSlug, topicPath: string, slug: string) {
  return content.notes.find(
    (note) => note.session === session && note.topic === topicPath && note.slug === slug,
  );
}

export function projectsFor(content: SiteContent, area: ProjectAreaSlug, kind?: ProjectKindSlug) {
  return content.projects
    .filter((item) => item.area === area && (!kind || item.kind === kind))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function projectBySlug(
  content: SiteContent,
  area: ProjectAreaSlug,
  kind: ProjectKindSlug,
  slug: string,
) {
  return content.projects.find((item) => item.area === area && item.kind === kind && item.slug === slug);
}

export function booksFor(content: SiteContent, genre: BookGenreSlug) {
  return content.books
    .filter((book) => book.genre === genre)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function bookBySlug(content: SiteContent, genre: BookGenreSlug, slug: string) {
  return content.books.find((book) => book.genre === genre && book.slug === slug);
}

export function reflectionBySlug(content: SiteContent, slug: string) {
  return content.reflections.find((item) => item.slug === slug);
}

export function sortedReflections(content: SiteContent) {
  return [...content.reflections].sort((a, b) => b.date.localeCompare(a.date));
}

export function latestNotes(content: SiteContent, limit = 4) {
  return [...content.notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit);
}

export function latestBooks(content: SiteContent, limit = 4) {
  return [...content.books].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit);
}

export function topicTitle(content: SiteContent, sessionSlug: string, topicPath: string) {
  const session = sessionBySlug(content, sessionSlug);
  if (!session) return undefined;
  return findTopic(session.topics, topicPath.split("/"));
}

export function allTopicRows(content: SiteContent) {
  return sessionsWithCustom(content).flatMap((session) =>
    flattenTopics(session.topics).map((row) => ({ session, ...row })),
  );
}

export type SearchHit = {
  kind: "note" | "book" | "project" | "reflection";
  href: string;
  title: string;
  summary: string;
};

function hay(parts: string[]) {
  return parts.join(" ").toLowerCase();
}

export function searchSite(content: SiteContent, query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];

  for (const note of content.notes) {
    if (
      hay([
        note.title.zh,
        note.title.en,
        note.summary.zh,
        note.summary.en,
        note.body.zh,
        note.body.en,
        note.tags.join(" "),
        note.topic,
      ]).includes(q)
    ) {
      hits.push({
        kind: "note",
        href: `/notes/${note.session}/${note.topic}/${note.slug}`,
        title: note.title.zh,
        summary: note.summary.zh,
      });
    }
  }
  for (const book of content.books) {
    if (
      hay([
        book.bookTitle,
        book.author,
        book.title.zh,
        book.title.en,
        book.summary.zh,
        book.summary.en,
        book.body.zh,
        book.body.en,
        book.genre,
      ]).includes(q)
    ) {
      hits.push({
        kind: "book",
        href: `/books/${book.genre}/${book.slug}`,
        title: `${book.bookTitle} · ${book.title.zh}`,
        summary: book.summary.zh,
      });
    }
  }
  for (const project of content.projects) {
    if (
      hay([
        project.title.zh,
        project.title.en,
        project.summary.zh,
        project.summary.en,
        project.body.zh,
        project.body.en,
      ]).includes(q)
    ) {
      hits.push({
        kind: "project",
        href: `/projects/${project.area}/${project.kind}/${project.slug}`,
        title: project.title.zh,
        summary: project.summary.zh,
      });
    }
  }
  for (const item of content.reflections) {
    if (
      hay([
        item.title.zh,
        item.title.en,
        item.excerpt.zh,
        item.excerpt.en,
        item.body.zh,
        item.body.en,
      ]).includes(q)
    ) {
      hits.push({
        kind: "reflection",
        href: `/reflection/${item.slug}`,
        title: item.title.zh,
        summary: item.excerpt.zh,
      });
    }
  }
  return hits.slice(0, 40);
}

export function areaBySlug(slug: string) {
  return projectAreas.find((area) => area.slug === slug);
}

export function genreBySlug(slug: string) {
  return bookGenres.find((genre) => genre.slug === slug);
}

export function relatedNotes(content: SiteContent, note: Note, limit = 3) {
  return content.notes
    .filter((item) => item.id !== note.id && (item.session === note.session || item.topic === note.topic))
    .slice(0, limit);
}

export function relatedBooks(content: SiteContent, book: BookReview, limit = 3) {
  return content.books.filter((item) => item.id !== book.id && item.genre === book.genre).slice(0, limit);
}

export function relatedProjects(content: SiteContent, project: ProjectItem, limit = 3) {
  return content.projects
    .filter((item) => item.id !== project.id && item.area === project.area)
    .slice(0, limit);
}
