import { NextResponse } from "next/server";
import { adminCookieIsValid } from "@/lib/auth";
import { isSiteContent, writeSiteContent } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  if (!(await adminCookieIsValid())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: unknown = await request.json();
  if (!isSiteContent(body)) {
    return NextResponse.json({ error: "Invalid SiteContent JSON" }, { status: 400 });
  }
  const saved = await writeSiteContent(body);
  return NextResponse.json(saved);
}
