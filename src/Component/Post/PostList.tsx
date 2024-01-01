'use client';

import Spinner from '@/Component/Common/Spinner';
import usePostQuery from '@/hooks/queries/usePostQuery';
import useObserver from '@/hooks/useObserver';

import PostItem from './PostItem';

export default function PostServiceLayer() {
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
      {isFetching && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Spinner size={50} />
        </div>
      )}
      <div ref={target}></div>
    </>
  );
}
