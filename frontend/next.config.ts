import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    proxyTimeout: 5000, // enable new proxy system
  },
};

export default nextConfig;
