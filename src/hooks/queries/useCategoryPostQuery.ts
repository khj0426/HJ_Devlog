import { useQuery } from '@tanstack/react-query';

import { postQueryKey } from '@/hooks/queries/queryKey';
import { getCategoryPosts } from '@/services/Post';

export default function useCategoryPostQuery({
  category,
}: {
  category: string;
}) {
  return useQuery({
    queryKey: postQueryKey.filteredCategoryPost(category),
    queryFn: () => getCategoryPosts({ category }),
  });
}
