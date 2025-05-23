import { useQuery } from "@tanstack/react-query";

import { gaQueryOptions } from "./queryKey";

export default function useGetUserByPlatform() {
  return useQuery(gaQueryOptions.userFilteredByPlatFormCategory());
}
