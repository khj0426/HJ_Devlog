import CategoryList from '@/Component/CategoryList/CategoryList';
import PostContainer from '@/Component/Post/PostContainer';
import { getAllCategories } from '~/lib/api';

export default function Home() {
  const allCategory = getAllCategories();

  return (
    <>
      <CategoryList category={allCategory}></CategoryList>
      <main
        style={{
          minWidth: '65%',
          maxWidth: '70%',
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 auto',
        }}
      >
        <PostContainer />
      </main>
    </>
  );
}
