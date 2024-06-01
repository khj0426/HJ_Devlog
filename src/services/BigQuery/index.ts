import { google } from '@google-analytics/data/build/protos/protos';

import { SelectDateOptionsProps } from '@/@types/BackOfficeProps';
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

export const getActiveUserCountByDate = async ({
  start,
}: {
  start: SelectDateOptionsProps;
}) => {
  return (await get<Response>(`/api/active-users?date=${start}`)).data;
};

export const getPostDetailViewsCount = async ({ slug }: { slug: string }) => {
  return (await get<{ pageViewCount: number }>(`/api/posts/${slug}`)).data;
};

export const getPlatformUserCount = async () => {
  return (
    await get<google.analytics.data.v1beta.IRunReportResponse>(
      `/api/platform-category`
    )
  ).data;
};
