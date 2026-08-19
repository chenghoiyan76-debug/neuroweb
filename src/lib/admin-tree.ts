import { pick, type Locale } from "@/lib/i18n";
import { sessionsWithCustom } from "@/lib/query";
import { bookGenres, projectAreas, projectKinds } from "@/lib/taxonomy";
import type {
  BookGenreSlug,
  NoteSessionSlug,
  ProjectAreaSlug,
  ProjectKindSlug,
  SiteContent,
  TopicNode,
} from "@/lib/types";

export type FolderType =
  | "root"
  | "projects"
  | "project-area"
  | "project-kind"
  | "notes"
  | "note-session"
  | "note-topic"
  | "books"
  | "book-genre"
  | "reflections"
  | "about"
  | "contact"
  | "inbox"
  | "backup";

export type FileType = "project" | "note" | "book" | "reflection";

export type AdminNode = {
  id: string;
  kind: "folder" | "file";
  folderType?: FolderType;
  fileType?: FileType;
  itemId?: string;
  label: string;
  publicPath?: string;
  count: number;
  canAddPage: boolean;
  canAddFolder: boolean;
  allocation?: {
    area?: ProjectAreaSlug;
    kind?: ProjectKindSlug;
    session?: NoteSessionSlug;
    topic?: string;
    genre?: BookGenreSlug;
  };
  isCustom?: boolean;
  children: AdminNode[];
};

function isCustomTopic(content: SiteContent, session: NoteSessionSlug, slug: string, parentPath: string) {
  return content.customTopics.some(
    (topic) => topic.session === session && topic.slug === slug && (topic.parent ?? "") === parentPath,
  );
}

function noteTopicFolders(
  topics: TopicNode[],
  session: NoteSessionSlug,
  content: SiteContent,
  locale: Locale,
  parentPath = "",
): AdminNode[] {
  return topics.map((topic) => {
    const path = parentPath ? `${parentPath}/${topic.slug}` : topic.slug;
    const topicNotes = content.notes.filter((note) => note.session === session && note.topic === path);
    const childFolders = topic.children?.length
      ? noteTopicFolders(topic.children, session, content, locale, path)
      : [];
    return {
      id: `notes/${session}/${path}`,
      kind: "folder" as const,
      folderType: "note-topic" as const,
      label: pick(topic.title, locale),
      publicPath: `/notes/${session}/${path}`,
      count: topicNotes.length,
      canAddPage: true,
      canAddFolder: true,
      isCustom: isCustomTopic(content, session, topic.slug, parentPath),
      allocation: { session, topic: path },
      children: [
        ...childFolders,
        ...topicNotes.map((note) => ({
          id: `file/note/${note.id}`,
          kind: "file" as const,
          fileType: "note" as const,
          itemId: note.id,
          label: pick(note.title, locale) || note.slug,
          publicPath: `/notes/${note.session}/${note.topic}/${note.slug}`,
          count: 0,
          canAddPage: false,
          canAddFolder: false,
          allocation: { session: note.session, topic: note.topic },
          children: [],
        })),
      ],
    };
  });
}

