import { notFound } from "next/navigation";
import { NoteView } from "@/components/NoteView";
import { readSiteContent } from "@/lib/repository";

export async function generateStaticParams() {
  const content = await readSiteContent();
  return content.notes
    .filter((note) => note.axis === "dsm")
    .map((note) => ({ category: note.section ?? "mood-disorders", slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const content = await readSiteContent();
  const note = content.notes.find((item) => item.slug === slug);
  return { title: note ? `${note.en}（${note.zh}）` : "Illness Study" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const content = await readSiteContent();
  const note = content.notes.find((item) => item.slug === slug && item.axis === "dsm");
  if (!note) notFound();
  return <NoteView note={note} content={content} />;
}
