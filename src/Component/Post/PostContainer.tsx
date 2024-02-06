'use client';

import usePostQuery from '@/hooks/queries/usePostQuery';
import useObserver from '@/hooks/useObserver';

import PostList from './PostList';

export type PostContainerData = Pick<ReturnType<typeof usePostQuery>, 'data'>;

export default function PostContainer() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostQuery();
  const { target } = useObserver({
    threshold: 0.7,
    hasNextPage,
    fetchNextPage,
  });

  return (
    <PostList
      data={data}
      target={target}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
