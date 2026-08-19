import { NextResponse } from "next/server";
import { newId, today } from "@/lib/markdown";
import { isSiteContent, readSiteContent, writeSiteContent } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; email?: string; message?: string };
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  if (!name || !email || !message || message.length > 4000) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }
  const content = await readSiteContent();
  if (!isSiteContent(content)) {
    return NextResponse.json({ error: "Site not ready" }, { status: 500 });
  }
  content.messages = [
    {
      id: newId(),
      name,
      email,
      message,
      createdAt: `${today()}T${new Date().toISOString().slice(11, 19)}`,
      read: false,
    },
    ...content.messages,
  ].slice(0, 200);
  await writeSiteContent(content);
  return NextResponse.json({ ok: true });
}
