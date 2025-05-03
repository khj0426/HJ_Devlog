import { useEffect } from "react";

import Calendar from "~/packages/shared/src/components/Calendar/Calendar";
import Flex from "~/packages/shared/src/components/Flex/Flex";
import {
  ToastContainer,
  ToastManager,
} from "~/packages/shared/src/components/Toast";
import useDateRangeCalendar from "~/packages/shared/src/hooks/useDateRangeCalendar";
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
