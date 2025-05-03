"use server";
import type { GuestBook } from "~/packages/blog/src/@types/GuestBookType";

import { get } from "~/packages/blog/src/utils/axiosClient";

export const getGuestBook = async () => {
  return (await get<GuestBook>("/api/guestbook")).data;
};
