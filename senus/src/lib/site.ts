export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://sencus.com";
export const basePath = "";

export function withBase(href: string) {
  return href;
}

export function siteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${siteOrigin}/`;
  return `${siteOrigin}${normalized}`;
}
