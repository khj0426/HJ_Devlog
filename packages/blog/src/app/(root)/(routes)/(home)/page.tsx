import { dehydrate, Hydrate } from "@tanstack/react-query";

import { getAllCategories } from "~/lib/api";
import UserCountInfo from "~/src/Component/Blog/UserCountInfo/UserCountInfo";
import CategoryList from "~/src/Component/CategoryList/CategoryList";
import PostContainer from "~/src/Component/Post/PostContainer";
import { postQueryKey, gaQueryOptions } from "~/src/hooks/queries/queryKey";
import { getPosts } from "~/src/services/Post";
import getQueryClient from "~/src/utils/getQueryClient";

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
