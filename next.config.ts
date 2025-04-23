import { type NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nordicapis.com",
      },
      {
        protocol: "https",
        hostname: "codewithmosh.com",
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
