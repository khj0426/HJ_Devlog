import Image from 'next/image';
import Link from 'next/link';

import Title from '@/Component/About/Title';
import CategoryList from '@/Component/CategoryList/CategoryList';
import PostItem from '@/Component/Post/PostItem';
import { getFilteredCategory, getAllCategories } from '~/lib/api';

export default function Home({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  params.categoryId = decodeURIComponent(params.categoryId);

  const posts = getFilteredCategory(params.categoryId);
  const allCategory = getAllCategories();

  return (
    <>
      <CategoryList category={allCategory} />
      <h2>{params.categoryId}</h2>
      <main
        style={{
          minWidth: '60%',
        }}
      >
        {posts.map((post) => (
          <PostItem key={post.title} post={post} />
        ))}
      </main>
    </>
  );
}
