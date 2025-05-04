import { google } from "@google-analytics/data/build/protos/protos";
import { post } from "@hj-devlog/shared/src/api/blogaxiosClient";
import { useMutation } from "@tanstack/react-query";

import { BIGQUERY_VALUE } from "../../Component/Blog/BigQueryCreateForm/BigQueryCreateForm";

const postGAReport = async ({
  type,
  startDate,
  endDate,
}: {
  type: (typeof BIGQUERY_VALUE)[number];
  startDate: Date;
  endDate: Date;
}) => {
  return await post<google.analytics.data.v1beta.IRunReportResponse>(
    "/api/report",
    {
      type,
      startDate,
      endDate,
    }
  );
};

const usePostGAReport = () => {
  return useMutation({
    mutationFn: postGAReport,
  });
};

export default usePostGAReport;
