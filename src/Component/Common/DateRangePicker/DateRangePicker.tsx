import { useEffect } from 'react';

import Calendar from '@/Component/Common/Calendar/Calendar';
import Flex from '@/Component/Common/Flex/Flex';
import { ToastContainer, ToastManager } from '@/Component/Common/Toast';
import useDateRangeCalendar from '@/hooks/useDateRangeCalendar';
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
      ToastManager.error('올바른 날짜를 선택해주세요!');
    }
  }, [hasError]);

  return (
    <Flex flexWrap="wrap">
      <Calendar
        onSelectDate={(newDate) => selectCurrentDate(newDate)}
        isDateInRange={isDateWithRange}
      />

      {startDate && (
        <Calendar
          onSelectDate={(newDate) => selectEndDate(newDate)}
          isDateInRange={isDateWithRange}
        />
      )}
      <ToastContainer enterTimeout={500} leaveTimeout={1000} />
    </Flex>
  );
};

export default DateRangePicker;
