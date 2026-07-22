import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  async rewrites() {
    return [{ source: "/", destination: "/landing.html" }];
  },
};

export default nextConfig;
