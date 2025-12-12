import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/havenz-company-logos/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/havenz-user-avatars/**",
      },
    ],
  },
};

export default nextConfig;
