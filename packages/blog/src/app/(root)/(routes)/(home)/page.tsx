import { dehydrate } from "@tanstack/react-query";

import { getAllCategories } from "~/lib/api";
import UserCountInfo from "~/packages/blog/src/Component/Blog/UserCountInfo/UserCountInfo";
import CategoryList from "~/packages/blog/src/Component/CategoryList/CategoryList";
import PostContainer from "~/packages/blog/src/Component/Post/PostContainer";
import {
  gaQueryKey,
  gaQueryOptions,
  postQueryKey,
} from "~/packages/blog/src/hooks/queries/queryKey";
import { getPosts } from "~/packages/blog/src/services/Post";
import getQueryClient from "~/packages/blog/src/utils/getQueryClient";
import Hydrate from "~/packages/shared/src/components/Hydrate";

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
