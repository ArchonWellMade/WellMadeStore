import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  experimental: {
    // Product image morphs + directional slides between products
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ojbutpiudhrxceilbdkv.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.thefastimg.com",
      },
    ],
  },
};

export default nextConfig;
