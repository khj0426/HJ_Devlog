import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: { mdxRs: { mdxType: 'gfm' } },
};

export default createMDX({})(nextConfig);
