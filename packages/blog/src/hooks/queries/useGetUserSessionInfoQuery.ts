import { useQuery } from "@tanstack/react-query";

import { gaQueryOptions } from "./queryKey";

export default function useGetUserSessionInfoQuery() {
  return useQuery(gaQueryOptions.visitedUserSession());
}
