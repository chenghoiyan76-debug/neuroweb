import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/lab", "/api/lab"] },
    sitemap: "https://neuropsych-integrator.local/sitemap.xml",
  };
}
