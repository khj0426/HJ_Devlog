"use client";
import { useState } from "react";

import Flex from "@hj-devlog/shared/src/components/Flex/Flex";
import Spinner from "@hj-devlog/shared/src/components/Spinner/Spinner";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

import BigQueryCreateForm from "~/src/Component/Blog/BigQueryCreateForm/BigQueryCreateForm";
import usePostGAReport from "~/src/hooks/mutations/usecreateGAReportMutation";

export default function GaReportCreatePage() {
  const { mutate, isLoading } = usePostGAReport();
  const [userCountData, setUserCountData] = useState<any[]>([]);

  return (
    <>
      <BigQueryCreateForm
        onSubmit={(type, start, end) => {
          mutate(
            {
              type,
              startDate: start,
              endDate: end,
            },
            {
              onSuccess: ({ data }) => {
                const { rows } = data;
                const transformedData = rows?.map((row: any) => {
                  return {
                    date: row.dimensionValues[0].value,
                    data: parseInt(row.metricValues[0].value),
                  };
                });
                if (transformedData) setUserCountData(transformedData);
              },
            }
          );
        }}
      />
      {isLoading && (
        <Flex justifyContent="center" alignItems="center" height={"500px"}>
          <Spinner></Spinner>
        </Flex>
      )}
      <ResponsiveContainer width={720} height={400}>
        <LineChart data={userCountData}>
          <Line
            type="monotone"
            dataKey="data"
            format="string"
            stroke="#2D8CFF"
            strokeWidth={2}
          ></Line>
          <XAxis
            dataKey="date"
            tickMargin={10}
            tickLine={false}
            padding={{
              left: 13,
              right: 13,
            }}
          />
          <Tooltip
            formatter={(data) => {
              return data;
            }}
          ></Tooltip>
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
