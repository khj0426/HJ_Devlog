'use client';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Pagination from '@/Component/Common/Pagination/Pagination';
import PostItem from '@/Component/Post/PostItem';
import useCategoryPostQuery from '@/hooks/queries/useCategoryPostQuery';
import usePageNation from '@/hooks/usePagenation';
export default function Home({
  params,
}: {
  params: {
    categoryId: string;
    pageId: number;
  };
}) {
  const route = useRouter();

  params.categoryId = decodeURIComponent(params.categoryId);

  const { data } = useCategoryPostQuery({
    category: params.categoryId,
  });

  const { pageCount, changePage, pageData } = usePageNation({
    limit: 4,
    item: data?.posts ?? [],
  });

  useEffect(() => {
    changePage(params.pageId);
  }, [params.pageId]);

  return (
    <main>
      <header style={{ padding: '64px 0 28px' }}>
        <p style={{ color: 'var(--seed-color-fg-brand)', fontWeight: 700, margin: 0 }}>CATEGORY</p>
        <h1 style={{ fontSize: 'clamp(36px, 7vw, 64px)', letterSpacing: '-0.04em', margin: '8px 0 0' }}>{params.categoryId}</h1>
      </header>
      <section aria-label={`${params.categoryId} 게시글`}>
          {pageData().map((post) => (
            <PostItem key={post.title} post={post} />
          ))}
      </section>
      <Pagination
        numPages={pageCount}
        handleOnClickPage={(page) =>
          route.push(`/category/${params.categoryId}/${page}`)
        }
      />
    </main>
  );
}
