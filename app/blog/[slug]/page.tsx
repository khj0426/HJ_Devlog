import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Comments from '@/components/Comments';
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
  return (
    <>
      <nav
        aria-label="게시글 탐색"
        className="sticky top-0 z-10 bg-white/90 py-3 backdrop-blur-sm dark:bg-zinc-950/90"
      >
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-500 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <span aria-hidden="true">←</span>
          <span className="ml-1">글 목록</span>
        </Link>
      </nav>
      <Post />
      <Comments />
    </>
  );
}
