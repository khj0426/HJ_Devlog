'use client';

import usePostQuery from '@/hooks/usePostQuery';
import { useState } from 'react';
import PostLayout from '@/Component/Common/PostLayout';
import Link from 'next/link';
import Title from '@/Component/About/Title';
import Image from 'next/image';
import Button from '@/Component/Common/Button';
import POST_CONSTANT from '@/constants/POST';

export default function PostServiceLayer() {
  const { start, end } = POST_CONSTANT;
  const [endPostNumber, setEndPostNumber] = useState<number>(end);
  const { posts } = usePostQuery([String(start), String(endPostNumber)]);

  return (
    <>
      {posts.map((post) => (
        <PostLayout key={post.title}>
          <Link href={`/blog/${post.slug}`}>
            <Title title={post.title} />
            <p
              style={{
                fontSize: '1rem',
              }}
            >
              {post.date}
            </p>
            {post.content}
          </Link>
          <Image
            src={post.image}
            width={150}
            height={150}
            alt="블로그 대표 이미지"
            style={{
              objectFit: 'cover',
            }}
            priority
          />
        </PostLayout>
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
          margin: '0 auto',
          width: '100px',
          height: '35px',
        }}
      />
    </>
  );
}
