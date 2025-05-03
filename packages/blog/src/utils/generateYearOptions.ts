import { getYear } from 'date-fns';

export const generateYearOptionsFromDate = (
  date: Date = new Date(),
  length = 20
) => {
  return Array.from({ length })
    .map((year, index) => {
      return {
        key: (getYear(date) - index).toString(),
        label: (getYear(date) - index).toString(),
      };
    })
    .reverse();
};
