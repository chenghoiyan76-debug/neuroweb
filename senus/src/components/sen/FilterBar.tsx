"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { pick, ui } from "@/lib/i18n";
import { useLocale } from "@/components/LocaleProvider";
import {
  abilityLevels,
  ageBands,
  difficultyOptions,
  resourceFormats,
  senTags,
  timeNeeded,
} from "@/lib/sen-taxonomy";
import type { AbilityLevel, AgeBand, DifficultyStars, ResourceFormat, SenTag, TimeNeeded } from "@/lib/sen-types";

const AGE_KEY = "age";
const LEVEL_KEY = "level";
const SEN_KEY = "sen";
const FORMAT_KEY = "format";
const TIME_KEY = "time";
const DIFF_KEY = "diff";

export function FilterBar({ resultCount }: { resultCount: number }) {
  const locale = useLocale();
  const t = ui[locale];
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function selected(key: string) {
    return params.getAll(key);
  }

  function toggle(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    const current = next.getAll(key);
    next.delete(key);
    const exists = current.includes(value);
    const updated = exists ? current.filter((item) => item !== value) : [...current, value];
    for (const item of updated) next.append(key, item);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function setQuery(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clear() {
    router.replace(pathname, { scroll: false });
  }

  const hasFilters = [...params.keys()].some((key) => key !== "situation");

  return (
    <div className="rounded-2xl border border-rule bg-paper-2 p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label className="block min-w-[16rem] flex-1">
          <span className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">{t.filterSearch}</span>
          <input
            defaultValue={params.get("q") ?? ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.senSearchPlaceholder}
            className="mt-1 w-full rounded-xl border border-rule bg-paper px-3 py-2 text-sm"
          />
        </label>
        <p className="text-sm text-ink-soft">
          {locale === "en" ? `${resultCount} resources` : `${resultCount} 份教材`}
        </p>
        {hasFilters ? (
          <button type="button" onClick={clear} className="text-[12px] text-teal hover:underline">
            {t.clearFilters}
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ChipGroup
          label={t.filterAge}
          options={ageBands.map((item) => ({ value: item.slug, label: pick(item.title, locale) }))}
          selected={selected(AGE_KEY)}
          onToggle={(value) => toggle(AGE_KEY, value)}
        />
        <ChipGroup
          label={t.filterLevel}
          options={abilityLevels.map((item) => ({ value: item.slug, label: pick(item.title, locale) }))}
          selected={selected(LEVEL_KEY)}
          onToggle={(value) => toggle(LEVEL_KEY, value)}
        />
        <ChipGroup
          label={t.filterFormat}
          options={resourceFormats.map((item) => ({ value: item.slug, label: pick(item.title, locale) }))}
          selected={selected(FORMAT_KEY)}
          onToggle={(value) => toggle(FORMAT_KEY, value)}
        />
        <ChipGroup
          label={t.filterTime}
          options={timeNeeded.map((item) => ({ value: item.slug, label: pick(item.title, locale) }))}
          selected={selected(TIME_KEY)}
          onToggle={(value) => toggle(TIME_KEY, value)}
        />
        <ChipGroup
          label={t.filterDifficulty}
          options={difficultyOptions.map((item) => ({ value: String(item.slug), label: pick(item.title, locale) }))}
          selected={selected(DIFF_KEY)}
          onToggle={(value) => toggle(DIFF_KEY, value)}
        />
        <ChipGroup
          label={t.filterSen}
          hint={t.filterSenHint}
          options={senTags.map((item) => ({ value: item.slug, label: pick(item.title, locale) }))}
          selected={selected(SEN_KEY)}
          onToggle={(value) => toggle(SEN_KEY, value)}
        />
      </div>
    </div>
  );
}

function ChipGroup({
  label,
  hint,
  options,
  selected,
  onToggle,
}: {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">{label}</legend>
      {hint ? <p className="mt-1 text-[11px] leading-snug text-ink-soft">{hint}</p> : null}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className={`rounded-full border px-2.5 py-1 text-[12px] ${
                active ? "border-night bg-night text-paper-2" : "border-rule bg-paper hover:border-gold"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function filtersFromParams(params: URLSearchParams) {
  const ages = params.getAll("age") as AgeBand[];
  const levels = params.getAll("level") as AbilityLevel[];
  const sen = params.getAll("sen") as SenTag[];
  const formats = params.getAll("format") as ResourceFormat[];
  const times = params.getAll("time") as TimeNeeded[];
  const diffs = params.getAll("diff").map((item) => Number(item) as DifficultyStars);
  return {
    ages: ages.length ? ages : undefined,
    levels: levels.length ? levels : undefined,
    senTags: sen.length ? sen : undefined,
    formats: formats.length ? formats : undefined,
    times: times.length ? times : undefined,
    difficulties: diffs.length ? diffs : undefined,
    query: params.get("q") ?? undefined,
  };
}
