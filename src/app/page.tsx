import { getAllCategories, getAllPosts } from '../../lib/api';
import Link from 'next/link';
import Title from '@/Component/About/Title';
import PostLayout from '@/Component/Common/PostLayout';
import CategoryList from '@/Component/CategoryList/CategoryList';
import Image from 'next/image';

export default function Home() {
  const posts = getAllPosts([
    'title',
    'data',
    'slug',
    'category',
    'excerpt',
    'date',
    'image',
  ]);

  posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

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
            <Link href={`/blog/${post.slug}`}>
              <Title title={post.title} />
              <p>{post.category}</p>
              {post.content}
            </Link>

            <div
              style={{
                display: 'flex',
                position: 'relative',
                width: '150px',
                height: '150px',
              }}
            >
              <Image
                src={post.image}
                fill
                alt="블로그 대표 이미지"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </PostLayout>
        ))}
      </main>
    </>
  );
}
