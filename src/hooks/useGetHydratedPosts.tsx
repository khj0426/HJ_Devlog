import { Hydrate, dehydrate } from '@tanstack/react-query';

import getQueryClient from '@/utils/getQueryClient';

export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  //무한스크롤 부분
  await queryClient.prefetchQuery(['getPosts']);
  const dehydratedState = dehydrate(queryClient);
  return <Hydrate state={dehydratedState}></Hydrate>;
}
