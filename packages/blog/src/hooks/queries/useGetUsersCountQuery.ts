import { useQuery } from "@tanstack/react-query";

import { gaQueryOptions } from "./queryKey";

export default function useGetUsersCount() {
  return useQuery(gaQueryOptions.user());
}
