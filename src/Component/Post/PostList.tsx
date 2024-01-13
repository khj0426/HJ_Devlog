'use client';

import Spinner from '@/Component/Common/Spinner';
import usePostQuery from '@/hooks/queries/usePostQuery';
import useObserver from '@/hooks/useObserver';

import PostItem from './PostItem';

export default function PostServiceLayer() {
  //TODO - 스피너 대신 스켈레톤UI로 수정 필요
  const { data, fetchNextPage, hasNextPage, isFetching } = usePostQuery();
  const { target } = useObserver({
    threshold: 0.1,
    hasNextPage,
    fetchNextPage,
  });

  return (
    <>
      {data?.pages?.map((page) =>
        page.posts.map((post) => <PostItem post={post} key={post.title} />)
      )}

      <div ref={target}></div>
    </>
  );
}
