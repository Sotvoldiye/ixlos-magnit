// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
        unoptimized: true, // developmentda tezroq ishlash uchun
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/product-images/**',
      },
    ],
  },
};
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,  // unused CSS’ni avtomatik olib tashlash
  },
})

module.exports = nextConfig;
