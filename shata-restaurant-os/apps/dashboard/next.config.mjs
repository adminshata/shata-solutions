/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@shata/ui", "@shata/types"],
  experimental: { serverComponentsExternalPackages: ["@shata/database"] },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.shataos.com" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "*.r2.dev" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};
export default nextConfig;
