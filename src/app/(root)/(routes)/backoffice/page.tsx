'use client';
import { Suspense } from 'react';

import styled from 'styled-components';

import ActiveUserChart from '@/Component/BackOffice/ActiveUserChart/ActiveUserChart';
import ActiveUSerSessionChart from '@/Component/BackOffice/ActiveUserSessionChart/ActiveUserSessionChart';
import BackOfficeDrawer from '@/Component/BackOffice/BackOfficeDrawer/BackOfficeDrawer';
import UserSessionInfo from '@/Component/Blog/UserSessionInfo/UserSessionInfo';
import Flex from '@/Component/Common/Flex/Flex';
import ModalHeader from '@/Component/Common/Modal/ModalHeader';
import Spinner from '@/Component/Common/Spinner/Spinner';
import useGetUsersCountQuery from '@/hooks/queries/useGetUsersCountQuery';

const Card = styled.div`
  background-color: ${({ theme }) => theme.currentTheme.backgroundPost};
  border-radius: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.currentTheme.text};
  width: auto;
  min-width: 300px;
  min-height: 150px;
  height: auto;
  text-align: center;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.currentTheme.text};
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 50px;
  width: 80%;
`;

const CardContainer = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

export default function BackOffice() {
  const { data: countData } = useGetUsersCountQuery();

  return (
    <Container>
      <Flex justifyContent="flex-start" width={'100%'}>
        <BackOfficeDrawer />
        <ModalHeader as="h1">BackOffice</ModalHeader>
      </Flex>

      <CardContainer justifyContent="space-around" alignItems="center">
        <Card>
          <CardText>All Users</CardText>
          <CardText>{countData?.datalist[0]?.value}</CardText>
        </Card>
        <Card>
          <CardText>User Device Information Statistics</CardText>
          <ActiveUSerSessionChart />
        </Card>
      </CardContainer>

      <CardContainer justifyContent="space-around" alignItems="center">
        <Card>
          <CardText>7Days TotalUsers</CardText>
          <ActiveUserChart
            selectDate="7일"
            type="총 사용자 수"
            width={400}
            height={400}
          />
        </Card>
        <Card>
          <CardText>30Days TotalUsers</CardText>
          <ActiveUserChart
            selectDate="30일"
            type="총 사용자 수"
            width={650}
            height={400}
          />
        </Card>
      </CardContainer>

      <CardContainer justifyContent="space-around" alignItems="center">
        <Card>
          <CardText>90Days TotalUsers</CardText>
          <ActiveUserChart selectDate="90일" type="총 사용자 수" />
        </Card>
      </CardContainer>

      <UserSessionInfo />
    </Container>
  );
}
