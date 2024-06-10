import { useState } from 'react';

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  getMonth,
  getYear,
  lastDayOfWeek,
  startOfWeek,
  subDays,
  subMonths,
} from 'date-fns';

export default function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 해당 달의 처음 날짜를 구하는 부분
  const firstDayOfMonth = () => {
    return new Date(getYear(currentDate), getMonth(currentDate), 1);
  };

  // 해당 달의 마지막 날짜를 구하는 부분
  const lastDayOfMonth = () => {
    return new Date(getYear(currentDate), getMonth(currentDate) + 1, 0);
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(new Date(currentDate), 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(new Date(currentDate), 1));
  };

  // 금월 첫 날 ~ 마지막 날 Date들
  const currentMonthDates = () => {
    return eachDayOfInterval({
      start: firstDayOfMonth(),
      end: lastDayOfMonth(),
    });
  };

  const prevMonthDates = () => {
    try {
      return eachDayOfInterval({
        start: startOfWeek(firstDayOfMonth()),
        end: subDays(firstDayOfMonth(), 1),
      });
    } catch (e) {
      return [];
    }
  };

  return {
    setCurrentDate,
    currentDate,
    nextMonth,
    prevMonth,
    prevMonthDates,
    currentMonthDates,
  };
}
