import { useQuery } from '@tanstack/react-query';

import { SelectDateOptionsProps } from '@/@types/BackOfficeProps';
import { gaQueryOptions } from '@/hooks/queries/queryKey';

export default function useGetUsersCountByDate(date: SelectDateOptionsProps) {
  return useQuery(gaQueryOptions.visitedUserByDate(date));
}
