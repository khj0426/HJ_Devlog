"use client";

import { useMemo } from "react";

import useGetGuestBook from "~/src/hooks/queries/useGuestBookQuery";

import GuestBookInput from "./GuestBookInput";
import GuestBookList from "./GuestBookList";

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
