// next.config.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,  // unused CSS’ni avtomatik olib tashlash
  },
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
}

// Bundle analyzer bilan birlashtirib export qilamiz
module.exports = withBundleAnalyzer(nextConfig)
