import { cookies } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export const LOCALE_COOKIE = "mn_locale";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}
