---
title: 'Next js app Route의 캐싱-DataCache'
excerpt: '공식문서 공부'
date: '2024-06-15'
author: '김효중'
category: 'Next.js'
image: '/images/postImg/next13.png'
---

보통 일반적으로 확장된 fetchAPI를 사용할 때 , 두번째 인자로 revalidate를 넣어줄 수 있다.

```ts
const allUserRes = await fetch(
  `${Environment.baseUrl()}/users/get-users`,
  {
    next: {
      revalidate: 5,
    },
  }
);
```

이렇게 next의 revalidate를 넣어줄 때, 동작하는 것이 Next의 data-cache이다. 공식문서에는 어떻게 소개되어 있을까?

아래와 같이 소개되어 있다.

Next.js에서는 데이터 패치를 통해 서버 요청과 배포 간 결과를 유지하는 내장 데이터 캐시가 있습니다. 이는 서버의 각 요청이 자체 지속적인 캐싱 의미를 설정할 수 있도록 하기 때문에 가능합니다.

브라우저에서 fetch의 cache옵션은 요청이 브라우저의 HTTP캐시와 어떻게 상호작용할지를 나타내지만, Next에서는 cache옵션이 <b>서버 측 요청이 서버의 데이터 캐시와 어떻게 상호작용할지 나타낸다.</b>

특이한 점은 브라우저의 HTTP캐시처럼아 아닌, 서버의 데이터에 대한 캐싱이라는 점이다.! 성공적으로 데이터를 가져오면, 그 응답값을 갖고 있다가 동일한 경로로 fetch함수가 실행되면 <b>실제 API호출을 뛰고, 캐싱된 값을 반환한다.</b>


예를들어, revalidate시간을 1초로 설정하면, 1초동안 어느 사용자가 접속해도, 실제 API요청은 단 1회 전송된다

(아마 직접적으로 서버의 부하를 줄일 수 있는 캐싱이라고 생각한다.)
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fdata-cache.png&w=1920&q=75)

만약 fetch요청이 처음 요청되면, Next는 캐싱된 응답값이 있는지 DataCache를 살펴본다. 만약 캐싱된 응답이 있다면, 즉시 반환되고, RequestMemorization에 들어가게 된다.


```ts
//example.tsx
async function getItem(){
    const res = await fetch('https://...')
    return res.json()
}

//getItem은 두 번 호출되지만, 실제로는 한번만 호출된다.
//캐시 MISS상태
const item = await getItem()

//캐시 HIT상태
const item = await getItem()
```

만약 캐싱된 응답이 없다면, 서버에 실제 데이터 요청을 보내고, 결과가 Date Cache에 담기게 된다.

또 cache:no-store옵션을 준 경우, 결과는 항상 실제 서버에 요청을 보내 가져오게 된다.

Date-Cache는 들어오는 요청이 배포 환경에서도 쭉 지속되는 반면, Request Memoization은 요청의 수명 시간 동안 지속된다.좀 더 정확하게 말하면,  Request Memoization은 <b>하나의 서버 요청동안</b> 유효하고 Data-Cache는 <b>revalidate로 설정한 시간동안</b>지속된다.

(router.refresh로는 Data-Cache가 그대로이기 때문에, 요청에 기존 값이 아닌 새로운 값을 얻고 싶다면 revalidatePath을 사용해야 한다.)

Date-Cache는 크게 시간을 직접적으로 설정하는 방법과, tag를 기반한 이벤트를 이용하는 방법이 있다.

- 🙃 Time-based Revalidation : revalidate로 정해준 시간이 지난 후 새 요청이 들어오면, 데이터를 재검증한다. 자주 변경되지 않는 상황에 유용하게 쓰일 수 있다.

- 🙃 On-demand Revalidation : 폼 제출 등과 같은 이벤트를 기반으로 데이터를 재검증한다. 태그 기반 혹은 경로 기반 접근 방식을 사용해, 데이터를 한꺼번에 재검증할 수 있고, 빨리빨리 변하는 최신 데이터를 표시하고자 할 때 유용하게 쓰일 수 있다.

먼저 Time-based Revalidation에 대해 살펴보자!

Time-based Revalidation을 사용하기 위해 next.revalidation옵션을 fetch API에 전달해주어야 한다.

```ts
//1시간마다 Revalidate가 발생한다.

fetch('https://...',{
  next:{
    revalidate:3600
  }
})
```

이 방법 외에도 Segment옵션이라는 것을 줄 수 있는데 아래의 것들이 있다.

```ts
const dynamic = 'force-dynamic'

const revalidate = 0
```
![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ftime-based-revalidation.png&w=1920&q=75)

처음으로 revalidate와 함께 fetch 요청이 호출되면, 데이터는 Date Cache에 저장된다. 지정된 시간 프레임(예를 들어 1시간)내에 호출되는 모든 요청은 캐시된 데이터를 반환한다.

만약 시간 프레임이 지나면, 다음 요청은 여전히 캐시된 데이터를 반환한다.

Next가 백그라운드에서 데이터의 재검증을 발생시키고, 데이터가 성공적으로 가져와지면, Next는 Data Cache를 최신 데이터로 갱신한다.

만약 재검증이 실패하면, 이전 데이터는 변경되지 않은 채 유지한다.

다음으로 시간으로 revalidate를 시키는 것이 아닌 On-demand방식에 대해 알아보자!! 이 On-demand방식은 revalidatePath나 revalidateTag를 통해 작동시킬 수 있다.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fon-demand-revalidation.png&w=1920&q=75)

마찬가지로 처음 fetch가 호출되면, 데이터를 서버에서 가져오고 Data Cache에 저장한다. 만약에 on-demand revalidation이 호출되면, 즉 revalidatePath나 revalidateTag를 호출하면, 해당 캐시항목들이 Data Cache에서 제거된다.

이 on-demand방식은 시간이 지날 때까지 오래된 데이터를 캐싱해두는 방식과는 다르다.

다음에 요청이 들어오면 캐시 MISS가 발생하고, 서버에서 다시 데이터를 가져와 Data Cache에 저장한다.

cache의 옵션을 no-store로 저장해두면, fetch가 호출될 때마다 데이터를 가져온다.

```ts
fetch('https:..',{
  cache:'no-store'
})
```

마찬가지로 특정 라우터에 대해서 force-dynamic을 쓰면 특정 라우트의 캐싱을 무효화할 수 있다.

(예를 들어 API Route의 특정 경로에 force-dynamic을 걸어두면 매번 요청 때마다, 모든 데이터 요청을 캐싱하지 않게 된다.)


```ts
//api/active-user/route.ts

import { NextRequest, NextResponse } from 'next/server';

import analyticsDataClient from '@/utils/bigQueryClient';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const getQueryStringDate = req.nextUrl.searchParams.get('page');

  const report = async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      
    });
    return response;
  };

  try {
    const res = await report();
    return NextResponse.json(res, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(e, {
      status: 502,
    });
  }
}
```

Data Cache는 미들웨어에서는 사용할 수 없다. 미들웨어에서 수행되는 모든 것들은 기본적으로 캐시되지 않게 된다.!















