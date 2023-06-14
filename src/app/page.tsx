import { getAllPosts } from '../../lib/api';
import Link from 'next/link';
import Title from '@/Component/About/Title';
import PostLayout from '@/Component/Common/PostLayout';
import PostExterct from '@/Component/Blog/Exterct';

export default function Home() {
  const posts = getAllPosts(['title', 'data', 'slug', 'category', 'excerpt']);
  const recentPosts = posts.slice(0, 2);

  return (
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
  );
}
