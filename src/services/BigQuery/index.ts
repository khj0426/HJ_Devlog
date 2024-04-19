import { get } from '@/utils/axiosClient';

interface Response {
  data: string;
  datalist: item[];
}

interface item {
  value: string;
  oneValue: string;
}
export const getActiveUserCount = async () => {
  return (await get<Response>('/api/active-users')).data;
};
