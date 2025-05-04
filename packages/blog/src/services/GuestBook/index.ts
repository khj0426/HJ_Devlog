"use server";

import { get } from "@hj-devlog/shared/src/api/blogaxiosClient";

import { GuestBook } from "~/@types/GuestBookType";

export const getGuestBook = async () => {
  return (await get<GuestBook>("/api/guestbook")).data;
};
