import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.map-of-netherlands.co.uk"
          }
        ],
        destination: "https://map-of-netherlands.co.uk/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http"
          }
        ],
        destination: "https://map-of-netherlands.co.uk/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
