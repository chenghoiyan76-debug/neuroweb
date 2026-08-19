"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { pick, ui } from "@/lib/i18n";
import { sessionsWithCustom } from "@/lib/query";
import { bookGenres, projectAreas, projectKinds } from "@/lib/taxonomy";

type MenuId = "projects" | "notes" | "books" | "reflection" | "about" | null;

export function SiteHeader() {
  const locale = useLocale();
  const t = ui[locale];
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <Link href="/" className="flex min-w-0 shrink-0 items-baseline gap-2">
          <span className="font-serif text-lg tracking-tight">Mind-Note</span>
          <span className="hidden truncate text-[11px] text-ink-soft xl:inline">{t.brandSub}</span>
        </Link>
        <DesktopNav className="ml-auto hidden lg:flex" />
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link href="/search" className="hidden rounded-full px-2.5 py-1 text-[12px] text-ink-soft hover:text-ink md:inline">
            {t.search}
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-full border border-rule px-3 py-1 text-[12px] lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>
      {open ? <MobileNav onClose={() => setOpen(false)} /> : null}
    </header>
  );
}

function DesktopNav({ className }: { className?: string }) {
  const navRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState({ left: 0, width: 0, visible: false });
  const [active, setActive] = useState<MenuId>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locale = useLocale();
  const t = ui[locale];

  function clearClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function moveBox(target: HTMLElement, id: MenuId) {
    const nav = navRef.current;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setBox({
      left: rect.left - navRect.left,
      width: rect.width,
      visible: true,
    });
    setActive(id);
  }

  function scheduleClose() {
    clearClose();
    closeTimer.current = setTimeout(() => {
      setBox((current) => ({ ...current, visible: false }));
      setActive(null);
    }, 140);
  }

  const items: { id: MenuId; href: string; label: string }[] = [
    { id: "projects", href: "/projects", label: t.projects },
    { id: "notes", href: "/notes", label: t.notes },
    { id: "books", href: "/books", label: t.books },
    { id: "reflection", href: "/reflection", label: t.reflection },
    { id: "about", href: "/about", label: t.about },
  ];

  return (
    <nav
      ref={navRef}
      className={`relative items-center ${className ?? ""}`}
      onMouseLeave={scheduleClose}
      onMouseEnter={clearClose}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 h-full rounded-full bg-paper-2 shadow-sm ring-1 ring-rule/80 transition-all duration-200 ease-out"
        style={{ left: box.left, width: box.width, opacity: box.visible ? 1 : 0 }}
      />
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={(event) => {
            clearClose();
            moveBox(event.currentTarget, item.id);
          }}
        >
          <Link href={item.href} className="relative z-10 block whitespace-nowrap px-3 py-2 text-[13px] text-ink">
            {item.label}
          </Link>
          <Mega
            open={active === item.id}
            alignEnd={index >= 3}
            id={item.id}
          />
        </div>
      ))}
    </nav>
  );
}

function Mega({ open, alignEnd, id }: { open: boolean; alignEnd: boolean; id: MenuId }) {
  if (id === "about") {
    return (
      <Panel open={open} alignEnd={alignEnd}>
        <AboutMenu />
      </Panel>
    );
  }
  if (id === "projects") {
    return (
      <Panel open={open} alignEnd={alignEnd} wide>
        <ProjectsMenu />
      </Panel>
    );
  }
  if (id === "notes") {
    return (
      <Panel open={open} alignEnd={alignEnd} wide>
        <NotesMenu />
      </Panel>
    );
  }
  if (id === "books") {
    return (
      <Panel open={open} alignEnd={alignEnd}>
        <BooksMenu />
      </Panel>
    );
  }
  if (id === "reflection") {
    return (
      <Panel open={open} alignEnd={alignEnd}>
        <ReflectionMenu />
      </Panel>
    );
  }
  return null;
}

function Panel({
  open,
  alignEnd,
  wide,
  children,
}: {
  open: boolean;
  alignEnd: boolean;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute top-full z-50 pt-2 transition duration-150 ${
        alignEnd ? "right-0" : "left-0"
      } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
    >
      <div
        className={`${wide ? "w-[min(44rem,calc(100vw-2rem))]" : "w-[min(22rem,calc(100vw-2rem))]"} rounded-2xl border border-rule bg-paper-2 p-4 shadow-xl`}
      >
        {children}
      </div>
    </div>
  );
}

