"use client";

import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { bilingualTitle, ui } from "@/lib/i18n";
import { customDomains, unfiledResources } from "@/lib/query";

export default function GardenPage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const pages = customDomains(content);
  const inbox = unfiledResources(content);
  const inboxNotes = content.notes.filter((note) => note.level === 0 || note.custom);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs tracking-[0.25em] text-copper uppercase">{t.unfiled}</p>
      <h1 className="mt-2 font-serif text-4xl">{t.garden}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
        {locale === "en"
          ? "Pages and resources added through the Lab back door land here until they are filed into the pyramid."
          : "從 Lab 後門新增的頁面與資源會先落在這裡，再依思考邏輯掛上金字塔。"}
      </p>
      <Link href="/lab" className="mt-4 inline-flex rounded-full bg-night px-4 py-2 text-sm text-paper-2">
        {t.addViaLab}
      </Link>

      <section className="mt-10">
        <h2 className="font-serif text-xl">{t.customPage}</h2>
        <div className="mt-3 grid gap-2">
          {pages.length ? (
            pages.map((domain) => (
              <Link key={domain.slug} href={`/domain/${domain.slug}`} className="rounded-xl border border-rule bg-paper-2 px-4 py-3">
                {bilingualTitle(domain.zh, domain.en, locale)}
              </Link>
            ))
          ) : (
            <p className="text-sm text-ink-soft">{t.emptyDomain}</p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-xl">{t.notes}</h2>
        <div className="mt-3 grid gap-2">
          {inboxNotes.length ? (
            inboxNotes.map((note) => (
              <Link key={note.slug} href={`/note/${note.slug}`} className="rounded-xl border border-rule bg-paper-2 px-4 py-3">
                {bilingualTitle(note.zh, note.en, locale)}
              </Link>
            ))
          ) : (
            <p className="text-sm text-ink-soft">{t.emptyDomain}</p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-xl">{t.resources}</h2>
        <div className="mt-3 grid gap-2">
          {inbox.length ? (
            inbox.map((resource) => (
              <div key={resource.id} className="rounded-xl border border-rule px-4 py-3 text-sm">
                <p className="text-[11px] uppercase text-ink-soft">{resource.kind}</p>
                {resource.url ? (
                  <a className="text-teal underline" href={resource.url}>
                    {resource.title}
                  </a>
                ) : (
                  <p>{resource.title}</p>
                )}
                {resource.note ? <p className="mt-1 text-ink-soft">{resource.note}</p> : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-ink-soft">{t.emptyDomain}</p>
          )}
        </div>
      </section>
    </div>
  );
}
