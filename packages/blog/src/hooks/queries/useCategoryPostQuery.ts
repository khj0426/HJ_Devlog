import { useQuery } from "@tanstack/react-query";

import { postQueryOptions } from "./queryKey";

export default function useCategoryPostQuery({
  category,
}: {
  category: string;
}) {
  return useQuery(postQueryOptions.filteredCategoryPost(category));
}
