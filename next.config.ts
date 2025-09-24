import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚨 This disables ESLint checks during Vercel builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
