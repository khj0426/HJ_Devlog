import { useQuery } from "@tanstack/react-query";

import { postQueryOptions } from "./queryKey";

export default function useSearchPostQuery(searchPostQuery: string) {
  return useQuery(postQueryOptions.searchInputPost(searchPostQuery));
}
