import { dehydrate } from "@tanstack/react-query";

import Hydrate from "~/packages/shared/src/components/Hydrate";
import GuestBook from "~/packages/blog/src/Component/GuestBook/GuestBook";
import { getGuestBook } from "~/packages/blog/src/services/GuestBook";
import getQueryClient from "~/packages/blog/src/utils/getQueryClient";

export default async function HydratedGuestBook() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["guestBook"], getGuestBook);
  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: () => true,
  });
  return (
    <Hydrate state={dehydratedState}>
      <GuestBook />
    </Hydrate>
  );
}
