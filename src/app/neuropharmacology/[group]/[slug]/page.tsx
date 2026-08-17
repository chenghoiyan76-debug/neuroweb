import { notFound } from "next/navigation";
import { NoteView } from "@/components/NoteView";
import { notesByAxis } from "@/lib/query";
import { readSiteContent } from "@/lib/repository";

export async function generateStaticParams() {
  const content = await readSiteContent();
  return notesByAxis(content, "pharmacology").map((note) => ({
    group: note.section ?? "psychosis",
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string; slug: string }>;
}) {
  const { slug } = await params;
  const content = await readSiteContent();
  const note = content.notes.find((item) => item.slug === slug);
  return { title: note ? `${note.en}（${note.zh}）` : "Mechanism" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ group: string; slug: string }>;
}) {
  const { slug } = await params;
  const content = await readSiteContent();
  const note = content.notes.find((item) => item.slug === slug && item.axis === "pharmacology");
  if (!note) notFound();
  return <NoteView note={note} content={content} />;
}
