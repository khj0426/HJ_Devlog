import { dehydrate } from '@tanstack/react-query';

import Hydrate from '@/Component/Common/Hydrat';
import GuestBook from '@/Component/GuestBook/GuestBook';
import { getGuestBook } from '@/hooks/useGetGuestBook';
import getQueryClient from '@/utils/getQueryClient';

export default async function HydratedGuestBook() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['guestBook'], getGuestBook);
  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: () => true,
  });
  return (
    <Hydrate state={dehydratedState}>
      <GuestBook />
    </Hydrate>
  );
}
