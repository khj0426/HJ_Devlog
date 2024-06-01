'use client';

import { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

import Flex from '@/Component/Common/Flex/Flex';
import { get } from '@/utils/axiosClient';

interface chartProps {
  type: '총 사용자 수' | '참여 시간';
  selectDate: '7일' | '30일' | '90일';
}

export default function ActiveUserChart({ selectDate, type }: chartProps) {
  const fetchBigQueryData = async () => {
    switch (type) {
      case '총 사용자 수':
        return await get<{ rows: any }>(
          `/api/all-users?page=${selectDate.replaceAll('일', '')}`
        );
      case '참여 시간':
        return await get<{ rows: any }>(
          `/api/active-time?page=${selectDate.replaceAll('일', '')}`
        );
    }
  };
  const [userCountData, setUserCountData] = useState<any[]>([]);
  useEffect(() => {
    const fetchUserCountData = async () => {
      const res = await fetchBigQueryData();
      const { rows } = res.data;
      const transformedData = rows.map((row: any) => {
        return {
          date: row.dimensionValues[0].value,
          data: parseInt(row.metricValues[0].value),
        };
      });
      setUserCountData(transformedData);
    };
    fetchUserCountData();
  }, [selectDate, type]);

  return (
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
        {type === '참여 시간' && (
          <Tooltip
            formatter={(data: number) => {
              const minutes = Math.floor(data / 60);
              const seconds = Math.floor(data % 60);
              return `${minutes}분:${seconds}초`;
            }}
          ></Tooltip>
        )}

        {type === '총 사용자 수' && (
          <Tooltip
            formatter={(data: number) => {
              return data;
            }}
          ></Tooltip>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
