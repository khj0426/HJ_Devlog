import { useQuery } from '@tanstack/react-query';

import { getSearchQueryPostList } from '@/services/Post';

//동일한 searchInput이 들어왔을 때 불필요한 api 호출을 최소화해보자

export default function useSearchPostQuery(searchPostQuery: string) {
  return useQuery({
    queryKey: ['searchPostQuery', searchPostQuery],
    queryFn: () => getSearchQueryPostList(searchPostQuery),
    enabled: !!searchPostQuery,
    staleTime: 60 * 10 * 1000,
    cacheTime: 60 * 10 * 1000,
  });
}