export function buildAdminTree(content: SiteContent, locale: Locale): AdminNode {
  const sessions = sessionsWithCustom(content);

  const projectFolder: AdminNode = {
    id: "projects",
    kind: "folder",
    folderType: "projects",
    label: locale === "en" ? "Projects" : "專案",
    publicPath: "/projects",
    count: content.projects.length,
    canAddPage: false,
    canAddFolder: false,
    children: projectAreas.map((area) => ({
      id: `projects/${area.slug}`,
      kind: "folder" as const,
      folderType: "project-area" as const,
      label: pick(area.title, locale),
      publicPath: `/projects/${area.slug}`,
      count: content.projects.filter((item) => item.area === area.slug).length,
      canAddPage: false,
      canAddFolder: false,
      allocation: { area: area.slug },
      children: projectKinds.map((kind) => {
        const items = content.projects.filter((item) => item.area === area.slug && item.kind === kind.slug);
        return {
          id: `projects/${area.slug}/${kind.slug}`,
          kind: "folder" as const,
          folderType: "project-kind" as const,
          label: pick(kind.title, locale),
          publicPath: `/projects/${area.slug}/${kind.slug}`,
          count: items.length,
          canAddPage: true,
          canAddFolder: false,
          allocation: { area: area.slug, kind: kind.slug },
          children: items.map((item) => ({
            id: `file/project/${item.id}`,
            kind: "file" as const,
            fileType: "project" as const,
            itemId: item.id,
            label: pick(item.title, locale) || item.slug,
            publicPath: `/projects/${item.area}/${item.kind}/${item.slug}`,
            count: 0,
            canAddPage: false,
            canAddFolder: false,
            allocation: { area: item.area, kind: item.kind },
            children: [],
          })),
        };
      }),
    })),
  };

  const notesFolder: AdminNode = {
    id: "notes",
    kind: "folder",
    folderType: "notes",
    label: locale === "en" ? "Study Notes" : "讀書筆記",
    publicPath: "/notes",
    count: content.notes.length,
    canAddPage: false,
    canAddFolder: false,
    children: sessions.map((session) => {
      const sessionNotes = content.notes.filter((note) => note.session === session.slug);
      return {
        id: `notes/${session.slug}`,
        kind: "folder" as const,
        folderType: "note-session" as const,
        label: pick(session.title, locale),
        publicPath: `/notes/${session.slug}`,
        count: sessionNotes.length,
        canAddPage: false,
        canAddFolder: true,
        allocation: { session: session.slug },
        children: noteTopicFolders(session.topics, session.slug, content, locale),
      };
    }),
  };

  const booksFolder: AdminNode = {
    id: "books",
    kind: "folder",
    folderType: "books",
    label: locale === "en" ? "Book Reviews" : "書評",
    publicPath: "/books",
    count: content.books.length,
    canAddPage: false,
    canAddFolder: false,
    children: bookGenres.map((genre) => {
      const items = content.books.filter((book) => book.genre === genre.slug);
      return {
        id: `books/${genre.slug}`,
        kind: "folder" as const,
        folderType: "book-genre" as const,
        label: pick(genre.title, locale),
        publicPath: `/books/${genre.slug}`,
        count: items.length,
        canAddPage: true,
        canAddFolder: false,
        allocation: { genre: genre.slug },
        children: items.map((book) => ({
          id: `file/book/${book.id}`,
          kind: "file" as const,
          fileType: "book" as const,
          itemId: book.id,
          label: book.bookTitle || pick(book.title, locale) || book.slug,
          publicPath: `/books/${book.genre}/${book.slug}`,
          count: 0,
          canAddPage: false,
          canAddFolder: false,
          allocation: { genre: book.genre },
          children: [],
        })),
      };
    }),
  };

  const reflectionsFolder: AdminNode = {
    id: "reflections",
    kind: "folder",
    folderType: "reflections",
    label: locale === "en" ? "Personal Reflection" : "自我反思",
    publicPath: "/reflection",
    count: content.reflections.length,
    canAddPage: true,
    canAddFolder: false,
    children: [...content.reflections]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((item) => ({
        id: `file/reflection/${item.id}`,
        kind: "file" as const,
        fileType: "reflection" as const,
        itemId: item.id,
        label: pick(item.title, locale) || item.slug,
        publicPath: `/reflection/${item.slug}`,
        count: 0,
        canAddPage: false,
        canAddFolder: false,
        children: [],
      })),
  };

  return {
    id: "root",
    kind: "folder",
    folderType: "root",
    label: content.profile.siteName,
    publicPath: "/",
    count:
      content.projects.length +
      content.notes.length +
      content.books.length +
      content.reflections.length,
    canAddPage: false,
    canAddFolder: false,
    children: [
      projectFolder,
      notesFolder,
      booksFolder,
      reflectionsFolder,
      {
        id: "about",
        kind: "folder",
        folderType: "about",
        label: locale === "en" ? "About me" : "關於我",
        publicPath: "/about",
        count: 0,
        canAddPage: false,
        canAddFolder: false,
        children: [],
      },
      {
        id: "contact",
        kind: "folder",
        folderType: "contact",
        label: locale === "en" ? "Contact" : "聯絡",
        publicPath: "/contact",
        count: content.messages.length,
        canAddPage: false,
        canAddFolder: false,
        children: [],
      },
      {
        id: "inbox",
        kind: "folder",
        folderType: "inbox",
        label: locale === "en" ? "Inbox" : "收件匣",
        count: content.messages.filter((item) => !item.read).length,
        canAddPage: false,
        canAddFolder: false,
        children: [],
      },
      {
        id: "backup",
        kind: "folder",
        folderType: "backup",
        label: locale === "en" ? "Import / Export" : "匯入／匯出",
        count: 0,
        canAddPage: false,
        canAddFolder: false,
        children: [],
      },
    ],
  };
}

export function findAdminNode(root: AdminNode, id: string): AdminNode | undefined {
  if (root.id === id) return root;
  for (const child of root.children) {
    const found = findAdminNode(child, id);
    if (found) return found;
  }
  return undefined;
}

export function ancestorIds(root: AdminNode, id: string, trail: string[] = []): string[] | undefined {
  if (root.id === id) return [...trail, root.id];
  for (const child of root.children) {
    const found = ancestorIds(child, id, [...trail, root.id]);
    if (found) return found;
  }
  return undefined;
}

export function parentAdminId(root: AdminNode, id: string) {
  const trail = ancestorIds(root, id);
  if (!trail || trail.length < 2) return undefined;
  return trail[trail.length - 2];
}
