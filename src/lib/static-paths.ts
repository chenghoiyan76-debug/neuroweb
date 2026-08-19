import { flattenTopics, projectAreas, projectKinds, bookGenres } from "@/lib/taxonomy";
import { sessionsWithCustom } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export async function projectStaticParams() {
  const content = await readSiteContent();
  const paths: { path: string[] }[] = [{ path: [] }];
  for (const area of projectAreas) {
    paths.push({ path: [area.slug] });
    for (const kind of projectKinds) {
      paths.push({ path: [area.slug, kind.slug] });
    }
  }
  for (const project of content.projects) {
    paths.push({ path: [project.area, project.kind, project.slug] });
  }
  return paths;
}

export async function noteStaticParams() {
  const content = await readSiteContent();
  const paths: { path: string[] }[] = [{ path: [] }];
  for (const session of sessionsWithCustom(content)) {
    paths.push({ path: [session.slug] });
    for (const row of flattenTopics(session.topics)) {
      paths.push({ path: [session.slug, ...row.path.split("/")] });
    }
  }
  for (const note of content.notes) {
    paths.push({ path: [note.session, ...note.topic.split("/"), note.slug] });
  }
  return paths;
}

export async function bookStaticParams() {
  const content = await readSiteContent();
  const paths: { path: string[] }[] = [{ path: [] }];
  for (const genre of bookGenres) {
    paths.push({ path: [genre.slug] });
  }
  for (const book of content.books) {
    paths.push({ path: [book.genre, book.slug] });
  }
  return paths;
}

export async function reflectionStaticParams() {
  const content = await readSiteContent();
  return content.reflections.map((item) => ({ slug: item.slug }));
}
