/**
 * @type {import('next').NextConfig}
 */
const {
  withSentryConfig,
} = require('@sentry/nextjs/cjs/config/withSentryConfig');

const nextConfig = {
  compress: true,
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
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
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
if (process.env.NODE_ENV === 'production') {
  module.exports = withSentryConfig(nextConfig, sentryConfig);
}
module.exports = nextConfig;