function ProjectsMenu() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div>
      <p className="text-[11px] tracking-[0.22em] uppercase text-teal">{t.projects}</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {projectAreas.map((area) => (
          <div key={area.slug}>
            <Link href={`/projects/${area.slug}`} className="font-serif text-lg hover:text-teal-deep">
              {pick(area.title, locale)}
            </Link>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{pick(area.summary, locale)}</p>
            <div className="mt-2 grid gap-1">
              {projectKinds.map((kind) => (
                <Link
                  key={kind.slug}
                  href={`/projects/${area.slug}/${kind.slug}`}
                  className="rounded-md px-2 py-1 text-sm hover:bg-paper"
                >
                  {pick(kind.title, locale)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotesMenu() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const sessions = sessionsWithCustom(content);
  return (
    <div>
      <p className="text-[11px] tracking-[0.22em] uppercase text-indigo">{t.sessions}</p>
      <div className="mt-3 grid max-h-[70vh] gap-4 overflow-auto sm:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <div key={session.slug}>
            <Link href={`/notes/${session.slug}`} className="font-serif text-base hover:text-teal-deep">
              {pick(session.title, locale)}
            </Link>
            <p className="mt-1 text-[11px] text-ink-soft">{pick(session.kicker, locale)}</p>
            <div className="mt-2 grid gap-0.5">
              {session.topics.map((topic) => (
                <div key={topic.slug}>
                  <Link
                    href={`/notes/${session.slug}/${topic.slug}`}
                    className="block rounded-md px-2 py-1 text-[12px] hover:bg-paper"
                  >
                    {pick(topic.title, locale)}
                  </Link>
                  {topic.children?.length ? (
                    <div className="ml-3 grid border-l border-rule pl-2">
                      {topic.children.map((child) => (
                        <Link
                          key={child.slug}
                          href={`/notes/${session.slug}/${topic.slug}/${child.slug}`}
                          className="rounded-md px-2 py-0.5 text-[11px] text-ink-soft hover:bg-paper hover:text-ink"
                        >
                          {pick(child.title, locale)}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BooksMenu() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div>
      <p className="text-[11px] tracking-[0.22em] uppercase text-copper">{t.byGenre}</p>
      <div className="mt-3 grid gap-1">
        {bookGenres.map((genre) => (
          <Link key={genre.slug} href={`/books/${genre.slug}`} className="rounded-lg px-2 py-1.5 text-sm hover:bg-paper">
            {pick(genre.title, locale)}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ReflectionMenu() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const items = [...content.reflections].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  return (
    <div>
      <p className="text-[11px] tracking-[0.22em] uppercase text-copper">{t.listView}</p>
      <Link href="/reflection" className="mt-1 block font-serif text-lg hover:text-teal-deep">
        {t.reflection}
      </Link>
      <div className="mt-3 grid max-h-[50vh] gap-1 overflow-auto">
        {items.length ? (
          items.map((item) => (
            <Link key={item.slug} href={`/reflection/${item.slug}`} className="rounded-lg px-2 py-1.5 text-sm hover:bg-paper">
              {pick(item.title, locale)}
            </Link>
          ))
        ) : (
          <p className="px-2 py-1.5 text-sm text-ink-soft">{t.emptySection}</p>
        )}
      </div>
    </div>
  );
}

function AboutMenu() {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <div className="grid gap-1 text-sm">
      <Link href="/about" className="rounded-lg px-2 py-1.5 hover:bg-paper">
        {t.about}
      </Link>
      <Link href="/contact" className="rounded-lg px-2 py-1.5 hover:bg-paper">
        {t.contact}
      </Link>
    </div>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const sessions = sessionsWithCustom(content);

  return (
    <div className="max-h-[80vh] overflow-auto border-t border-rule bg-paper-2 px-4 py-3 lg:hidden">
      <div className="grid gap-4 text-sm">
        <div>
          <Link href="/projects" onClick={onClose} className="font-medium">
            {t.projects}
          </Link>
          <div className="mt-1 ml-2 grid gap-1 text-ink-soft">
            {projectAreas.map((area) => (
              <Link key={area.slug} href={`/projects/${area.slug}`} onClick={onClose}>
                {pick(area.title, locale)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Link href="/notes" onClick={onClose} className="font-medium">
            {t.notes}
          </Link>
          <div className="mt-1 ml-2 grid gap-2">
            {sessions.map((session) => (
              <Link key={session.slug} href={`/notes/${session.slug}`} onClick={onClose} className="text-ink-soft">
                {pick(session.title, locale)}
              </Link>
            ))}
          </div>
        </div>
        <Link href="/books" onClick={onClose}>
          {t.books}
        </Link>
        <Link href="/reflection" onClick={onClose}>
          {t.reflection}
        </Link>
        <Link href="/about" onClick={onClose}>
          {t.about}
        </Link>
        <Link href="/contact" onClick={onClose}>
          {t.contact}
        </Link>
        <Link href="/search" onClick={onClose}>
          {t.search}
        </Link>
      </div>
    </div>
  );
}
