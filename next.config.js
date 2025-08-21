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

module.exports = nextConfig;
