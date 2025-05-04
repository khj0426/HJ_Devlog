"use client";

import { SkeletonCard } from "@hj-devlog/shared/src/components/Skeleton/Card";

import usePostQuery from "../../hooks/queries/usePostQuery";

import InfinityPostList from "./InfinityPostList";
import useInfiniteQueryObserver from "~/src/hooks/useInfiniteQueryObserver";

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
