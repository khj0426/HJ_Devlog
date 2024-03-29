---
title: 'useCallback훅 알아보기'
excerpt: 'useCallback 훅에 대해서 알아보자'
date: '2024-03-29'
author: '김효중'
category: 'React'
image: '/images/postImg/react.png'
---

언제 useCallback을 쓰고 어느 시점에 useMemo를 써야할까요?

이 주제에 관해 정리해보려고 합니다. (먼저 useCallback 훅부터 정리를 하고 가려고 합니다.)

(막연하게 성능 최적화를위해 useCallback과 useMemo를 쓴다고만 알고 있었던..)

리액트에서는 useCallback과 useMemo라는 훅이 존재합니다. 공식문서에 따르면 두 훅은 다음과 같은 상황에 사용된다고 합니다.

### 언제 써야할까?

가장 중요한 문제입니다. 언제 useCallback을 쓰면 좋지에 대해서는 2가지 경우가 존재할 수 있습니다.

- 참조 동일성
- 비용이 많이 드는 계산

자바스크립트의 데이터 타입은 원시타입,참조타입으로 구분되어 있습니다. 리액트는 이전 상태와의 비교를 통해 리랜더링을 결정합니다. 원시타입의 경우 값이 바뀔때 랜더링이 발생하지만 참조 타입의 경우는 랜더링이 보장되지 않습니다.

리액트에서 deps array에 값을 포함시킬떄, 만약 객체라면 객체의 참조가 변경되었는지 여부를 체크합니다.

그러나 객체의 내용이 바뀌었지만 참조가 동일하다면 리액트는 의존성을 유지합니다.

```ts
const Child = ({ bar, baz }) => {
  const options = { bar, baz };

  useEffect(() => {
    handleOptions(options);
  }, [options]);

  return <Box>foo</Box>;
}
```

이렇게 된다면 options은 내용은 변경되지 않았지만, 랜더링때마다 참조가 다른 아예 새로운 객체를 만들어버려서, 문제가 발생합니다. 

따라서 deps array를 바꾸면 해결가능합니다.

```ts
const Child = ({ bar, baz }) => {
  const options = { bar, baz };

  useEffect(() => {
    handleOptions(options);
  }, [bar,baz]);

  return <Box>foo</Box>;
}
```

함수를 캐싱하기 위헤 다음의 컴포넌트를 만들어봅시다.

```ts
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  // ...
```

만약 이 handleSubmit 함수를 자식의 ShippingForm컴포넌트의 props로 전달하고 싶으면 다음과 같이 할 것입니다.

```ts
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
```

기본적으로 컴포넌트가 랜더링되면, 하위 컴포넌트도 모두 재귀적으로 랜더링됩니다.

만약 ProductPage에서 다른 theme을 사용하면 ShippingForm도 다시 랜더링이 발생하게 됩니다.

그러나 이런 자식의 리랜더링은 떄론 불필요한 계산일 수도 있습니다.따라서 ShippingForm에  <b>props가 동일하면 랜더링 하지 말아줄래?</b>를 <b>React.memo</b>를 사용해 알려줄 수 있습니다.

