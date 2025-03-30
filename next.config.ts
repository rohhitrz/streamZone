import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    return config;
  },
  experimental: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    logger: {
      warn: function(message: string) {
        return;
      },
      debug: function(message: string) {
        return;
      }
    },
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
      },
      {
        protocol: 'https',
        hostname: 'robohash.org'
      },
      {
        protocol: 'https',
        hostname: 'avatars.dicebear.com'
      },
      {
        protocol: 'https',
        hostname: 'api.multiavatar.com'
      }
    ],
  },
  async rewrites() {
    return [];
  },
};

export default nextConfig;
