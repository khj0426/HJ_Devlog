'use client';

import useGetGuestBook from '@/hooks/useGetGuestBook';

export default function GuestBook() {
  const { data } = useGetGuestBook();
  return <div></div>;
}
