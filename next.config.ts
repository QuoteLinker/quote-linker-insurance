import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placeholder.svg",
      },
    ],
    unoptimized: true,
  },
  // Enable React Compiler (stable in Next.js 16)
  reactCompiler: true,
  // Enable experimental features
  experimental: {
    // Enable cache components
    cacheComponents: true,
  },
}

export default nextConfig
