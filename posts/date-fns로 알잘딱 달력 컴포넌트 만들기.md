---
title: 'date-fns로 알잘딱 달력 컴포넌트 만들기'
excerpt: '최대한 UI와 로직을 분리해보자...!!'
date: '2024-06-12'
author: '김효중'
category: 'React'
image: '/images/postImg/06_12_1.png'
---

달력 컴포넌트를 만들어보고자 한다. 왜 만드냐면, 여러 구글 통계 정보를 간단하게 날짜로 조회하는 통계 백오피스를 만들고 싶어서이다. 내가 90일 전의 날짜를 누르고, 총 사용자 수 버튼을 누르면 해당 보고서가 쭉 만들어지는 흐름으로 개발을 할건데, 이 과정에서 날짜로 보고서를 만드는 것이 좋다고 생각했다. 또, 90일전부터 현재 날짜까지 선택하면 보고서의 시작날짜와 끝 날짜를 고정할 수 있으니깐 여러므로 유용하게 쓰일 것 같은 컴포넌트이기에, 만들고자 하였다. (서론이 너무 길었지만,,,)

컴포넌트를 만들 때, 가장 고민되는 건 어느정도의 로직이 컴포넌트 안에 들어가야 하는지? 추상화정도가 너무 깊지 않은지? 이건 너무 도메인 로직에 얽혀서 , 도저히 다시 사용하기 불가능한 컴포넌트인지 판단하는 것이 가장 어려운 점인 것 같다.

비슷한 고민은 , 프론트엔드 개발을 하면 꼭 한번은 하게 되는 것 같다.

어느정도의 해답을 찾고자, 여러 자료를 참고했는데, 결국 UI와 데이터, 사용자의 상호작용으로 분리가 되어진 컴포넌트가 가장 이상적인 것 같다.

