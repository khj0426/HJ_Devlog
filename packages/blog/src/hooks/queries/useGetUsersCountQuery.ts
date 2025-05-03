import { useQuery } from '@tanstack/react-query';

import { gaQueryOptions } from '@/hooks/queries/queryKey';

export default function useGetUsersCount() {
  return useQuery(gaQueryOptions.user());
}
