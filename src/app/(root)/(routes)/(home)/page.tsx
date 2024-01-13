import CategoryList from '@/Component/CategoryList/CategoryList';
import PostItem from '@/Component/Post/PostItem';
import PostList from '@/Component/Post/PostList';
import { getAllCategories, getInitPost } from '~/lib/api';

export default function Home() {
  const allCategory = getAllCategories();
  const initPosts = getInitPost();

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
          justifyContent: 'center',
        }}
      >
        {initPosts.map((post) => (
          <PostItem post={post} key={post.title} />
        ))}

        <PostList />
      </main>
    </>
  );
}
