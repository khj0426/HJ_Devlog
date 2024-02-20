import { dehydrate } from '@tanstack/react-query';

import CategoryList from '@/Component/CategoryList/CategoryList';
import Hydrate from '@/Component/Common/Hydrate';
import PostContainer from '@/Component/Post/PostContainer';
import { getPosts } from '@/services/Post';
import getQueryClient from '@/utils/getQueryClient';
import { getAllCategories } from '~/lib/api';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['getPosts'],
    queryFn: () => getPosts({ pageParams: 0 }),
  });
  const dehydratePostState = dehydrate(queryClient, {
    shouldDehydrateQuery: () => true,
  });
  const allCategory = getAllCategories();

  return (
    <>
      <CategoryList category={allCategory}></CategoryList>
      <main>
        <Hydrate state={dehydratePostState}>
          <PostContainer />
        </Hydrate>
      </main>
    </>
  );
}
