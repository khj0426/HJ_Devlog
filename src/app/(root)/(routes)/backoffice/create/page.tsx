'use client';
import BigQueryCreateForm from '@/Component/Blog/BigQueryCreateForm/BigQueryCreateForm';
import usePostGAReport from '@/hooks/mutations/usecreateGAReportMutation';

export default function GaReportCreatePage() {
  const { mutate } = usePostGAReport();
  return (
    <BigQueryCreateForm
      onSubmit={(type, start, end) => {
        mutate({
          type,
          startDate: start,
          endDate: end,
        });
      }}
    ></BigQueryCreateForm>
  );
}
