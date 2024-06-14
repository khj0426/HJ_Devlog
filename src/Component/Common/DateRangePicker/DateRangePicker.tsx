import { useEffect } from 'react';

import Calendar from '@/Component/Common/Calendar/Calendar';
import Flex from '@/Component/Common/Flex/Flex';
import { ToastContainer, ToastManager } from '@/Component/Common/Toast';
import useDateRangeCalendar from '@/hooks/useDateRangeCalendar';
interface DateRangePickerProps {
  readonly isFutureDaysRestricted?: boolean;
}

const DateRangePicker = ({
  isFutureDaysRestricted = true,
}: DateRangePickerProps) => {
  const { selectCurrentDate, selectEndDate, hasError, isDateWithRange } =
    useDateRangeCalendar({ isFutureDaysRestricted });

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
      <Calendar
        onSelectDate={(newDate) => selectEndDate(newDate)}
        isDateInRange={isDateWithRange}
      />
      <ToastContainer enterTimeout={500} leaveTimeout={1000} />
    </Flex>
  );
};

export default DateRangePicker;
