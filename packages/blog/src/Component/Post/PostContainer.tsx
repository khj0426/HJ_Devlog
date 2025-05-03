"use client";

import { SkeletonCard } from "~/packages/shared/src/components/Skeleton/Card";
import InfinityPostList from "~/packages/blog/src/Component/Post/InfinityPostList";
import usePostQuery from "~/packages/blog/src/hooks/queries/usePostQuery";
import useInfiniteQueryObserver from "~/packages/shared/src/hooks/useInfiniteQueryObserver";

export type PostContainerData = Pick<ReturnType<typeof usePostQuery>, "data">;

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
      <InfinityPostList data={data} target={target} />
      {isFetchingNextPage &&
        Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
    </>
  );
}
