import { useQuery } from '@tanstack/react-query';

import { getCategoryPosts } from '@/services/Post';

export default function useCategoryPostQuery({
  category,
}: {
  category: string;
}) {
  return useQuery({
    queryKey: ['getCategoryPosts', category],
    queryFn: () => getCategoryPosts({ category }),
  });
}
