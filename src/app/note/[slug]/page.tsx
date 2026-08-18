"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { NoteView } from "@/components/NoteView";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { ui } from "@/lib/i18n";
import { noteBySlug } from "@/lib/query";

export default function NotePage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const params = useParams<{ slug: string }>();
  const note = noteBySlug(content, params.slug);
  if (!note) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-serif text-3xl">{t.notFoundTitle}</h1>
        <p className="mt-3 text-ink-soft">{t.notFoundBody}</p>
        <Link href="/" className="mt-4 inline-block text-teal">
          {t.notFoundHome}
        </Link>
      </div>
    );
  }
  return <NoteView note={note} />;
}
