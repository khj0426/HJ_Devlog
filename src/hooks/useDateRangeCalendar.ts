import { useState } from 'react';

import { compareAsc, isWithinInterval } from 'date-fns';

interface UseDateRangeCalenDarProps {
  onStartDateSelect?: () => void;
  onEndDateSelect?: () => void;
  isFutureDaysRestricted?: boolean;
}

export default function useDateRangeCalendar({
  onStartDateSelect,
  onEndDateSelect,
  isFutureDaysRestricted,
}: UseDateRangeCalenDarProps) {
  const currentDate = new Date();
  const [hasError, setError] = useState(false);
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);

  const clearBothStartDateEndDate = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const selectCurrentDate = (_newDate: Date) => {
    if (startDate) {
      clearBothStartDateEndDate();
      return;
    }
    if (onStartDateSelect) {
      onStartDateSelect();
    }
    setStartDate(_newDate);
    setError(false);
  };

  const selectEndDate = (_newEndDate: Date) => {
    if (endDate) {
      setEndDate(null);
      return;
    }
    if (compareAsc(_newEndDate, currentDate) !== -1) {
      clearBothStartDateEndDate();
      setError(true);

      return;
    }

    if (onEndDateSelect) {
      onEndDateSelect();
    }

    if (startDate) {
      setEndDate(_newEndDate);
      setError(false);
    }
  };

  const isDateWithRange = (date: Date) => {
    if (startDate && endDate && compareAsc(startDate, endDate) === -1)
      return isWithinInterval(date, {
        start: startDate,
        end: endDate,
      });

    return false;
  };

  return {
    isDateWithRange,
    selectCurrentDate,
    selectEndDate,
    endDate,
    hasError,
    startDate,
  };
}
