import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "**.cloudflare.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
