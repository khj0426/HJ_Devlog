declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    image: string;
  };

  const MDXContent: ComponentType;
  export default MDXContent;
}
