'use client';

import type { PostContainerData } from '@/Component/Post/PostContainer';

import { MutableRefObject, useRef } from 'react';

import Skeleton from '@/Component/Common/Skeleton/Skeleton';

import PostItem from './PostItem';

type PostListProps = PostContainerData & {
  isFetchingNextPage?: boolean;
  target?: MutableRefObject<HTMLDivElement | null>;
};

export default function PostList({
  data,
  target,
  isFetchingNextPage,
}: PostListProps) {
  return (
    <>
      {data?.pages?.map((page) =>
        page.posts.map((post) => <PostItem post={post} key={post.title} />)
      )}

      <div ref={target}></div>
      {isFetchingNextPage &&
        Array.from({ length: 6 }).map((value, index) => (
          <Skeleton.Card key={index} />
        ))}
    </>
  );
}
