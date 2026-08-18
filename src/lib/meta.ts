import { bilingualTitle } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function pageTitle(zh: string, en: string) {
  const locale = await getLocale();
  return { title: bilingualTitle(zh, en, locale) };
}

export async function notePageTitle(
  note: { zh: string; en: string } | undefined,
  fallbackZh: string,
  fallbackEn: string,
) {
  const locale = await getLocale();
  if (!note) return { title: bilingualTitle(fallbackZh, fallbackEn, locale) };
  return { title: bilingualTitle(note.zh, note.en, locale) };
}
