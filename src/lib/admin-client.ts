import { withBase } from "@/lib/site";
import type { SiteContent } from "@/lib/types";

export const LOCAL_CONTENT_KEY = "yanis-cheng-note-content";
export const LOCAL_SESSION_KEY = "yanis-cheng-note-admin";

export type AdminMode = "server" | "local";

export function staticAdminPassword() {
  return process.env.NEXT_PUBLIC_ADMIN_KEY || "MindNoteStudio";
}

function adminUrl(path: string) {
  return withBase(path);
}

function isJsonResponse(response: Response) {
  return (response.headers.get("content-type") || "").includes("application/json");
}

export function readLocalContent(): SiteContent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_CONTENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SiteContent;
    return parsed?.profile ? parsed : null;
  } catch {
    return null;
  }
}

export function writeLocalContent(content: SiteContent) {
  localStorage.setItem(LOCAL_CONTENT_KEY, JSON.stringify(content));
}

export function downloadContent(content: SiteContent) {
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "site-content.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function probeSession(): Promise<{ authed: boolean; mode: AdminMode }> {
  try {
    const response = await fetch(adminUrl("/api/admin/session"), {
      cache: "no-store",
      credentials: "include",
    });
    if (response.ok && isJsonResponse(response)) {
      const data = (await response.json()) as { ok?: boolean };
      return { authed: Boolean(data.ok), mode: "server" };
    }
  } catch {
    // GitHub Pages and other static hosts have no API.
  }
  return {
    authed: typeof window !== "undefined" && sessionStorage.getItem(LOCAL_SESSION_KEY) === "1",
    mode: "local",
  };
}

export async function loginAdmin(password: string): Promise<{ ok: boolean; mode: AdminMode }> {
  try {
    const response = await fetch(adminUrl("/api/admin/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (response.ok && isJsonResponse(response)) {
      sessionStorage.setItem(LOCAL_SESSION_KEY, "1");
      return { ok: true, mode: "server" };
    }
    if (response.status === 401) {
      return { ok: false, mode: "server" };
    }
  } catch {
    // fall through to local password
  }
  if (password === staticAdminPassword()) {
    sessionStorage.setItem(LOCAL_SESSION_KEY, "1");
    return { ok: true, mode: "local" };
  }
  return { ok: false, mode: "local" };
}

export async function logoutAdmin(mode: AdminMode) {
  sessionStorage.removeItem(LOCAL_SESSION_KEY);
  if (mode === "server") {
    await fetch(adminUrl("/api/admin/logout"), { method: "POST", credentials: "include" }).catch(() => undefined);
  }
}

export async function saveAdminContent(content: SiteContent, mode: AdminMode): Promise<SiteContent> {
  writeLocalContent(content);
  if (mode === "server") {
    const response = await fetch(adminUrl("/api/admin/content"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(content),
    });
    if (response.ok && isJsonResponse(response)) {
      const saved = (await response.json()) as SiteContent;
      writeLocalContent(saved);
      return saved;
    }
  }
  downloadContent(content);
  return content;
}
