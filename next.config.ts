import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/models", destination: "/fundamentals", permanent: false },
      { source: "/models/:path*", destination: "/fundamentals", permanent: false },
      { source: "/psychiatry", destination: "/neuropharmacology", permanent: false },
      { source: "/psychiatry/:path*", destination: "/neuropharmacology", permanent: false },
      { source: "/therapy", destination: "/interventions", permanent: false },
      { source: "/therapy/:path*", destination: "/interventions", permanent: false },
      { source: "/reviews", destination: "/interventions", permanent: false },
      { source: "/reviews/:path*", destination: "/interventions", permanent: false },
      { source: "/cases", destination: "/dsm", permanent: false },
      { source: "/cases/:path*", destination: "/dsm", permanent: false },
      { source: "/glossary", destination: "/search", permanent: false },
      { source: "/editorial", destination: "/about", permanent: false },
      { source: "/tags/:path*", destination: "/search", permanent: false },
    ];
  },
};

export default nextConfig;
