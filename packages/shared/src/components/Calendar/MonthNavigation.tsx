import { getYear, getMonth } from "date-fns";
import { ArrowLeft, ArrowRight } from "iconic-react";
import useBoolean from "../../hooks/useBoolean";
import DropDown from "../DropDown/DropDown";
import Flex from "../Flex/Flex";
import IconButton from "../IconButton/IconButton";

const generateYearOptionsFromDate = (date: Date = new Date(), length = 20) => {
  return Array.from({ length })
    .map((year, index) => {
      return {
        key: (getYear(date) - index).toString(),
        label: (getYear(date) - index).toString(),
      };
    })
    .reverse();
};

interface MonthNavigationProps {
  readonly date: Date;
  readonly setCurrentDate: (_newYear: string) => void;
  readonly prevMonth: () => void;
  readonly nextMonth: () => void;
  //최대 선택가능환 연도
  readonly maxSelectableYear?: number;
}

const MonthNavigation = ({
  date,
  setCurrentDate,
  prevMonth,
  nextMonth,
  maxSelectableYear,
}: MonthNavigationProps) => {
  const selectableYearOptions = generateYearOptionsFromDate(
    new Date(),
    maxSelectableYear
  );

  const { setFalse, state: clickedYear, toggle } = useBoolean();
  return (
    <Flex justifyContent="space-around" width={"100%"}>
      <Flex
        style={{
          position: "relative",
          cursor: "pointer",
        }}
      >
        <span onClick={toggle}>{getYear(date)}년</span>
        {clickedYear && (
          <DropDown
            items={selectableYearOptions}
            onChangeSelectedItem={(item) => {
              if (item) {
                setCurrentDate(item.key);
                setFalse();
              }
            }}
          />
        )}
      </Flex>
      <Flex>
        <span>{getMonth(date) + 1}월</span>
      </Flex>
      <Flex gap={"5px"}>
        <IconButton
          style={{
            border: "none",
          }}
          icon={<ArrowLeft color="rgb(255, 138, 101)" />}
          onClick={prevMonth}
        />
        <IconButton
          icon={<ArrowRight color="rgb(255, 138, 101)" />}
          onClick={nextMonth}
          style={{
            border: "none",
          }}
        />
      </Flex>
    </Flex>
  );
};
export default MonthNavigation;
