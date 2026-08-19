export const isGitHubPages = process.env.GITHUB_PAGES === "true" || process.env.NEXT_PUBLIC_BASE_PATH === "/neuroweb";
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGitHubPages ? "/neuroweb" : "");
export const siteOrigin = isGitHubPages || basePath === "/neuroweb"
  ? "https://chenghoiyan76-debug.github.io"
  : "";

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
