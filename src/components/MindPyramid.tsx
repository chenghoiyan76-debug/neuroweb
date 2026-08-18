"use client";

import { useState } from "react";
import { bilingualTitle } from "@/lib/i18n";
import { levels } from "@/lib/site";
import { useLocale } from "./LocaleProvider";

/** One isosceles triangle, sliced into five bands. Height ≈ 0.81 × base so the apex is a real triangle, not a flat cap. */
const CX = 500;
const APEX_Y = 22;
const BASE_Y = 556;
const BASE_W = 660;
const VIEW_W = 1000;
const VIEW_H = 580;

function widthAt(y: number) {
  return BASE_W * ((y - APEX_Y) / (BASE_Y - APEX_Y));
}

const geometry = ([5, 4, 3, 2, 1] as const).map((id, index) => {
  const top = APEX_Y + ((BASE_Y - APEX_Y) * index) / 5;
  const bottom = APEX_Y + ((BASE_Y - APEX_Y) * (index + 1)) / 5;
  return {
    id,
    top,
    bottom,
    height: bottom - top,
    topW: widthAt(top),
    botW: widthAt(bottom),
  };
});

function bandPoints(top: number, bottom: number, topW: number, botW: number) {
  if (topW < 1) {
    return `${CX},${top} ${CX + botW / 2},${bottom} ${CX - botW / 2},${bottom}`;
  }
  return `${CX - topW / 2},${top} ${CX + topW / 2},${top} ${CX + botW / 2},${bottom} ${CX - botW / 2},${bottom}`;
}

export function MindPyramid() {
  const locale = useLocale();
  const [hover, setHover] = useState<number | null>(null);
  const active = levels.find((level) => level.id === hover) ?? levels[2];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-center">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full drop-shadow-2xl" role="img" aria-label="Map of Our Mind">
        <title>Map of Our Mind</title>
        {geometry.map((band) => {
          const meta = levels.find((level) => level.id === band.id)!;
          const short = locale === "en" ? meta.nav.en : meta.nav.zh;
          const lit = hover === band.id;
          const isApex = band.id === 5;
          const textY = isApex ? band.top + band.height * 0.68 : (band.top + band.bottom) / 2 + 5;
          return (
            <a key={band.id} href={`/level/${band.id}`}>
              <g
                onMouseEnter={() => setHover(band.id)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer"
              >
                <polygon
                  points={bandPoints(band.top, band.bottom, band.topW, band.botW)}
                  fill={meta.color}
                  opacity={hover === null || lit ? 0.96 : 0.55}
                  stroke={lit ? "#fbf7ef" : "rgba(251,247,239,0.4)"}
                  strokeWidth={lit ? 3 : 1.25}
                  strokeLinejoin="round"
                />
                <text
                  x={CX}
                  y={textY}
                  textAnchor="middle"
                  fill="#fbf7ef"
                  fontFamily="Georgia, 'Noto Serif TC', serif"
                >
                  <tspan x={CX} fontSize={isApex ? 12 : 13} fill="rgba(251,247,239,0.8)">
                    L{band.id}
                  </tspan>
                  <tspan x={CX} dy={isApex ? 16 : 18} fontSize={isApex ? 15 : 16}>
                    {short}
                  </tspan>
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
