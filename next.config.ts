import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The preview environment (and any tunnel used for remote testing) must be
  // allowed to request dev assets, otherwise HMR + RSC payloads are blocked.
  allowedDevOrigins: ["**.e2b.app", "**.e2b.dev", "*.trycloudflare.com"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