![](https://blog.kakaocdn.net/dn/clnKRd/btssTt8l6ld/vF7rKjU1sJITDRaCvptquK/img.png)

달력 컴포넌트를 예로 들어보자. 달력 컴포넌트는 대략 이런 UI가 될 것이다.

![](/images/postImg/06_12_1.png)

이 모든 UI를 하나의 컴포넌트로 관리하기보다, 달력에서의 책임을 하나씩 나눠서 컴포넌트로 쪼개보자! 크게 2가지 부분으로 쪼갤 수 있을 것 같아 보인다.

- 😗 실제 달력의 날짜를 표시하는 부분
- 😗 달력의 헤더 부분(연도, 월을 표시하고 좌우 화살표가 존재하는 부분)

이 두 개의 컴포넌트를 조합해서, 최종적으로 달력 컴포넌트가 된다. 

![](/images/postImg/06_12_2.png)

그리고 날짜를 처리하기엔, 실수하기도 쉽고 잘못되었을 경우 오류를 핸들링하기 너무 어려울 것 같아서, 간단한 날짜 라이브러리 date-fns을 사용했다.

먼저 달력의 헤더 부분, <b>MonthNavigation</b>에는 무엇이 필요할까? 이 컴포넌트에서는 년도를 클릭하면 년도가 바뀔 필요가 있거나, 현재 달, 이전 달의 달력의 UI를 적절히 띄워주어야 한다. 그럼 <b>년도,월을 UI로 띄워주고</b> 화살표를 클릭했을 때의 행위는 UI와 별도로 분리를 해보자!

이를 위해 필요한 Props부터 정의해보자. 좌측 화살표를 클릭했을 떄의 행위, 우측 화살표를 클릭했을 때의 행위는 컴포넌트 안에서 정의하는 것이 아니라, 밖에서 주입을 받도록 해보자! MonthNavigation안에서 관리하는 상태가 존재한다. 

년도를 클릭했을 때, 드롭다운이 나오면서, 새로운 년도를 선택할 수 있어야 한다. 이를 위한 데이터는 <b>useBoolean</b>이라는 훅으로 분리를 시켜보자.

그리고 드롭다운은 이미 만들어 둔, 컴포넌트를 사용할 것이다.(안에서 또 드롭다운을 만들면 재사용하기 빡세진다!)

```ts
interface MonthNavigationProps {
  /** 현재 날짜 */
  readonly date: Date;

  /** 
   * 년도를 선택했을 때 호출되는 함수
   * @param _newYear 년도를 선택했을 때 newYear를 넘깁니다.
   */
  readonly setCurrentDate: (_newYear: string) => void;

  /** 왼쪽 화살표를 눌렀을 때의 행위 */
  readonly prevMonth: () => void;

  /** 오른쪽 화살표를 눌렀을 때의 행위 */
  readonly nextMonth: () => void;
}
```

더 많은 props를 받을 수 있지만, 지나친 추상화를 하기보다 필요한 props만 먼저 정의했다. 

다음으로 년도를 클릭했을 때, 드롭다운이 나오면서, 새로운 년도를 선택할 수 있는 데이터를 만들기 위해 useBoolean훅을 만들어보자! 요런 형태의 훅이 간단하게 만들어진다. (이건 어디서든 다시 쓸 수 있는 훅처럼 보인다!)

```ts
import { useState } from 'react';

export default function useBoolean() {
  const [state, setState] = useState(false);

  const toggle = () => {
    setState(!state);
  };

  const setTrue = () => {
    setState(true);
  };

  const setFalse = () => {
    setState(false);
  };

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
}
```

이제 모든 준비는 끝났다. 내가 만든 훅과 props, 드롭다운 컴포넌트와 date-fns를 적절히 활용해서, 실제 달력의 날짜를 표시하는 부분의 컴포넌트를 만들 수 있다.

```tsx
//MonthNavigation.tsx
import { getYear, getMonth } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'iconic-react';

import DropDown from '@/Component/Common/DropDown/DropDown';
import Flex from '@/Component/Common/Flex/Flex';
import IconButton from '@/Component/Common/IconButton/IconButton';
import useBoolean from '@/hooks/useBoolean';
interface MonthNavigationProps {
  readonly date: Date;
  readonly setCurrentDate: (_newYear: string) => void;
  readonly prevMonth: () => void;
  readonly nextMonth: () => void;
}

const MonthNavigation = ({
  date,
  setCurrentDate,
  prevMonth,
  nextMonth,
}: MonthNavigationProps) => {
  const years = Array.from({ length: 20 }).map((year, index) => {
    return {
      key: (getYear(date) + index).toString(),
      label: (getYear(date) + index).toString(),
    };
  });

  const { setFalse, state: clickedYear, toggle } = useBoolean();
  return (
    <Flex justifyContent="space-around" width={'100%'}>
      <Flex
        style={{
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <span onClick={toggle}>{getYear(date)}년</span>
        {clickedYear && (
          <DropDown
            items={years}
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
      <Flex gap={'5px'}>
        <IconButton icon={<ArrowLeft />} onClick={prevMonth} />
        <IconButton icon={<ArrowRight />} onClick={nextMonth} />
      </Flex>
    </Flex>
  );
};
export default MonthNavigation;
```

물론 더 쪼갤 수도 있을 것 같다. span태그와 몇월인지? 몇년도인지? 나타내는 부분이 공통적이고, 이것도 작게 하나의 컴포넌트로 분리할 수도 있을 것 같다. 그러나 지금 정도의 추상화라면? 그래도 UI의 책임, 데이터의 책임, 사용자의 액션에 대한 행위는 밖에서 주입받도록 분리를 해주었기 때문에 너무 지저분해 보이지는 않는다.(물론 내눈에만 그럴 수도 있따,,)

음 이렇게 날짜와 요일이 보여지고 , 저번 월, 다음 월로 이동하는 기능, 그리고 년도를 눌렀을 때, 드롭다운이 뜨면서 년도를 선택할 수 있게 하나의 컴포넌트로 만들어보았다.

이제 달력의 셀 부분(실제 달력의 날짜가 보여지는 부분)도 마찬가지로 컴포넌트로 나눠보자!

이 부분은 크게 3가지 영역으로 분리를 할 수 있다. 

- 😗 일~~토요일까지의 요일을 나타내는 영역
- 😗 해당 월에서 이전 월의 날짜를 나타내는 영역(회색부분의 영역)
- 😗 현재 월의 날짜를 나타내는 영역

그러면 , 이 달력의 셀 부분의 컴포넌트는 3가지의 영역의 조합으로 이루어져있다고 볼 수 있고, 다음의 형태로 나타나질 것이다.

```tsx
{일~토까지의 요일}.map((요일) => <Cell>요일</Cell>)
{해당 월에서 이전 월의 날짜를 나타내는 회색부분의 영역}.map((각 영역) => <Cell>각 영역</Cell>)
{현재 월의 날짜}.map((요일) => <Cell>요일</Cell>)
```

그리고 일~토까지의 요일이 아닌 현재 월, 현재 월에서 이전 월의 날짜를 나타내는 부분은 마찬가지로 외부에서 Props로 받아서 렌더링해주자!

```ts
interface DateGridProps {
  prevMonthDates: Date[];
  currentMonthDates: Date[];
}
```

이렇게 props를 받고 앞에서 말한 것처럼 3가지의 부분을 쭉 UI로 그려내면 된다.

```tsx
//DateGrid.tsx

import { useState } from 'react';

import { getDate, isSaturday, isSunday, isToday } from 'date-fns';
import styled, { css } from 'styled-components';

interface DateGridProps {
  prevMonthDates: Date[];
  currentMonthDates: Date[];
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const DateGrid = ({ prevMonthDates, currentMonthDates }: DateGridProps) => {
  const [currentCell, setCurrentCell] = useState<null | Date>(null);
  return (
    <GridContainer>
      {DAYS.map((day) => (
        <DayHeader key={day}>{day}</DayHeader>
      ))}
      {prevMonthDates.map((prevDate) => (
        <DateCell key={prevDate.toString()} isPrevMonth>
          {getDate(prevDate)}
        </DateCell>
      ))}
      {currentMonthDates.map((currentDate) => (
        <DateCell
          onClick={() => setCurrentCell(currentDate)}
          isSaturDay={isSaturday(currentDate)}
          isWeekend={isSaturday(currentDate) || isSunday(currentDate)}
          isSunday={isSunday(currentDate)}
        >
          {getDate(currentDate)}
        </DateCell>
      ))}
    </GridContainer>
  );
};
```

그리고 이 DateGrid 컴포넌트든, MonthNavigation 컴포넌트든, 외부에서 받는 Props은 <b>모두 캘린더 컴포넌트가 관리</b>한다. 또 고민되는 지점이 하나 생겼다. 이 모든 Props를 캘린더 컴포넌트 안에 정의하고 넘기는 것이 합당한가?

캘린더 컴포넌트는 DateGrid컴포넌트와 MonthNavigation컴포넌트의 UI조합이다. 즉 기능, 데이터의 부분은 모두 책임을 전가시키는 것이 좋다. 기능적인 부분을 useCalendar훅으로 분리해보자!

다행히 date-fns에서 정말 여러 편리한 함수를 제공해줘서, 단순히 이를 활용하기만 해서 완전완전 편했다.

```ts
//useCalendar.ts
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
```

그럼 캘린더 컴포넌트는 깔끔하게 UI와 , 기능이 분리된 컴포넌트가 된다.

```tsx
import DateGrid from '@/Component/Common/Calendar/DateGrid';
import MonthNavigation from '@/Component/Common/Calendar/MonthNavigation';
import Flex from '@/Component/Common/Flex/Flex';
import useCalendar from '@/hooks/useCalendar';

const Calendar = () => {
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
    <Flex width={'350px'} flexDirection="column">
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
    </Flex>
  );
};

export default Calendar;
```

개발을 하면서 언제나 이렇게 기능과 UI를 분리할 수는 없겠지만, 그래도 최대한 신경써서 분리하고, 추상화 정도를 맞추는 것이 프론트엔드 개발자가 고민고민하고 신경써야 할 부분이 아닐까 생각한다. 그래서 헤드리스 컴포넌트가 인기있는 것 같기도하고,,, 헤드리스 컴포넌트에 대해 정말 잘 이해하고, 공부해야겠다고 다시 한번 느껴버렸다,,,,,,!

