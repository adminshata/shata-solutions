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
  async headers() {
    return [
      {
        source: "/t/:path*/menu",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=300, stale-while-revalidate=60" }],
      },
    ];
  },
};
export default nextConfig;
