'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import Title from '@/Component/About/Title';

const PostCard = styled.div`
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  width: 350px;
  height: 350px;
  margin: 20px;
  box-shadow: 4px 4px 16px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  background: ${({ theme }) => theme.currentTheme.backgroundPost};
  color: ${({ theme }) => theme.currentTheme.text};
`;

const PostImage = styled(Image)`
  object-fit: cover;
`;

const PostContent = styled.div``;

const PostDate = styled.p`
  margin: 0;
  font-size: 14px;
`;

export default function PostItem({
  post,
}: {
  post: { [key: string]: string };
}) {
  return (
    <PostCard>
      <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
        <PostImage
          src={post.image}
          width={350}
          height={200}
          alt="블로그 대표 이미지"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcKgkAAWkAwC+Aq/wAAAAASUVORK5CYII="
        />
        <PostContent>
          <Title
            style={{
              justifyContent: 'flex-start',
            }}
            title={post.title}
          ></Title>
          <p>{post.excerpt}</p>
          <PostDate>{post.date}</PostDate>
          <p>{post.content}</p>
        </PostContent>
      </Link>
    </PostCard>
  );
}
