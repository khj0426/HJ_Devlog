/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = withBundleAnalyzer({
  nextConfig,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
});
