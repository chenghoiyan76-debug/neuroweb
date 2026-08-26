export const isGitHubPages = process.env.GITHUB_PAGES === "true";
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || (isGitHubPages ? "https://senus.com" : "");

export function withBase(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (!basePath) return href;
  if (href === "/") return `${basePath}/`;
  return `${basePath}${href}`;
}

export function siteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!siteOrigin) return normalized;
  if (normalized === "/") return `${siteOrigin}${basePath || ""}/`;
  return `${siteOrigin}${basePath}${normalized}`;
}
