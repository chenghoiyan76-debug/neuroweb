"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, useState, type ReactNode } from "react";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "senus_locale";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({ locale: defaultLocale, setLocale: () => undefined });

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY) ?? undefined;
  return isLocale(stored) ? stored : defaultLocale;
}

function getServerSnapshot(): Locale {
  return defaultLocale;
}

export function LocaleProvider({
  locale: initial,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [override, setOverride] = useState<Locale | null>(null);
  const locale = override ?? stored ?? initial;

  function setLocale(next: Locale) {
    window.localStorage.setItem(STORAGE_KEY, next);
    setOverride(next);
  }

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-Hant";
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext).locale;
}

export function useSetLocale() {
  return useContext(LocaleContext).setLocale;
}
