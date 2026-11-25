'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { PostSummary } from '@/content/posts';

type PostSearchProps = {
  posts: readonly PostSummary[];
};

function normalize(value: string) {
  return value.normalize('NFKC').toLocaleLowerCase('ko').trim();
}

export default function PostSearch({ posts }: PostSearchProps) {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalize(query);

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) return posts;

    return posts.filter((post) => {
      const searchableText = [
        post.title,
        post.description,
        post.category ?? '',
        ...post.tags,
      ].join(' ');

      return normalize(searchableText).includes(normalizedQuery);
    });
  }, [normalizedQuery, posts]);

  return (
    <div className="mt-6">
      <label htmlFor="post-search" className="sr-only">
        게시글 검색
      </label>
      <div className="relative">
        <input
          id="post-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="글 검색"
          autoComplete="off"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="검색어 지우기"
            className="absolute inset-y-0 right-0 px-3 text-gray-400 transition-colors hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200"
          >
            ×
          </button>
        )}
      </div>

      <p className="mt-3 text-sm text-gray-400 dark:text-zinc-500" aria-live="polite">
        {normalizedQuery ? `${filteredPosts.length}개의 글` : `전체 ${posts.length}개의 글`}
      </p>

      {filteredPosts.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {filteredPosts.map((post) => (
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
      ) : (
        <p className="mt-8 text-sm text-gray-500 dark:text-zinc-400">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
