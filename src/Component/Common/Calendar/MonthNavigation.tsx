import { useState } from 'react';

import { getYear, getMonth } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'iconic-react';

import DropDown from '@/Component/Common/DropDown/DropDown';
import Flex from '@/Component/Common/Flex/Flex';
import IconButton from '@/Component/Common/IconButton/IconButton';
interface MonthNavigationProps {
  readonly date: Date;
  readonly setCurrentDate: (_newYear: string) => void;
  readonly prevMonth: () => void;
  readonly nextMonth: () => void;
}

const MonthNavigation = ({
  date,
  setCurrentDate,
  prevMonth,
  nextMonth,
}: MonthNavigationProps) => {
  const years = Array.from({ length: 20 }).map((year, index) => {
    return {
      key: (getYear(date) - 10 + index).toString(),
      label: (getYear(date) - 10 + index).toString(),
    };
  });
  const [clickedYear, setClickedYear] = useState(false);
  return (
    <Flex justifyContent="space-around" width={'100%'}>
      <Flex
        style={{
          position: 'relative',
        }}
      >
        <span
          onClick={() => {
            setClickedYear(!clickedYear);
          }}
        >
          {getYear(date)}년
        </span>
        {clickedYear && (
          <DropDown
            items={years}
            onChangeSelectedItem={(item) => {
              if (item) {
                setCurrentDate(item.key);
                setClickedYear(false);
              }
            }}
          />
        )}
      </Flex>
      <Flex>
        <span>{getMonth(date) + 1}월</span>
      </Flex>
      <Flex gap={'5px'}>
        <IconButton icon={<ArrowLeft />} onClick={prevMonth} />
        <IconButton icon={<ArrowRight />} onClick={nextMonth} />
      </Flex>
    </Flex>
  );
};
export default MonthNavigation;
