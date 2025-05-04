import { dehydrate, Hydrate } from "@tanstack/react-query";

import GuestBook from "~/src/Component/GuestBook/GuestBook";
import { guestBookQueryKey } from "~/src/hooks/queries/queryKey";
import { getGuestBook } from "~/src/services/GuestBook";
import getQueryClient from "~/src/utils/getQueryClient";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(guestBookQueryKey.all, getGuestBook);
  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: () => true,
  });
  return (
    <Hydrate state={dehydratedState}>
      <GuestBook />
    </Hydrate>
  );
}
