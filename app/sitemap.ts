import type { MetadataRoute } from 'next';
import { postLoaders } from '@/content/posts';
import { reflections } from '@/content/reflections';

const SITE_URL = 'https://hj-devlog.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = Object.keys(postLoaders).map((slug) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(slug)}`,
    lastModified: new Date(),
  }));
  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/reflection`, lastModified: new Date() },
    ...reflections.map(({ slug }) => ({ url: `${SITE_URL}/reflection/${slug}`, lastModified: new Date() })),
    ...posts,
  ];
}
