import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { href?: string; label: string }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-[12px] text-ink-soft" aria-label={locale === "en" ? "Breadcrumb" : "導覽路徑"}>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 ? <span aria-hidden>/</span> : null}
          {item.href ? (
            <Link href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  kicker,
  title,
  summary,
  color,
}: {
  kicker?: string;
  title: string;
  summary?: string;
  color?: string;
}) {
  return (
    <header className="max-w-3xl">
      {kicker ? (
        <p className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-ink-soft">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: color ?? "#2f7a7a" }} />
          {kicker}
        </p>
      ) : null}
      <h1 className="mt-2 font-serif text-4xl leading-tight tracking-tight">{title}</h1>
      {summary ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{summary}</p> : null}
    </header>
  );
}

export function EmptyState({ text, href, action }: { text: string; href?: string; action?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-rule bg-paper-2 px-5 py-8 text-sm text-ink-soft">
      <p>{text}</p>
      {href && action ? (
        <Link href={href} className="mt-3 inline-block text-teal hover:underline">
          {action}
        </Link>
      ) : null}
    </div>
  );
}

export function ItemCard({
  href,
  title,
  summary,
  meta,
}: {
  href: string;
  title: string;
  summary: string;
  meta?: string;
}) {
  return (
    <Link href={href} className="block rounded-2xl border border-rule bg-paper-2 px-5 py-4 transition hover:border-gold">
      {meta ? <p className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">{meta}</p> : null}
      <h3 className="mt-1 font-serif text-xl leading-snug">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{summary}</p>
    </Link>
  );
}

export function SectionLabel({ children, color }: { children: string; color?: string }) {
  return (
    <p className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-ink-soft">
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color ?? "#9a6840" }} />
      {children}
    </p>
  );
}