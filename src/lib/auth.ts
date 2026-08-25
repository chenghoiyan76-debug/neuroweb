import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "mn_admin";

export function adminKey() {
  return process.env.ADMIN_KEY || process.env.NEXT_PUBLIC_ADMIN_KEY || "MindNoteStudio";
}

function tokenFor(key: string) {
  const secret = process.env.ADMIN_SECRET || key || "mind-note-local-secret";
  return createHmac("sha256", secret).update(`mn-admin:${key}`).digest("hex");
}

export async function adminCookieIsValid() {
  const key = adminKey();
  if (!key) return false;
  const jar = await cookies();
  const value = jar.get(COOKIE)?.value;
  if (!value) return false;
  const expected = tokenFor(key);
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function setAdminCookie() {
  const key = adminKey();
  const jar = await cookies();
  jar.set(COOKIE, tokenFor(key), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production" && process.env.GITHUB_PAGES !== "true",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function passwordMatches(input: string) {
  const key = adminKey();
  if (!key) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(key);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
