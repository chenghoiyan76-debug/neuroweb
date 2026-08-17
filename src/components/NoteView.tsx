import Link from "next/link";
import { ArticleBody } from "@/components/ArticleBody";
import { RelatedPanel } from "@/components/RelatedPanel";
import { noteHrefBySlug } from "@/lib/paths";
import type { Note, SiteContent } from "@/lib/types";

export { noteHrefBySlug };

export function NoteCard({ note }: { note: Note }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-rule bg-paper-2 p-5">
      <p className="text-xs tracking-wide text-copper">{note.en}</p>
      <h3 className="mt-1 font-serif text-xl leading-snug">
        <Link href={noteHrefBySlug(note)} className="hover:text-teal">
          {note.zh}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{note.summary}</p>
    </article>
  );
}

export function NoteView({ note, content }: { note: Note; content: SiteContent }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <article>
        <p className="text-sm tracking-wide text-copper">{note.en}</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{note.zh}</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{note.summary}</p>
        <p className="mt-3 text-xs text-ink-soft">更新 {note.updatedAt}</p>
        <div className="mt-8 border-t border-rule pt-2">
          <ArticleBody blocks={note.blocks} />
        </div>
      </article>
      <RelatedPanel related={note.related} notes={content.notes} />
    </div>
  );
}
