import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages from the previous positioning were removed; anything indexed lands on the home page.
  async redirects() {
    return [
      // Pricing belongs to the product (Tesseract), not the company.
      { source: "/pricing", destination: "/tesseract/pricing", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/smb", destination: "/", permanent: true },
      { source: "/entity-find", destination: "/", permanent: true },
      { source: "/entity-find/:path*", destination: "/", permanent: true },
      { source: "/handout.html", destination: "/", permanent: true },
      { source: "/onepager.html", destination: "/", permanent: true },
      { source: "/proposal.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
