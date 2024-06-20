'use client';
import { Suspense } from 'react';

import ActiveUserChart from '@/Component/BackOffice/ActiveUserChart/ActiveUserChart';
import ActiveUSerSessionChart from '@/Component/BackOffice/ActiveUserSessionChart/ActiveUserSessionChart';
import BackOfficeDrawer from '@/Component/BackOffice/BackOfficeDrawer/BackOfficeDrawer';
import SelectedDateUserCountInfo from '@/Component/BackOffice/SelectedDateUserCount/SelectedDateUserCount';
import UserCountInfo from '@/Component/Blog/UserCountInfo/UserCountInfo';
import UserSessionInfo from '@/Component/Blog/UserSessionInfo/UserSessionInfo';
import Flex from '@/Component/Common/Flex/Flex';
import ModalHeader from '@/Component/Common/Modal/ModalHeader';
import Spinner from '@/Component/Common/Spinner/Spinner';

export default function BackOffice() {
  return (
    <main
      style={{
        alignItems: 'flex-start',
      }}
    >
      <Flex justifyContent="flex-start" width={'80%'}>
        <BackOfficeDrawer></BackOfficeDrawer>
        <ModalHeader as="h1">BackOffice</ModalHeader>
      </Flex>

      <Suspense
        fallback={
          <Flex
            justifyContent="center"
            alignItems="center"
            width={'100%'}
            height={'100%'}
          >
            <Spinner />
          </Flex>
        }
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Flex justifyContent="space-around"></Flex>
          <Flex>
            <UserCountInfo />
            <UserSessionInfo />
          </Flex>
        </Flex>
      </Suspense>
    </main>
  );
}
