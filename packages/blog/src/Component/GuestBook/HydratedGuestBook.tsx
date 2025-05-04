import { dehydrate, Hydrate } from "@tanstack/react-query";

import { getGuestBook } from "~/src/services/GuestBook";
import getQueryClient from "~/src/utils/getQueryClient";

import GuestBook from "./GuestBook";

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
