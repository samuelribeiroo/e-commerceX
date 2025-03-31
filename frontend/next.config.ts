import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: ".next",
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  extensionAlias: {
    '.js': ['.ts', '.tsx', '.js'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), 
    };
    return config;
  },
};

export default nextConfig;