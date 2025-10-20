/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@monorepo/ui", "@monorepo/utils"],
};

module.exports = nextConfig;
