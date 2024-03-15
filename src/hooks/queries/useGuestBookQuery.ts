import { useQuery } from '@tanstack/react-query';

import { guestBookQueryKey } from '@/hooks/queries/queryKey';
import { getGuestBook } from '@/services/GuestBook';

export default function useGetGuestBook() {
  return useQuery({
    queryFn: getGuestBook,
    queryKey: guestBookQueryKey.all,
    refetchInterval: false,
    retry: 0,
    refetchOnMount: true,
    enabled: false,
  });
}
