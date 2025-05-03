import { useQuery } from '@tanstack/react-query';

import { gaQueryOptions } from '@/hooks/queries/queryKey';

export default function useGetUserByPlatform() {
  return useQuery(gaQueryOptions.userFilteredByPlatFormCategory());
}
