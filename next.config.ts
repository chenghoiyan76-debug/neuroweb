import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/dsm", destination: "/domain/psychiatry-dsm5", permanent: false },
      { source: "/dsm/:path*", destination: "/domain/psychiatry-dsm5", permanent: false },
      { source: "/symptoms", destination: "/level/3", permanent: false },
      { source: "/symptoms/:path*", destination: "/level/3", permanent: false },
      { source: "/neuropharmacology", destination: "/domain/neuropharmacology", permanent: false },
      { source: "/neuropharmacology/:path*", destination: "/domain/neuropharmacology", permanent: false },
      { source: "/interventions", destination: "/domain/psychotherapy-processes", permanent: false },
      { source: "/interventions/:path*", destination: "/domain/psychotherapy-processes", permanent: false },
      { source: "/fundamentals", destination: "/level/1", permanent: false },
      { source: "/fundamentals/:path*", destination: "/level/1", permanent: false },
      { source: "/models", destination: "/level/1", permanent: false },
      { source: "/models/:path*", destination: "/level/1", permanent: false },
      { source: "/psychiatry", destination: "/level/4", permanent: false },
      { source: "/psychiatry/:path*", destination: "/level/4", permanent: false },
      { source: "/therapy", destination: "/domain/psychotherapy-processes", permanent: false },
      { source: "/therapy/:path*", destination: "/domain/psychotherapy-processes", permanent: false },
      { source: "/reviews", destination: "/search", permanent: false },
      { source: "/cases", destination: "/level/4", permanent: false },
      { source: "/glossary", destination: "/search", permanent: false },
      { source: "/garden", destination: "/admin", permanent: false },
      { source: "/lab", destination: "/admin", permanent: false },
      { source: "/domain/mood-disorders", destination: "/domain/depressive-disorders", permanent: false },
      { source: "/domain/anxiety-stressor", destination: "/domain/anxiety-disorders", permanent: false },
      { source: "/tags/:path*", destination: "/search", permanent: false },
    ];
  },
};

export default nextConfig;
