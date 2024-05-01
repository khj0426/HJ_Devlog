'use client';
import { useState, Suspense } from 'react';

import styled from 'styled-components';

import { SelectDateOptionsProps } from '@/@types/BackOfficeProps';
import ActiveUserChart from '@/Component/BackOffice/ActiveUserChart/ActiveUserChart';
import SelectedDateUserCountInfo from '@/Component/BackOffice/SelectedDateUserCount/SelectedDateUserCount';
import Button from '@/Component/Common/Button';
import DropDown from '@/Component/Common/DropDown/DropDown';
import Flex from '@/Component/Common/Flex/Flex';
import Spinner from '@/Component/Common/Spinner/Spinner';

import { dropDownItems } from './constants';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export default function BackOfficePage() {
  const [date, setDate] = useState<'7일' | '30일' | '90일'>('7일');

  return (
    <StyledMain>
      <Flex width={'80%'} margin={'0 auto'} gap={'15px'}>
        <Button
          label="30일간 사용자 수"
          onClick={() => setDate('30일')}
          style={{
            padding: '15px',
          }}
        ></Button>
        <Button
          style={{
            padding: '15px',
          }}
          label="7일간 사용자 수"
          onClick={() => setDate('7일')}
        ></Button>
        <Button
          style={{
            padding: '15px',
          }}
          label="90일간 사용자 수"
          onClick={() => setDate('90일')}
        ></Button>
      </Flex>

      <Flex>
        <Suspense fallback={<Spinner />}>
          <SelectedDateUserCountInfo date={date} />
        </Suspense>
      </Flex>
      <ActiveUserChart selectDate={date} />
    </StyledMain>
  );
}
