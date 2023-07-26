import { MetadataRoute } from 'next';
import { getAllPosts } from '../../lib/api';

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_SUFFIX = 'https://hj-devlog.vercel.app';
  const posts = getAllPosts(['title', 'date']);

  const postsSiteMap = posts.map((post) => {
    return { url: `/blog/${post.title}`, lastModified: new Date() };
  });

  console.log(postsSiteMap);

  return [
    {
      url: `${SITE_SUFFIX}`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_SUFFIX}/about`,
      lastModified: new Date(),
    },
    ...postsSiteMap,
  ];
}
