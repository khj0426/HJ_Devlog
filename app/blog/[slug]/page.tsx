import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { postLoaders, type PostSlug } from '@/content/posts';

type PageProps = { params: Promise<{ slug: string }> };

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug) as PostSlug;
  } catch {
    return slug as PostSlug;
  }
}

export function generateStaticParams() {
  return Object.keys(postLoaders).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const paramsValue = await params;
  const slug = decodeSlug(paramsValue.slug);
  const loader = postLoaders[slug];
  if (!loader) return {};
  const { post } = await loader();
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${encodeURIComponent(post.slug)}` },
    openGraph: post.image ? { images: [post.image] } : undefined,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const paramsValue = await params;
  const slug = decodeSlug(paramsValue.slug);
  const loader = postLoaders[slug];
  if (!loader) notFound();
  const { default: Post } = await loader();
  return <Post />;
}
