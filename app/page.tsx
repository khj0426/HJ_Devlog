import Link from 'next/link';

import { posts } from '@/content/posts';

export default function Home() {
  return (
    <>
      <header>
        <h1>HJ Devlog</h1>
        <p className="mt-6 leading-7">
          웹 개발을 도구로 멋진 제품을 만듭니다.
          <br />
          일과 제품에 애정을 가지고 몰입하는 것을 좋아합니다.
        </p>
        <p className="mt-4">
          <Link href="/resume">Resume</Link>
        </p>
      </header>

      <section aria-labelledby="posts-heading">
        <h2 id="posts-heading">Posts</h2>
        <ul className="mt-6 space-y-2">
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="min-w-0">
                {post.title}
              </Link>
              <time dateTime={post.date} className="shrink-0 text-sm text-gray-400 dark:text-zinc-500">
                {post.date}
              </time>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
