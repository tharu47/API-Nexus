import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, 
    domains: ["m.media-amazon.com", "cdn.weatherapi.com"],
  },
};

export default nextConfig;
