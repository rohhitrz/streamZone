import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    return config;
  },
  experimental: {},
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ],
  },
  async rewrites() {
    return [];
  },
};

export default nextConfig;
