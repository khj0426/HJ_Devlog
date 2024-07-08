'use client';

import { CSSProperties, useEffect, useState } from 'react';

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

import Spinner from '@/Component/Common/Spinner/Spinner';
import { get } from '@/utils/axiosClient';

interface chartProps {
  type: '총 사용자 수' | '참여 시간';
  selectDate: '7일' | '30일' | '90일';
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export default function ActiveUserChart({
  selectDate,
  type,
  width,
  height,
}: chartProps) {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserCountData = async () => {
      setLoading(true);
      const res = await fetchBigQueryData();
      const { rows } = res.data;
      const transformedData = rows.map((row: any) => {
        return {
          date: row.dimensionValues[0].value,
          data: parseInt(row.metricValues[0].value),
        };
      });
      setUserCountData(transformedData);
      setLoading(false);
    };
    fetchUserCountData();
  }, [selectDate, type]);

  return (
    <div style={{ width: width ?? '720px', height: height ?? '400px' }}>
      {loading ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userCountData}>
            <Line
              type="monotone"
              dataKey="data"
              format="string"
              stroke="#2D8CFF"
              strokeWidth={2}
            />
            <XAxis
              dataKey="date"
              tickMargin={10}
              tickLine={false}
              interval={selectDate !== '90일' ? 3 : 20}
            />
            {type === '참여 시간' && (
              <Tooltip
                formatter={(data: number) => {
                  const minutes = Math.floor(data / 60);
                  const seconds = Math.floor(data % 60);
                  return `${minutes}분:${seconds}초`;
                }}
              />
            )}
            {type === '총 사용자 수' && (
              <Tooltip formatter={(data: number) => data} />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
