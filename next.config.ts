import { type NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.usatoday.com",
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
