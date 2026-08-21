import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves this portfolio as a static export. The site’s
  // interactions run in the browser, so no Next.js request-time server is
  // required for the current experience.
  output: "export",
  images: {
    // Static Pages hosting has no Next.js image optimization endpoint.
    unoptimized: true,
  },
};

export default nextConfig;
