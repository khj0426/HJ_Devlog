import { Cell, Pie, PieChart } from 'recharts';

import useGetUserByPlatform from '@/hooks/queries/useGetUserByPlatform';

const ActiveUSerSessionChart = () => {
  const { data, isLoading } = useGetUserByPlatform();

  if (isLoading || !data || !data?.rows) {
    return <div>로딩중</div>;
  }

  const rowData = data?.rows;

  const platformName = rowData?.map((value) => {
    return value.dimensionValues?.[0].value;
  });

  const platformCounts = rowData?.map((value) => {
    return value.metricValues?.[0]?.value;
  });

  const mappingNameToCount = platformName?.map((platform, index) => {
    if (platform !== 'smartTV') {
      return {
        name: platform,
        value: Number(platformCounts?.[index]),
      };
    }
    return {
      name: '',
      value: 0,
    };
  });
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#030303'];

  const totalUserCount = mappingNameToCount.reduce((sum, current) => {
    return sum + current.value;
  }, 0);

  return (
    <PieChart width={550} height={400}>
      <Pie
        dominantBaseline="center"
        dataKey="value"
        data={mappingNameToCount}
        cx={300}
        label={(entry) =>
          `${((entry.value / totalUserCount) * 100).toFixed(2)}%,${entry.name}`
        }
        cy={200}
        innerRadius={80}
        outerRadius={100}
      >
        {mappingNameToCount?.map((value, index) => {
          return <Cell key={value.name} fill={COLORS[index]}></Cell>;
        })}
      </Pie>
    </PieChart>
  );
};

export default ActiveUSerSessionChart;