```ts
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

만약 그럼 부모 컴포넌트인 ProductPage에서 저 handleSubmit을 useCallback을 쓰지 않고 선언해볼까요?

```ts
function ProductPage({ productId, referrer, theme }) {
  // Every time the theme changes, this will be a different function...
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }
  
  return (
    <div className={theme}>
      {/* ... so ShippingForm's props will never be the same, and it will re-render every time */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

자바스크립트에서 () => {} 는 항상 다른 함수입니다.

만약 이 handleSubmit을 props로 넘기면 handleSubmit은 항상 다른 함수가 되어 memo가 동작하지 않을 것입니다

따라서 다음의 경우 useCallback + 자식 컴포넌트의 memo를 통해 효과적으로 랜더링을 제어 할 수 있습니다.

### useCallback

![](https://blog.kakaocdn.net/dn/qhSSu/btsv7rNP9I8/NZo7qCe6T73s7aRksDFbhk/img.png)

useCallback은 함수를 기억했다가 재사용가능하도록 도와주는 훅입니다.

리액트에서 부모 컴포넌트가 랜더링 될떄, 하위 자식 컴포넌트들도 랜더링이 일어납니다.

이 과정에서 useCallback으로 함수의 불필요한 생성을 방지 할 수 있습니다.

이처럼 useCallback을 사용하면 랜더링 중 함수 재생성을 막을 수 있다고 일반적으로 여겨집니다.

자바스크립트에서 함수는 객체입니다. 객체는 참조 타입으로 값을 변수에 직접 할당하지 않고 변수에 메모리에 저장되어 있는 참조 타입 값의 주소가 저장됩니다

따라서 아래의 코드는 false가 나옵니다(메모리에 저장되어 있는 주소가 달라서)

```ts
const functionOne = function() {
  return 5;
};
const functionTwo = function() {
  return 5;
};
console.log(functionOne === functionTwo); // false
```

![](https://blog.kakaocdn.net/dn/bJFa0E/btsv8x1asi0/RrcN6Q52ybkjWHQ3EAclRk/img.png)

따라서 함수를 만약 새로 만들어 호출한다면 기존의 함수와 다르게 됩니다.

만약 useCallback을 쓰면 deps array을 기준으로 반환된 함수 객체를 재사용하게 됩니다. 이떄는 동일한 함수 객체를 반환하게 됩니다.

먼저 아래의 코드가 존재합니다.

```ts
function CandyDispenser() {
  const initialCandies = ["snickers", "skittles", "twix", "milky way"];
  const [candies, setCandies] = React.useState(initialCandies);
  const dispense = (candy) => {
    setCandies((allCandies) => allCandies.filter((c) => c !== candy));
  };
  return (
    <div>
      <h1>Candy Dispenser</h1>
      <div>
        <div>Available Candy</div>
        {candies.length === 0 ? (
          <button onClick={() => setCandies(initialCandies)}>refill</button>
        ) : (
          <ul>
            {candies.map((candy) => (
              <li key={candy}>
                <button onClick={() => dispense(candy)}>grab</button> {candy}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```
저 filter함수를 useCallback 훅을 써서 수정해보겠습니다.

```ts
const dispense = React.useCallback((candy) => {
  setCandies((allCandies) => allCandies.filter((c) => c !== candy));
}, []);
```

이렇게 하면 과연 더 좋은 성능을 얻을 수 있을까요? 한번 측정을 해보겠습니다.

기존 코드 VS useCallback을 적용한 코드를 비교해 보면 다음의 결과를 얻을 수 있습니다.

```ts
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import CandyDispenser from './Atom/Candy';
import { waitForElementToBeRemoved } from '@testing-library/react';

test('useCallback을 사용안한 경우', async () => {
  render(
    <div>
      <CandyDispenser />
    </div>
  );

  const start = performance.now();

  fireEvent.click(screen.getAllByText('grab')[0]);

  // eslint-disable-next-line testing-library/prefer-query-by-disappearance
  await waitFor(() => {
    const snickersElements = screen.queryAllByText('snickers');
    return snickersElements.length === 0;
  });

  const end = performance.now();

  // dispense 함수가 100 milliseconds 이내에 완료되었는지 확인합니다.
  expect(end - start).toBeLessThan(1000);
  console.log(end - start);
});
```

먼저 useCallback을 쓰지 않은 컴포넌트에서는 다음의 결과를 얻을 수 있었습니다.

```ts
  console.log
    21.13319999999976

      at Object.<anonymous> (src/App.test.tsx:28:31)

 PASS  src/App.test.tsx
  √ useCallback을 사용안한 경우 (93 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        6.385 s

```

콘솔에는 대략 0.21초가 찍힌 것을 볼 수 있었습니다. 다음으로 useCallback을 사용한 테스트 결과입니다.

```ts
  console.log
    27.79810000000043

      at Object.<anonymous> (src/AppSec.test.tsx:28:31)

 PASS  src/AppSec.test.tsx
  √ useCallback을 사용한 경우 (109 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        5.976 s
Ran all test suites matching /AppSec.test.tsx/i.
```

콘솔에 0.27초가량 찍혔고 이상하게도 useCallback을 씀에도 불구하고 성능 향상이 이루어지지 않았습니다.

무조건적으로 나 성능 향상을 위해 useCallback을 쓸거다라는 것은 바람직하지도 않고, 실제로 성능 향상이 이루어지지 않을 수도 있습니다.


