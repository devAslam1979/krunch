import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "krunch.pythonanywhere.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
