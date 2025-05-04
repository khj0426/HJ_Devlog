import { useQuery } from "@tanstack/react-query";

import { guestBookQueryOptions } from "./queryKey";

export default function useGetGuestBook() {
  return useQuery(guestBookQueryOptions.all());
}
