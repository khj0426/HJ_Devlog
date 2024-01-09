import type { Item } from '@/@types/postItem';

import { get } from '@/utils/axiosClient';

export const getSearchQueryPostList = async (searchQuery: string) => {
  return (await get<Item[]>(`/api/slugs/${searchQuery}`)).data;
};
