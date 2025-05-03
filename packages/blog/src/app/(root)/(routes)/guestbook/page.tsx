import { dehydrate } from "@tanstack/react-query";

import Hydrate from "~/packages/shared/src/components/Hydrate";
import GuestBook from "~/packages/blog/src/Component/GuestBook/GuestBook";
import { guestBookQueryKey } from "~/packages/blog/src/hooks/queries/queryKey";
import { getGuestBook } from "~/packages/blog/src/services/GuestBook";
import getQueryClient from "~/packages/blog/src/utils/getQueryClient";

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
