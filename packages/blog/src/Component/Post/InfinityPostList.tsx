"use client";

import { MutableRefObject } from "react";

import { PostContainerData } from "./PostContainer";
import PostItem from "./PostItem";

type PostListProps = PostContainerData & {
  target?: MutableRefObject<HTMLDivElement | null>;
};

export default function InfinityPostList({ data, target }: PostListProps) {
  return (
    <>
      {data?.pages?.map((page) =>
        page.posts.map((post) => <PostItem post={post} key={post.title} />)
      )}

      <div ref={target}></div>
    </>
  );
}
