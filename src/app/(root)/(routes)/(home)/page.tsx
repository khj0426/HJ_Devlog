import { dehydrate } from '@tanstack/react-query';

import UserCountInfo from '@/Component/Blog/UserCountInfo/UserCountInfo';
import CategoryList from '@/Component/CategoryList/CategoryList';
import Hydrate from '@/Component/Common/Hydrate';
import PostContainer from '@/Component/Post/PostContainer';
import {
  gaQueryKey,
  gaQueryOptions,
  postQueryKey,
} from '@/hooks/queries/queryKey';
import { getPosts } from '@/services/Post';
import getQueryClient from '@/utils/getQueryClient';
import { getAllCategories } from '~/lib/api';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: postQueryKey.all,
    queryFn: () => getPosts({ pageParams: 0 }),
  });

  await queryClient.prefetchQuery(gaQueryOptions.user());

  const dehydratePostState = dehydrate(queryClient, {
    shouldDehydrateQuery: () => true,
  });
  const allCategory = getAllCategories();

  return (
    <>
      <CategoryList category={allCategory}></CategoryList>
      <main>
        <Hydrate state={dehydratePostState}>
          <UserCountInfo />
          <PostContainer />
        </Hydrate>
      </main>
    </>
  );
}
