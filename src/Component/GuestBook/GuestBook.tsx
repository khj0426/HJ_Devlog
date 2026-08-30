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
      <header style={{ padding: '64px 0 28px', maxWidth: 760, margin: '0 auto' }}>
        <p style={{ color: 'var(--seed-color-fg-brand)', fontWeight: 700, margin: 0 }}>GUESTBOOK</p>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 64px)', letterSpacing: '-0.04em', margin: '8px 0' }}>다녀간 마음을 남겨주세요.</h1>
        <p style={{ color: 'var(--seed-color-fg-neutral-muted)' }}>짧은 인사도, 긴 이야기도 반갑게 읽을게요.</p>
      </header>
      <GuestBookList guestbookList={guestBookList} />
      <GuestBookInput refetch={refetch} />
    </main>
  );
}
