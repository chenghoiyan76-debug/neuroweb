import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/neuroweb" : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: basePath || undefined,
  trailingSlash: isGitHubPages,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

if (!isGitHubPages) {
  nextConfig.redirects = async () => [
    { source: "/lab", destination: "/admin", permanent: false },
    { source: "/garden", destination: "/admin", permanent: false },
    { source: "/study", destination: "/notes", permanent: false },
    { source: "/study-note", destination: "/notes", permanent: false },
    { source: "/book-review", destination: "/books", permanent: false },
    { source: "/reviews", destination: "/books", permanent: false },
  ];
}

export default nextConfig;
