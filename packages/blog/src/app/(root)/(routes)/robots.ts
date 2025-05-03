import { MetadataRoute } from 'next';

import getCurrentBasePath from '@/utils/getCurrentBasePath';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${getCurrentBasePath()}/sitemap.xml`,
  };
}
