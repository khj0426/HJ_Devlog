import { useEffect } from "react";
import useDateRangeCalendar from "../../hooks/useDateRangeCalendar";
import Calendar from "../Calendar/Calendar";
import Flex from "../Flex/Flex";
import { ToastManager, ToastContainer } from "../Toast";

interface DateRangePickerProps {
  readonly isFutureDaysRestricted?: boolean;
  readonly onSelectDateRange?: (_startDate: Date, _endDate: Date) => void;
}

const DateRangePicker = ({
  isFutureDaysRestricted = true,
  onSelectDateRange,
}: DateRangePickerProps) => {
  const {
    selectCurrentDate,
    startDate,
    selectEndDate,
    hasError,
    isDateWithRange,
  } = useDateRangeCalendar({ isFutureDaysRestricted, onSelectDateRange });

  useEffect(() => {
    if (hasError) {
      ToastManager.error("올바른 날짜를 선택해주세요!");
    }
  }, [hasError]);

  return (
    <Flex flexWrap="wrap">
      <Calendar
        maxSelectableYear={2}
        onSelectDate={(newDate) => selectCurrentDate(newDate)}
        isDateInRange={isDateWithRange}
      />

      {startDate && (
        <Calendar
          onSelectDate={(newDate) => selectEndDate(newDate)}
          isDateInRange={isDateWithRange}
          maxSelectableYear={2}
        />
      )}
      <ToastContainer enterTimeout={500} leaveTimeout={1000} />
    </Flex>
  );
};

export default DateRangePicker;
