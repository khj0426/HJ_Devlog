import { MetadataRoute } from 'next';

import { getAllPosts } from '~/lib/api';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postsSiteMap = posts.map((post) => {
    return {
      url: `${process.env.NEXT_PUBLIC_PRODUCT_URL}/blog/${post.title}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
    };
  });

  return [
    {
      url: `${process.env.NEXT_PUBLIC_PRODUCT_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_PRODUCT_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_PRODUCT_URL}/notion/resume`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_PRODUCT_URL}/guestbook`,
      lastModified: new Date(),
    },
    ...postsSiteMap,
  ];
}
