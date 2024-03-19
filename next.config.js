/**
 * @type {import('next').NextConfig}
 */
const withBundleAnalyzer = require('@next/bundle-analyzer');
const { withSentryConfig } = require('@sentry/nextjs');

const isProduction = process.env.NODE_ENV === 'production';

const securityHeaders = [
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
        __RRWEB_EXCLUDE_IFRAME__: true,
        __RRWEB_EXCLUDE_SHADOW_DOM__: true,
        __SENTRY_EXCLUDE_REPLAY_WORKER__: true,
      })
    );

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /test.*\.tsx$/,
      })
    );
    return config;
  },

  reactStrictMode: true,
  compiler: {
    removeConsole: true,
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
  compress: true,
};

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

module.exports = withSentryConfig(nextConfig, sentryConfig);
