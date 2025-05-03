---
title: 'Next js app Route의 캐싱-RequestMemorization'
excerpt: '공식문서 공부'
date: '2024-04-27'
author: '김효중'
category: 'Next.js'
image: '/images/postImg/next13.png'
---

### Request Memorization

이 방법은 브라우저의 fetch API를 확장해서 <b>같은 URL과 옵션의 요청</b>을 자동으로 기억한다. 사용자가 다른 서버로 요청을 날릴 때, 2개 이상의 HTTP 요청을 하나로 만든다.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fdeduplicated-fetch-requests.png&w=1920&q=75)

예를 들어, Layout이나 Page, 다른 여러 컴포넌트에서 사용되어야 하는 데이터가 존재한다면 최상단에서 이 데이터를 패칭한 후 컴포넌트로 props로 뿌리는 것이 일반적인 패턴이다.

![](https://vietnamlife.info/wp-content/uploads/2024/02/React-component-props.png)

대신, 같은 데이터에 대해 네트워크를 통해 여러 번 요청하는 것의 성능문제를 걱정하지 않고 필요한 컴포넌트에서 데이터를 가져올 수 있다.

```ts
async function getItem(){
    //fetch 함수는 자동으로 껼과가 캐싱된다.

    const res = await fetch('https://...//iTem/1');
    return res.json();
}a

//이 함수는 두번 호출되었으나, 한번만 실행된다.

const item = await getItem();
//cache MISS

const item = await getItem();
//cache HIT
```

![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Frequest-memoization.png&w=1920&q=75)

- 👻 라우트를 렌더링하는 동안, 특정 요청이 처음 호출될 때 그 결과는 메모리 없으므로 캐시 MISS 상태이다.

- 👻 그러므로 함수가 실행되고, 외부에서 데이터를 가져와 메모리 저장한다.

- 👻 동일한 경로에서 같은 함수가 요청이되면, CACHE-HIT상태이고 함수를 실행하지 않고, 메모리에서부터 데이터를 전달받는다.

- 👻 경로가 렌더링되고 화면에 구성요소가 다 그려지면 메모리가 리셋되고 모든 요청 메모리제이션 항목이 지워진다.

### 알아두면 좋은 것들

- 👻 Request Memorization은 Next가 아닌 React의 기능이다.

- 👻 이 기능은 GET메소드에서만 적용된다.

- 👻 fetch가 적합하지 않은 경우(일부 Database,GraphQL client)에는 React의 cache function으로 함수를 메모할 수 있다.

React의 cache API는 서버 컴포넌트에서 사용되는 함수이다. 이 함수는 가져온 데이터나 연산의 결과를 캐싱한다.

```ts
const cacheFn = cache(fn);
```

컴포넌트 외부에서 cache를 호출해 캐싱 기능을 가진 함수를 만들 수 있다.

```ts
import {cache} from 'react'
import calculateMetrics from 'lib/metrics'

const getMetrics = cache(calculateMetrics)
function Chart({data}){
    const report = getMetrics(data)
}
```

getMetrics는 calculateMetric(data)를 호출하고 캐시에 결과를 저장한다. getMetrics가 같은 data와 함께 호출되면 캐싱 된 결과를 반환한다.

```ts
import {cache} from 'react';
import calculateUserMetrics from 'lib/user';

const getUserMetrics = cache(calculateUserMetrics);

//Profile.tsx
function Profile({user}) {
  const metrics = getUserMetrics(user);
  // ...
}

//TeamReport.tsx
function TeamReport({users}) {
  for (let user in users) {
    const metrics = getUserMetrics(user);
    // ...
  }
  // ...
}
```

같은 user객체가 TeamReport과 Profile에서 렌더링될 때, 두 컴포넌트는 user를 위한 calculateUserMetrics를 한 번 호출한다.

만약 Profile이 TeamReport보다 먼저 렌더링된다고 생각해보자. 

Profile은 getUserMetrics를 호출하고, 캐싱된 결과가 있는지 확인한다. user와 함께 getUserMetrics를 호출하기 때문에, 현재 캐시는 없다.

getUserMetrics는 user와 함께 calculateUserMetrics를 호출하고 캐시에 값을 저장한다.

TeamReport가 users목록을 렌더링할 때 캐싱된 리스트를 사용하고, getUserMetrics를 호출해 캐싱된 값을 가져온다.

같은 캐시에 접근하기 위해, 컴포넌트는 반드시 같은 메모화된 함수를 호출한다.

일반적인 경우, 같은 캐시에 접근하는 같은 메모화된 함수를 호출해야하고, 컴포넌트끼리 import할 수 있는 곳에 함수를 정의하는 것이 바람직하다.

```ts
//getWeekReport.ts

import {cache} from 'react'
import {calculateReport} from './report'

export default cache(calculateReport)

//사용처 Tempreature.ts

import getWeekReport from './getWeekReport'

export default function Temperature({cityData}) {
	const report = getWeekReport(cityData);
  // ...
}

//사용처 Precipitation.ts

import getWeekReport from './getWeekReport';

export default function Precipitation({cityData}) {
  const report = getWeekReport(cityData);
  // ...
}
```

이렇게 하면 두 컴포넌트는 같은 캐시를 읽고 쓰게 된다.


