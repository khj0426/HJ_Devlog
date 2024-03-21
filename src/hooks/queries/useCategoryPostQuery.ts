import { useQuery } from '@tanstack/react-query';

import { postQueryOptions } from '@/hooks/queries/queryKey';

export default function useCategoryPostQuery({
  category,
}: {
  category: string;
}) {
  return useQuery(postQueryOptions.filteredCategoryPost(category));
}
