import { useRef, useState } from 'react';

import styled from 'styled-components';

import Button from '@/Component/Common/Button/Button';
import DateRangePicker from '@/Component/Common/DateRangePicker/DateRangePicker';
import Flex from '@/Component/Common/Flex/Flex';

export const BIGQUERY_VALUE = [
  '총 사용자 수',
  '참여 시간',
  '도시별 한 페이지 당 방문 세션 수',
  '방문자의 기기 유형(모바일,PC)',
] as const;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

export default function BigQueryCreateForm({
  onSubmit,
}: {
  onSubmit?: (
    _type: typeof BIGQUERY_VALUE[number],
    _startDate: Date,
    _endDate: Date
  ) => void;
}) {
  const dateRef = useRef<null | {
    startDate: Date;
    endDate: Date;
  }>(null);

  const [type, setType] = useState<null | typeof BIGQUERY_VALUE[number]>(null);
  return (
    <Flex flexDirection="column" width="100%" gap="50px">
      <Flex
        flexDirection="column"
        gap="25px"
        justifyContent="center"
        alignItems="center"
      >
        <h4>😎 데이터의 종류를 선택해주세요</h4>
        <Flex gap="15px" flexWrap="wrap" justifyContent="center">
          {BIGQUERY_VALUE.map((value) => (
            <Label key={value}>
              <RadioButton
                type="radio"
                value={value}
                name="reportType"
                onClick={() => {
                  setType(value);
                }}
              />
              {value}
            </Label>
          ))}
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap="25px">
        <h4>📆 날짜를 선택해주세요</h4>
        <DateRangePicker
          onSelectDateRange={(startDate, endDate) => {
            dateRef.current = {
              startDate,
              endDate,
            };
          }}
        />
        <Button
          label="보고서 생성"
          variant="secondary"
          onClick={() => {
            if (type && dateRef.current)
              onSubmit?.(
                type,
                dateRef.current?.startDate,
                dateRef.current.endDate
              );
          }}
        >
          보고서 생성
        </Button>
      </Flex>
    </Flex>
  );
}
