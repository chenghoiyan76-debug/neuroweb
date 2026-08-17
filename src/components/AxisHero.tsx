import type { ReactNode } from "react";
import Link from "next/link";
import { axes } from "@/lib/site";

export function AxisHero({
  slug,
  extra,
}: {
  slug: (typeof axes)[number]["slug"];
  extra?: ReactNode;
}) {
  const axis = axes.find((item) => item.slug === slug)!;
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm tracking-wide text-copper">{axis.en}</p>
        <h1 className="mt-2 font-serif text-4xl">{axis.zh}</h1>
        <p className="mt-2 text-sm text-ink-soft">{axis.kicker}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{axis.description}</p>
        {extra}
        <p className="mt-6 text-sm">
          <Link href="/" className="text-teal hover:underline">
            ← NeuroPsych Integrator
          </Link>
        </p>
      </div>
    </section>
  );
}
