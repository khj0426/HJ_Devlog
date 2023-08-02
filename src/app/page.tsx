import { getAllCategories, getAllPosts } from '../../lib/api';
import CategoryList from '@/Component/CategoryList/CategoryList';
import PostServiceLayer from '@/services/PostService';

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
        <PostServiceLayer />
      </main>
    </>
  );
}
