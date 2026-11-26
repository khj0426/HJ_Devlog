import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Comments from '@/components/Comments';
import { postLoaders, posts, type PostSlug } from '@/content/posts';

type PageProps = { params: Promise<{ slug: string }> };

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug) as PostSlug;
  } catch {
    return slug as PostSlug;
  }
}

function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return `${year}년 ${month}월 ${day}일`;
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
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const { default: Post } = await loader();
  return (
    <>
      <nav
        aria-label="게시글 탐색"
        className="sticky top-0 z-10 -mx-8 bg-white/95 px-8 py-3 backdrop-blur-sm dark:bg-zinc-950/95"
      >
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-500 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <span aria-hidden="true">←</span>
          <span className="ml-1">글 목록</span>
        </Link>
      </nav>
      <article>
        <header className="mb-10 border-b border-gray-200 pb-8 pt-6 dark:border-zinc-800">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-zinc-100">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            <span>{post.readingMinutes}분 읽기</span>
          </p>
        </header>
        <div className={post.hasTitleHeading ? 'post-content hide-title-heading' : 'post-content'}>
          <Post />
        </div>
      </article>
      <Comments />
    </>
  );
}
