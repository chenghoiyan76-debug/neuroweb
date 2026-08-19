import { NextResponse } from "next/server";
import { adminKey, passwordMatches, setAdminCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!adminKey()) {
    return NextResponse.json({ error: "Admin key is not configured." }, { status: 503 });
  }
  const body = (await request.json()) as { password?: string };
  if (!body.password || !passwordMatches(body.password)) {
    return NextResponse.json({ error: "密碼不正確。" }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
