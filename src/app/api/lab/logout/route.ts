import { NextResponse } from "next/server";
import { clearLabCookie } from "@/lib/lab-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  await clearLabCookie();
  return NextResponse.json({ ok: true });
}
