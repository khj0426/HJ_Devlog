'use client';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Pagination from '@/Component/Common/Pagination/Pagination';
import Skeleton from '@/Component/Common/Skeleton/Skeleton';
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

  const { data, isFetching } = useCategoryPostQuery({
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
    <>
      <h2>{params.categoryId}</h2>
      <main
        style={{
          display: 'flex',
          margin: '0 auto',
          justifyContent: 'center',
        }}
      >
        {isFetching &&
          Array.from({ length: 4 }).map((value, index) => (
            <Skeleton.Card key={index} />
          ))}

        {pageData().map((post) => (
          <PostItem key={post.title} post={post} />
        ))}
      </main>
      <Pagination
        numPages={pageCount}
        handleOnClickPage={(page) =>
          route.push(`/category/${params.categoryId}/${page}`)
        }
      />
    </>
  );
}
