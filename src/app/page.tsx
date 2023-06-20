import { getAllPosts } from '../../lib/api';
import Link from 'next/link';
import Title from '@/Component/About/Title';
import PostLayout from '@/Component/Common/PostLayout';
import PostExterct from '@/Component/Blog/Exterct';

export default function Home() {
  const posts = getAllPosts(['title', 'data', 'slug', 'category', 'excerpt','date']);

  posts.sort((post1,post2) => post1.date > post2.date ? -1 : 1);

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
