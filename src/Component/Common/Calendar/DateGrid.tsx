import { useState } from 'react';

import { getDate, isSaturday, isSunday, isToday } from 'date-fns';
import styled from 'styled-components';

interface DateGridProps {
  prevMonthDates: Date[];
  currentMonthDates: Date[];
  onSelectDate?: (_newDate: Date) => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const DateGrid = ({
  prevMonthDates,
  currentMonthDates,
  onSelectDate,
}: DateGridProps) => {
  const [currentCell, setCurrentCell] = useState<null | Date>(null);
  return (
    <GridContainer>
      {DAYS.map((day) => (
        <DayHeader key={day}>{day}</DayHeader>
      ))}
      {prevMonthDates.map((prevDate) => (
        <DateCell key={prevDate.toString()} isPrevMonth>
          {getDate(prevDate)}
        </DateCell>
      ))}
      {currentMonthDates.map((currentDate) => (
        <DateCell
          onClick={() => {
            onSelectDate && onSelectDate(currentDate);
            setCurrentCell(currentDate);
          }}
          key={currentDate.toString()}
          isToday={isToday(currentDate)}
          isSaturDay={isSaturday(currentDate)}
          isWeekend={isSaturday(currentDate) || isSunday(currentDate)}
          isSelected={currentCell === currentDate}
          isSunday={isSunday(currentDate)}
        >
          {getDate(currentDate)}
        </DateCell>
      ))}
    </GridContainer>
  );
};

export default DateGrid;

const GridContainer = styled.div`
  display: grid;
  width: 300px;
  grid-template-columns: repeat(7, 1fr);
`;

const DayHeader = styled.div`
  padding: 10px;
  text-align: center;
  font-weight: bold;
  background-color: #f5f5f5;
`;

interface DateCellProps {
  isPrevMonth?: boolean;
  isToday?: boolean;
  isWeekend?: boolean;
  isSaturDay?: boolean;
  isSunday?: boolean;
  isSelected?: boolean;
}

const DateCell = styled.div<DateCellProps>`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.isPrevMonth ? '#e0e0e0' : 'none')};
  color: ${(props) =>
    props.isToday
      ? 'red'
      : props.isSaturDay
      ? 'blue'
      : props.isSunday
      ? 'red'
      : 'black'};
  font-weight: ${(props) => (props.isToday ? 'bold' : 'normal')};
  box-shadow: ${(props) => (props.isSelected ? '0 0 0 1px black' : '')};
`;
