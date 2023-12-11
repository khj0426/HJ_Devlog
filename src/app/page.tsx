import CategoryList from '@/Component/CategoryList/CategoryList';
import PostList from '@/Component/Post/PostList';

import { getAllCategories } from '../../lib/api';

export default function Home() {
  const allCategory = getAllCategories();

  return (
    <>
      <CategoryList category={allCategory}></CategoryList>
      <main
        style={{
          minWidth: '60%',
        }}
      >
        <PostList />
      </main>
    </>
  );
}
