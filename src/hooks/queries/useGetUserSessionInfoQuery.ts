import { useQuery } from '@tanstack/react-query';

import { gaQueryOptions } from '@/hooks/queries/queryKey';

export default function useGetUserSessionInfoQuery() {
  return useQuery(gaQueryOptions.visitedUserSession());
}
