import { dehydrate } from '@tanstack/react-query';

import Hero from '@/Component/Blog/Hero/Hero';
import UserCountInfo from '@/Component/Blog/UserCountInfo/UserCountInfo';
import CategoryList from '@/Component/CategoryList/CategoryList';
import Hydrate from '@/Component/Common/Hydrate';
import PostContainer from '@/Component/Post/PostContainer';
import {
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
    <main>
      <Hero />
      <CategoryList category={allCategory} />
      <section aria-label="최근 게시글">
        <Hydrate state={dehydratePostState}>
          <UserCountInfo />
          <PostContainer />
        </Hydrate>
      </section>
    </main>
  );
}
