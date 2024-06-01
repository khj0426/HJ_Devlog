'use client';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import useGetUserByPlatform from '@/hooks/queries/useGetUserByPlatform';

const ActiveUSerSessionChart = () => {
  const { data, isLoading } = useGetUserByPlatform();
  const rowData = data?.rows?.map((row) => {
    return row;
  });

  const platformName = rowData?.map((value) => {
    return value.dimensionValues?.[0].value;
  });

  const platformCounts = rowData?.map((value) => {
    return value.metricValues?.[0]?.value;
  });

  const mappingNameToCount = platformName?.map((platform, index) => {
    return {
      name: platform,
      value: platformCounts?.[index],
    };
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  console.log(COLORS, mappingNameToCount);

  return (
    <ResponsiveContainer width={350} height={40}>
      <PieChart>
        <Pie
          dataKey="value"
          data={mappingNameToCount}
          cx={200}
          cy={200}
          innerRadius={80}
          outerRadius={100}
        >
          {mappingNameToCount?.map((value, index) => {
            return <Cell key={value.name} fill={COLORS[index]}></Cell>;
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ActiveUSerSessionChart;
