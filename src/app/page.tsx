import Image from 'next/image';
import Link from 'next/link';

import Title from '@/Component/About/Title';
import CategoryList from '@/Component/CategoryList/CategoryList';
import PostLayout from '@/Component/Common/PostLayout';
import PostList from '@/Component/Post/PostList';

import { getAllCategories, getInitPosts } from '../../lib/api';

export default function Home() {
  const posts = getInitPosts([
    'title',
    'data',
    'slug',
    'category',
    'excerpt',
    'date',
    'image',
  ]).sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const allCategory = getAllCategories();

  return (
    <>
      <CategoryList category={allCategory}></CategoryList>
      <main
        style={{
          minWidth: '60%',
        }}
      >
        {posts.map((post) => (
          <PostLayout key={post.title}>
            <Link
              href={`/blog/${post.slug}`}
              rel="canonical"
              title={post.title}
            >
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
                minWidth: '150px',
              }}
              priority
            />
          </PostLayout>
        ))}

        <PostList />
      </main>
    </>
  );
}
