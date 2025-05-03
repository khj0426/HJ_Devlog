import { useQuery } from '@tanstack/react-query';

import { guestBookQueryOptions } from '@/hooks/queries/queryKey';

export default function useGetGuestBook() {
  return useQuery(guestBookQueryOptions.all());
}
