import type { Item } from '@/@types/postItem';

import { EmojiSad } from 'iconic-react';
import Link from 'next/link';

import Flex from '@/Component/Common/Flex/Flex';

interface PostListProps {
  posts: Item[] | undefined;
  onClick?: () => void;
}

export default function PostList({ posts, onClick }: PostListProps) {
  return (
    <Flex gap={5} flexDirection="column" alignItems="flex-start">
      {posts?.length === 0 && (
        <Flex>
          <span>글이 존재하지 않습니다.</span>
          <EmojiSad size={32} color="#FF8A65" />
        </Flex>
      )}
      {posts?.map((post) => (
        <Link
          key={post.title}
          onClick={onClick}
          href={`/blog/${post.slug}`}
          style={{
            color: 'inherit',
          }}
        >
          {post.title}
        </Link>
      ))}
    </Flex>
  );
}
