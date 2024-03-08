'use client';

import { SkeletonCard } from '@/Component/Common/Skeleton/Card';
import usePostQuery from '@/hooks/queries/usePostQuery';
import useInfiniteQueryObserver from '@/hooks/useInfiniteQueryObserver';

import PostList from './PostList';

export type PostContainerData = Pick<ReturnType<typeof usePostQuery>, 'data'>;

export default function PostContainer() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostQuery();
  const { target } = useInfiniteQueryObserver({
    threshold: 1,
    hasNextPage,
    fetchNextPage,
  });

  return (
    <>
      <PostList data={data} target={target} />
      {isFetchingNextPage &&
        Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
    </>
  );
}
