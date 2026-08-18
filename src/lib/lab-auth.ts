import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "npi_lab";

export function labKey() {
  return process.env.NPI_LAB_KEY || (process.env.NODE_ENV === "production" ? "" : "NeuroPsychLab");
}

function tokenFor(key: string) {
  const secret = process.env.NPI_LAB_SECRET || key || "npi-local-secret";
  return createHmac("sha256", secret).update(`npi-lab:${key}`).digest("hex");
}

export async function labCookieIsValid() {
  const key = labKey();
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

export async function setLabCookie() {
  const key = labKey();
  const jar = await cookies();
  jar.set(COOKIE, tokenFor(key), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearLabCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function passwordMatches(input: string) {
  const key = labKey();
  if (!key) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(key);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
