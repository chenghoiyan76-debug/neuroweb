import { NextResponse } from "next/server";
import { labCookieIsValid } from "@/lib/lab-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: await labCookieIsValid() });
}
