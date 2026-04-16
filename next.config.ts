import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
      }
    ];
  }
};

export default nextConfig;
