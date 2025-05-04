import { useQuery } from "@tanstack/react-query";

import { gaQueryOptions } from "./queryKey";

export default function useGetPostDetailPageView(slug: string) {
  return useQuery(gaQueryOptions.visitedViewsByDetailPost(slug));
}
