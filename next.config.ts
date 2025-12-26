import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedEnv: true
  },
  typedRoutes: true,
  reactCompiler: true
};

export default nextConfig;
