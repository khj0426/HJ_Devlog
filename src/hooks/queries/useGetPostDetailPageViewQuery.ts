import { useQuery } from '@tanstack/react-query';

import { gaQueryOptions } from '@/hooks/queries/queryKey';

export default function useGetPostDetailPageView(slug: string) {
  return useQuery(gaQueryOptions.visitedViewsByDetailPost(slug));
}
