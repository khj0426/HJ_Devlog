'use client';

import type { PostContainerData } from '@/Component/Post/PostContainer';

import { MutableRefObject } from 'react';

import PostItem from './PostItem';

type PostListProps = PostContainerData & {
  target?: MutableRefObject<HTMLDivElement | null>;
};

export default function PostList({ data, target }: PostListProps) {
  return (
    <>
      {data?.pages?.map((page) =>
        page.posts.map((post) => <PostItem post={post} key={post.title} />)
      )}

      <div ref={target}></div>
    </>
  );
}
