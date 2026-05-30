/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@shata/ui", "@shata/types"],
  experimental: { serverComponentsExternalPackages: ["@shata/database"] },
  images: { unoptimized: true },
};
export default nextConfig;
