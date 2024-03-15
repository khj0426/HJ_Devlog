import { useInfiniteQuery } from '@tanstack/react-query';

import { postQueryKey } from '@/hooks/queries/queryKey';
import { getPosts } from '@/services/Post';

export default function usePostQuery() {
  return useInfiniteQuery({
    queryKey: postQueryKey.all,
    suspense: true,
    queryFn: ({ pageParam }) => getPosts({ pageParams: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = Math.floor(lastPage.page);
      if (lastPage.posts.length === 0) {
        return null;
      }
      return nextPage + 1;
    },
  });
}
