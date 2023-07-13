import {
  getAllPosts,
  getAllCategories,
  getCategoryFilteredPosts,
} from '../../lib/api';
import Link from 'next/link';
import Title from '@/Component/About/Title';
import PostLayout from '@/Component/Common/PostLayout';
import Button from '@/Component/Common/Button';

export default function Home() {
  const posts = getAllPosts([
    'title',
    'data',
    'slug',
    'category',
    'excerpt',
    'date',
  ]);

  posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const allCategory = getAllCategories();
  return (
    <>
      <nav>
        {Array.from(allCategory).map(([category, categoryCount]) => (
          <div key={category}>{category + categoryCount}</div>
        ))}
      </nav>
      <main>
        {posts.map((post) => (
          <PostLayout key={post.title}>
            <Link href={`/blog/${post.slug}`}>
              <Title title={post.title} />
              <p>{post.category}</p>
              {post.content}
            </Link>
          </PostLayout>
        ))}
      </main>
    </>
  );
}
