import { BarChart, YAxis, Tooltip, Bar, CartesianGrid } from 'recharts';

import Flex from '@/Component/Common/Flex/Flex';
import useGetUserSessionInfoQuery from '@/hooks/queries/useGetUserSessionInfoQuery';

const UserSessionInfo = () => {
  const { data } = useGetUserSessionInfoQuery();
  //city,value

  const cityScreenPageViewPerSessionData = data?.rows?.map((row) => {
    return {
      x: row?.dimensionValues?.[0]?.value,
      y: row?.metricValues?.[0]?.value,
    };
  });

  return (
    <Flex flexDirection="column">
      <h2>유저당 한 세션당 방문한 페이지 그래프</h2>
      <BarChart
        width={730}
        height={250}
        data={cityScreenPageViewPerSessionData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(_value, _name, props) => {
            return `${props.payload.x}에서 ${_value}개의 View`;
          }}
        ></Tooltip>

        <Bar dataKey="y" fill="#8884d8" barSize={200} />
      </BarChart>
    </Flex>
  );
};

export default UserSessionInfo;
