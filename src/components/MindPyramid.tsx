"use client";

import { useState } from "react";
import { bilingualTitle } from "@/lib/i18n";
import { levels } from "@/lib/site";
import { useLocale } from "./LocaleProvider";

const geometry = [
  { id: 5, top: 8, height: 86, topW: 168, botW: 300 },
  { id: 4, top: 102, height: 86, topW: 300, botW: 452 },
  { id: 3, top: 196, height: 86, topW: 452, botW: 620 },
  { id: 2, top: 290, height: 86, topW: 620, botW: 792 },
  { id: 1, top: 384, height: 92, topW: 792, botW: 960 },
] as const;

function trapezoid(cx: number, top: number, height: number, topW: number, botW: number) {
  const y2 = top + height;
  return `${cx - topW / 2},${top} ${cx + topW / 2},${top} ${cx + botW / 2},${y2} ${cx - botW / 2},${y2}`;
}

export function MindPyramid() {
  const locale = useLocale();
  const [hover, setHover] = useState<number | null>(null);
  const cx = 500;
  const active = levels.find((level) => level.id === hover) ?? levels[2];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center">
      <svg viewBox="0 0 1000 500" className="h-auto w-full drop-shadow-2xl" role="img" aria-label="Map of Our Mind">
        <title>Map of Our Mind</title>
        {geometry.map((band) => {
          const meta = levels.find((level) => level.id === band.id)!;
          const label = locale === "en" ? `L${band.id} · ${meta.en}` : `L${band.id} · ${meta.zh}`;
          const lit = hover === band.id;
          return (
            <a key={band.id} href={`/level/${band.id}`}>
              <g
                onMouseEnter={() => setHover(band.id)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer"
              >
                <polygon
                  points={trapezoid(cx, band.top, band.height, band.topW, band.botW)}
                  fill={meta.color}
                  opacity={hover === null || lit ? 0.96 : 0.55}
                  stroke={lit ? "#fbf7ef" : "rgba(251,247,239,0.35)"}
                  strokeWidth={lit ? 3 : 1}
                />
                <text
                  x={cx}
                  y={band.top + band.height / 2 + 5}
                  textAnchor="middle"
                  fill="#fbf7ef"
                  fontSize={band.id === 5 ? 15 : 16}
                  fontFamily="Georgia, 'Noto Serif TC', serif"
                >
                  {label}
                </text>
              </g>
            </a>
          );
        })}
      </svg>
      <div className="rounded-3xl border border-white/15 bg-white/5 p-6 text-paper-2 backdrop-blur">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Level {active.id}</p>
        <h2 className="mt-2 font-serif text-2xl leading-snug">{bilingualTitle(active.zh, active.en, locale)}</h2>
        <p className="mt-2 text-sm text-paper-2/70">{locale === "en" ? active.kicker.en : active.kicker.zh}</p>
        <p className="mt-4 text-sm leading-relaxed text-paper-2/85">
          {locale === "en" ? active.description.en : active.description.zh}
        </p>
        <a
          href={`/level/${active.id}`}
          className="mt-5 inline-flex rounded-full bg-gold px-4 py-2 text-sm text-night"
        >
          {locale === "en" ? "Open this level" : "進入這一層"}
        </a>
      </div>
    </div>
  );
}
