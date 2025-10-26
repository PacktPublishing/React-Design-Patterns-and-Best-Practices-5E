import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable Turbopack filesystem caching for development
    turbopackFileSystemCacheForDev: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Updated defaults for Next.js 16
    minimumCacheTTL: 14400, // 4 hours
    qualities: [75],
    maximumRedirects: 3,
    unoptimized: true,
    // Only enable for development or trusted private networks
    dangerouslyAllowLocalIP: false,
  },
};

export default nextConfig;
