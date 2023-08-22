const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

const bundleAnalyzerConfig = withBundleAnalyzer({
  ...nextConfig,
  compress: true,
});

const sentryConfig = {
  silent: true,
  org: 'kim0426-00d4b8e8c',
  project: 'my-blog',
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
};

module.exports = withSentryConfig(bundleAnalyzerConfig, sentryConfig);
