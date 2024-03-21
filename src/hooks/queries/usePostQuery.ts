import { useInfiniteQuery } from '@tanstack/react-query';

import { postQueryOptions } from '@/hooks/queries/queryKey';

export default function usePostQuery() {
  return useInfiniteQuery(postQueryOptions.all());
}
