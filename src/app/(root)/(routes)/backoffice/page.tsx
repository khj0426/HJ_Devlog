'use client';
import { useState, Suspense } from 'react';

import styled from 'styled-components';

import { SelectDateOptionsProps } from '@/@types/BackOfficeProps';
import ActiveUserChart from '@/Component/BackOffice/ActiveUserChart/ActiveUserChart';
import SelectedDateUserCountInfo from '@/Component/BackOffice/SelectedDateUserCount/SelectedDateUserCount';
import Button from '@/Component/Common/Button/Button';
import ButtonGroup from '@/Component/Common/ButtonGroup/ButtonGroup';
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
  const [dataType, setDataType] = useState<'총 사용자 수' | '참여 시간'>(
    '총 사용자 수'
  );
  const [date, setDate] = useState<'7일' | '30일' | '90일'>('7일');

  return (
    <StyledMain>
      <DropDown
        onChangeSelectedItem={(item) => {
          if (item && item?.key === '참여 시간') {
            setDataType(item?.key);
          }
          if (item && item?.key === '총 사용자 수') {
            setDataType(item?.key);
          }
        }}
        items={[
          {
            key: '총 사용자 수',
            label: '총 사용자 수',
            text: '사용자의 총 사용자 수입니다.',
          },
          {
            key: '참여 시간',
            label: '참여 시간',
            text: '사용자의 참여 시간입니다',
          },
        ]}
      />
      <ButtonGroup spacing={15}>
        <Button
          label="30일"
          variant="primary"
          size="small"
          onClick={() => setDate('30일')}
        ></Button>
        <Button
          size="small"
          label="7일"
          variant="primary"
          onClick={() => setDate('7일')}
        ></Button>
        <Button
          label="90일"
          size="small"
          variant="primary"
          onClick={() => setDate('90일')}
        ></Button>
      </ButtonGroup>

      <Flex>
        <Suspense fallback={<Spinner />}>
          <SelectedDateUserCountInfo date={date} />
        </Suspense>
      </Flex>
      <ActiveUserChart selectDate={date} type={dataType} />
    </StyledMain>
  );
}
