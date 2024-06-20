import { getYear, getMonth } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'iconic-react';

import DropDown from '@/Component/Common/DropDown/DropDown';
import Flex from '@/Component/Common/Flex/Flex';
import IconButton from '@/Component/Common/IconButton/IconButton';
import useBoolean from '@/hooks/useBoolean';
import { generateYearOptionsFromDate } from '@/utils/generateYearOptions';
interface MonthNavigationProps {
  readonly date: Date;
  readonly setCurrentDate: (_newYear: string) => void;
  readonly prevMonth: () => void;
  readonly nextMonth: () => void;
  //최대 선택가능환 연도
  readonly maxSelectableYear?: number;
}

const MonthNavigation = ({
  date,
  setCurrentDate,
  prevMonth,
  nextMonth,
  maxSelectableYear,
}: MonthNavigationProps) => {
  const selectableYearOptions = generateYearOptionsFromDate(
    new Date(),
    maxSelectableYear
  );

  const { setFalse, state: clickedYear, toggle } = useBoolean();
  return (
    <Flex justifyContent="space-around" width={'100%'}>
      <Flex
        style={{
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <span onClick={toggle}>{getYear(date)}년</span>
        {clickedYear && (
          <DropDown
            items={selectableYearOptions}
            onChangeSelectedItem={(item) => {
              if (item) {
                setCurrentDate(item.key);
                setFalse();
              }
            }}
          />
        )}
      </Flex>
      <Flex>
        <span>{getMonth(date) + 1}월</span>
      </Flex>
      <Flex gap={'5px'}>
        <IconButton
          style={{
            border: 'none',
          }}
          icon={<ArrowLeft color="rgb(255, 138, 101)" />}
          onClick={prevMonth}
        />
        <IconButton
          icon={<ArrowRight color="rgb(255, 138, 101)" />}
          onClick={nextMonth}
          style={{
            border: 'none',
          }}
        />
      </Flex>
    </Flex>
  );
};
export default MonthNavigation;
