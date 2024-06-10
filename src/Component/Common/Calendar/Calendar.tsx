import DateGrid from '@/Component/Common/Calendar/DateGrid';
import MonthNavigation from '@/Component/Common/Calendar/MonthNavigation';
import useCalendar from '@/hooks/useCalendar';

const Calendar = () => {
  const {
    currentDate,
    currentMonthDates,
    nextMonth,
    prevMonth,
    setCurrentDate,
    prevMonthDates,
  } = useCalendar();
  return (
    <div>
      <MonthNavigation
        nextMonth={nextMonth}
        prevMonth={prevMonth}
        date={currentDate}
        setCurrentDate={(_newYear: string) => {
          setCurrentDate(
            new Date(
              Number(_newYear),
              currentDate.getMonth(),
              currentDate.getDate()
            )
          );
        }}
      />
      <DateGrid
        currentMonthDates={currentMonthDates()}
        prevMonthDates={prevMonthDates()}
      />
    </div>
  );
};

export default Calendar;
