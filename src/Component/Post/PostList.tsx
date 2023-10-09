'use client';

import { useRecoilState } from 'recoil';

import { postCurPage } from '@/app/globalAtom';
import Button from '@/Component/Common/Button';
import POST_CONSTANT from '@/constants/POST';
import usePostQuery from '@/hooks/usePostQuery';

import PostItem from './PostItem';

export default function PostServiceLayer() {
  const { start, end } = POST_CONSTANT;
  const [endPostNumber, setEndPostNumber] = useRecoilState(postCurPage);
  const { posts } = usePostQuery([String(start), String(endPostNumber)]);

  return (
    <>
      {posts.map((post) => (
        <PostItem post={post} key={post.title} />
      ))}

      <Button
        label="더 보기"
        onClick={() => {
          setEndPostNumber(endPostNumber + 5);
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '35px auto',
          width: '100px',
          height: '35px',
        }}
      />
    </>
  );
}
