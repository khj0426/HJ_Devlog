import useCalendar from "../../hooks/useCalendar";
import Flex from "../Flex/Flex";
import DateGrid from "./DateGrid";
import MonthNavigation from "./MonthNavigation";

const Calendar = ({
  onSelectDate,
  maxSelectableYear,
  isDateInRange,
}: {
  maxSelectableYear?: number;
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
    <Flex width={"350px"} flexDirection="column">
      <MonthNavigation
        maxSelectableYear={maxSelectableYear}
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
