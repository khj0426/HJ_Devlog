import type { MetadataRoute } from 'next';
import { posts } from '@/content/posts';

const SITE_URL = 'https://hj-devlog.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: new Date(`${post.date}T00:00:00+09:00`),
  }));
  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/resume`, lastModified: new Date() },
    ...postEntries,
  ];
}
