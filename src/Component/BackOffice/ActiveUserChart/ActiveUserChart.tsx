'use client';

import { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

import Flex from '@/Component/Common/Flex/Flex';
import { get } from '@/utils/axiosClient';

export default function ActiveUserChart({
  selectDate,
}: {
  readonly selectDate: '7일' | '30일' | '90일';
}) {
  const [userCountData, setUserCountData] = useState<any[]>([]);
  useEffect(() => {
    const fetchUserCountData = async () => {
      await get<{ rows: any }>(
        `/api/all-users?page=${selectDate.replaceAll('일', '')}`
      ).then((res) => {
        const { rows } = res.data;
        const transformedData = rows.map((row: any) => {
          return {
            date: row.dimensionValues[0].value,
            activeUsers: parseInt(row.metricValues[0].value),
          };
        });
        setUserCountData(transformedData);
      });
    };
    fetchUserCountData();
  }, [selectDate]);

  return (
    <Flex width={'100%'} justifyContent="center" alignItems="center">
      <ResponsiveContainer width={'80%'} height={400}>
        <LineChart data={userCountData}>
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#2D8CFF"
            strokeWidth={2}
          ></Line>
          <XAxis
            dataKey="date"
            height={140}
            tickMargin={10}
            tickLine={false}
            padding={{
              left: 13,
              right: 13,
            }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
}
