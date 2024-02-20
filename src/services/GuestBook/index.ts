import type { GuestBook } from '@/@types/GuestBookType';

import { get } from '@/utils/axiosClient';

export const getGuestBook = async () => {
  'use server';

  return (await get<GuestBook>('/api/guestbook')).data;
};
