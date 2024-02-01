import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlaiceholder from '@plaiceholder/next';
import { withSentryConfig } from '@sentry/nextjs';

const bundleAnalyzerConfig = withBundleAnalyzer({
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
  basePath: '/',
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

export default withPlaiceholder(
  withSentryConfig(bundleAnalyzerConfig, sentryConfig)
);