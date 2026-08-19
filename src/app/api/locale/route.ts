import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";
import { LOCALE_COOKIE } from "@/lib/locale";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { locale?: string };
  if (!isLocale(body.locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }
  const response = NextResponse.json({ ok: true, locale: body.locale });
  response.cookies.set(LOCALE_COOKIE, body.locale, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
