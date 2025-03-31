import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  distDir: '.next',
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
