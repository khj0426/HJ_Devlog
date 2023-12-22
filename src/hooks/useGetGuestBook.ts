import type { GuestBook } from '@/@types/GuestBookType';

import { useQuery } from '@tanstack/react-query';

import { get } from '@/utils/axiosClient';

export const getGuestBook = async () => {
  const guestBook = await get('/api/guestbook');
  const guestBookJson = (await guestBook.data) as Promise<GuestBook>;
  return guestBookJson;
};

export default function useGetGuestBook() {
  return useQuery({
    queryFn: getGuestBook,
    queryKey: ['guestBook'],
    refetchInterval: false,
    retry: 0,
    refetchOnMount: false,
  });
}
