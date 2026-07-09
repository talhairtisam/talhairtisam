import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["motion", "simple-icons"],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  turbopack: {
    resolveAlias: {
      three: "./src/lib/three-shim.ts",
      "three-original": "./node_modules/three",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      three: path.join(process.cwd(), "src/lib/three-shim.ts"),
      "three-original": path.join(process.cwd(), "node_modules/three"),
    };
    return config;
  },
};

export default nextConfig;
