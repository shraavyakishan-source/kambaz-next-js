import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 🚫 Disable ESLint during Vercel builds
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.staradvertiser.com",
      },
    ],
  },
};

export default nextConfig;
