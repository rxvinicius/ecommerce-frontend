import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/admin/products",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
