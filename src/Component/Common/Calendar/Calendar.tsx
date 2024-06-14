import DateGrid from '@/Component/Common/Calendar/DateGrid';
import MonthNavigation from '@/Component/Common/Calendar/MonthNavigation';
import Flex from '@/Component/Common/Flex/Flex';
import useCalendar from '@/hooks/useCalendar';

const Calendar = ({
  onSelectDate,
  isDateInRange,
}: {
  isDateInRange?: (_newDate: Date) => boolean;
  onSelectDate?: (_newDate: Date) => void;
}) => {
  //가능적인 로직은 모두 캘린더 훅으로 분리하고
  const {
    currentDate,
    currentMonthDates,
    nextMonth,
    prevMonth,
    setCurrentDate,
    prevMonthDates,
  } = useCalendar();

  //캘린더 컴포넌트는 UI만 관리한다.
  return (
    <Flex width={'350px'} flexDirection="column">
      <MonthNavigation
        nextMonth={nextMonth}
        prevMonth={prevMonth}
        date={currentDate}
        setCurrentDate={(_newYear: string) => {
          const selectDate = new Date(
            Number(_newYear),
            currentDate.getMonth(),
            currentDate.getDate()
          );
          setCurrentDate(selectDate);
          onSelectDate?.(selectDate);
        }}
      />
      <DateGrid
        currentMonthDates={currentMonthDates()}
        prevMonthDates={prevMonthDates()}
        onSelectDate={onSelectDate}
        isDateWithRange={isDateInRange}
      />
    </Flex>
  );
};

export default Calendar;
