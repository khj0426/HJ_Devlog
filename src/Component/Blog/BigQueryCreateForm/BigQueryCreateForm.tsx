import styled from 'styled-components';

import DateRangePicker from '@/Component/Common/DateRangePicker/DateRangePicker';
import Flex from '@/Component/Common/Flex/Flex';

const BIGQUERY_VALUE = [
  '총 사용자 수',
  '참여 시간',
  '도시별 한 페이지 당 방문 세션 수',
  '방문자의 기기 유형(모바일,PC)',
];

const Form = styled.form`
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin: 0 auto;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function BigQueryCreateForm() {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

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
              <RadioButton type="radio" value={value} name="reportType" />
              {value}
            </Label>
          ))}
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap="25px">
        <h4>📆 날짜를 선택해주세요</h4>
        <DateRangePicker />
        <SubmitButton type="submit">보고서 생성</SubmitButton>
      </Flex>
    </Flex>
  );
}
