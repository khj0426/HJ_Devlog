'use client';

import GuestBookInput from '@/Component/GuestBook/GuestBookInput';
import GuestBookList from '@/Component/GuestBook/GuestBookList';
import useGetGuestBook from '@/hooks/queries/useGuestBookQuery';

export default function GuestBook() {
  const { data, refetch } = useGetGuestBook();
  return (
    <main>
      <GuestBookList guestbookList={data} />
      <GuestBookInput refetch={refetch} />
    </main>
  );
}
