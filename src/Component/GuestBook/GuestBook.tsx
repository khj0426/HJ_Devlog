'use client';

import { useMemo } from 'react';

import GuestBookInput from '@/Component/GuestBook/GuestBookInput';
import GuestBookList from '@/Component/GuestBook/GuestBookList';
import useGetGuestBook from '@/hooks/queries/useGuestBookQuery';

export default function GuestBook() {
  const { data, refetch } = useGetGuestBook();

  const guestBookList = useMemo(() => {
    if (data && data?.guestbook) {
      return Array.from(Object.entries(data.guestbook)).map((value) => {
        return {
          comment: value[1].comment,
          avatar: value[1].avatar,
          commentTime: value[1].commentTime,
          id: value[0],
        };
      });
    }

    return [];
  }, [data]);

  return (
    <main>
      <GuestBookList guestbookList={guestBookList} />
      <GuestBookInput refetch={refetch} />
    </main>
  );
}
