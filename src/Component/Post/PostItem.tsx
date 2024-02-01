'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import Title from '@/Component/About/Title';

const PostCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: 350px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  background: ${({ theme }) => theme.backgroundPost};
`;

const PostImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 20px;
`;

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
      <Link href={`/blog/${post.slug}`}>
        <PostImage
          src={post.image}
          alt="블로그 대표 이미지"
          width={300}
          height={200}
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
        <PostContent>
          <Title
            style={{
              justifyContent: 'flex-start',
            }}
            title={post.title}
          ></Title>
          <PostDate>{post.date}</PostDate>
          <p>{post.content}</p>
        </PostContent>
      </Link>
    </PostCard>
  );
}
