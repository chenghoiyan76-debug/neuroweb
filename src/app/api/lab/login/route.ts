import { NextResponse } from "next/server";
import { labKey, passwordMatches, setLabCookie } from "@/lib/lab-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!labKey()) {
    return NextResponse.json({ error: "Lab key is not configured." }, { status: 503 });
  }
  const body = (await request.json()) as { password?: string };
  if (!body.password || !passwordMatches(body.password)) {
    return NextResponse.json({ error: "金鑰不正確。" }, { status: 401 });
  }
  await setLabCookie();
  return NextResponse.json({ ok: true });
}
