'use client';
import { useRouter } from 'next/navigation';

import Pagination from '@/Component/Common/Pagination/Pagination';
import Skeleton from '@/Component/Common/Skeleton/Skeleton';
import PostItem from '@/Component/Post/PostItem';
import useCategoryPostQuery from '@/hooks/queries/useCategoryPostQuery';
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

  const startPostNumber = (params.pageId - 1) * 4;
  const endPostNumber = startPostNumber + 4;

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

        {data?.posts.slice(startPostNumber, endPostNumber).map((post) => (
          <PostItem key={post.title} post={post} />
        ))}
      </main>
      <Pagination
        limit={4}
        totalPage={data?.posts?.length ?? 10}
        handleOnClickPage={(page) =>
          route.push(`/category/${params.categoryId}/${page}`)
        }
      />
    </>
  );
}
