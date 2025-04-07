import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/admin/products",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
