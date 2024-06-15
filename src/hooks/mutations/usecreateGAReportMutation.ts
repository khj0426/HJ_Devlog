import { useMutation } from '@tanstack/react-query';

import { BIGQUERY_VALUE } from '@/Component/Blog/BigQueryCreateForm/BigQueryCreateForm';
import { post } from '@/utils/axiosClient';
export const postGAReport = async ({
  type,
  startDate,
  endDate,
}: {
  type: typeof BIGQUERY_VALUE[number];
  startDate: Date;
  endDate: Date;
}) => {
  return await post('/api/report', {
    type,
    startDate,
    endDate,
  }).then((Res) => console.log(Res));
};

const usePostGAReport = () => {
  return useMutation({
    mutationFn: postGAReport,
  });
};

export default usePostGAReport;
