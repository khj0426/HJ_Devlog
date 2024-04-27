---
title: 'Next js app Route의 캐싱-RouterCache'
excerpt: '공식문서 공부'
date: '2024-04-28'
author: '김효중'
category: 'Next.js'
image: '/images/postImg/next13.png'
---

Next는 여러 캐싱 전략이 존재합니다. 공식문서에서 크게 4가지의 캐싱 전략을 소개하
고 있습니다.

Router Cache, Full Route Cache, Request Memorization, Date Cache이렇게 총 4가지
가 소개되어 있어요.

이 글에서는 Router Cache에 대해 다룰 것입니다.

기본적으로 Next는 비용을 줄이고 성능의 향상을 위해 가능한 모든 것을 캐싱하려 합
니다. 이것은 라우터가 정적으로 렌더링되고 데이터의 요청이 기본적으로 캐싱됩니다.

이 다이어그램은 기본적은 캐싱을 보여줍니다

![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fcaching-overview.png&w=1920&q=75)

캐싱 전략은 route가 정적 경로인지, 동적 경로인지에 따라 달라질 수 있으며, 요청이
최초의 요청인지 아니면 후속 요청인지에 따라서도 달라질 수 있습니다.

그림을 보면 크게 Client와 Server부분으로 나눠진 것을 볼 수 있습니다. Route Cache
는 다른 캐싱 전략과는 다르게 Client의 캐싱 전략으로 분류되어 있어요.

그림을 보면 클라이언트에서 RSC payload를 캐싱하는 것을 볼 수 있는데요, RSC
payload가 무엇인지부터 알아보겠습니다.

### RSC payload

RSC payload는 서버 컴포넌트가 클라이언트로 전달하는 JSON형식의 포맷입니다. 서버
컴포넌트가 생성한 여러 요소들을 직렬화해 클라이언트로 전송하는데, 이것을 RSC
payload라고 부릅니다.

RSC payload는 다음의 3가지를 포함합니다.

- 서버 컴포넌트의 결과물
- 클라이언트 컴포넌트가 렌더링 될 placeholder들
- 서버 컴포넌트 -> 클라이언트 컴포넌트로 전달되는 여러 props들

이 RSC payload는 또한 개념적으로 공부가 필요해 추후에 공부 후 글을 쓸 예정입니다
.😃

### Router Cache

![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Frouter-cache.png&w=1920&q=75)

이 Router Cache는 화면에서 navigation이 일어날 때 서버의 요청을 줄여주기 위해 사
용됩니다. 라우터 캐시는 클라이언트캐시 혹은 프리패치 캐시라고도 불립니다.

프리패치 캐싱은 미리 가져온 경로 부분을 의미하고 클라이언트 캐싱은 방문한 부분과
미리 가져온 부분을 모두 포함합니다.

Next의 Router Cache는 브라우저에 RSC Payload를 잠깐 저장하게 됩니다.

사용자가 router를 통해 페이지를 전환할 때마다, Next는 방문한 라우터의 세그먼트를
캐싱하고 사용자가 이동할 가능성이 있는 라우트(뷰포트 내의 Link컴포넌트)를 미리
가져옵니다.

이 RSC payload는 브라우저의 일시적인 메모리에 저장됩니다. 이 저장된 캐싱은 두 가
지 요인에 의해 얼마나 오래 캐시할 것인지 결정됩니다.

- 세션 : 캐싱은 화면 전환 시에도 쭉 유지됩니다. 그러나 페이지를 새로고침하면 사
  라집니다.

- 자동 무효 기간 : 특정 시간이 지난 후 자동으로 무효화됩니다. 그리고 이 특정 시
  간은 어떻게 자원이 프리패칭되었는지에 따라 달라집니다.

  - 💬 Default Prefetching : 정적인 라우터의 경우 모든 데이터를 포함한 라우트 전
    체가 프리패칭되어집니다. 반면 동적의 라우터는 loading.js경계가 있는 가장 가
    까운 부분의 라우터가 프리패칭되어집니다.이 Default Prefetching은
    prefetch={null}을 적어주거나 따로 명시하지 않은 경우를 의미합니다. Default
    Prefetching의 경우 30초 캐싱됩니다.

  - 💬 Full Prefetching : prefetch={true}를 사용하거나 router.prefetch를 사용한
    경우 5분여간 캐싱되어집니다.

요약하자면 Router Cache는 <b>이동하면서 저장된 모든 페이지에서 default
Prefetching의 경우 30초를, Full Prefetching의 경우 5분</b> 을 캐싱합니다.

### Router Cache를 무효화하는 방법

Router Cache를 무효화하는 방법은 크게 2가지가 존재합니다.

- 💬 서버 액션에서 revalidatePath나 revalidateTag를 사용하는 경우

- router.refresh를 통해 라우터 캐시를 무효화 하는 경우

```ts
const router = useRouter();

//서버 액션에서 revalidatePath를 통해 무효화 하는 경우

const revalidatePath = '/api/data';
router.revalidate(revalidatePath);

//revalidateTag를 통해 무효화 하는 경우

const revalidateTag = 'data-tag';
router.revalidate({ tag: revalidateTag });

//router.refresh를 통해 라우터 캐시 무효화
router.refresh();
```

### 사용 예시

그럼 이 router Cache를 사용해보는 예제를 살펴보겠습니다.

```tsx
//api/getTime/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({ timestamp: new Date().getTime() });
}

//app/Component/FormClient.tsx

('use client');
import { useState, useEffect } from 'react';
export default function FromClient() {
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('http://localhost:3000/api/getTime', {
        cache: 'no-store', // fetch에 대한 설명은 2편에서 보고, 일단은 넘어가자.
      });
      const { timestamp } = await data.json();
      setTimestamp(timestamp);
    };
    getData();
  }, []);

  return <div>{timestamp}</div>;
}

//app/Component/FormServer.tsx

export default async function FromServer() {
  const data = await fetch('http://localhost:3000/api/getTime', {
    cache: 'no-store',
  });
  const { timestamp } = await data.json();
  return <div>{timestamp}</div>;
}

//app/example/page.tsx

import Link from 'next/link';

import FromClient from '@/Component/FormClient';
import FromServer from '@/Component/FormServer';

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
      }}
    >
      <div>
        From Client: <FromClient />
      </div>

      <br />
      <div>
        From Server: <FromServer />
      </div>
      <div>this is home page</div>
      <Link href="/">go to root page</Link>
    </main>
  );
}
```

example페이지에서 링크 컴포넌트로 /로 이동했다가 다시 뒤로 이동합니다. 클라이언
트의 시간은 바뀌지만, 서버 컴포넌트의 시간은 그대로입니다.

![](/images/postImg/Next13_Example_FormServer.png)

바로 이 서버 컴포넌트의 페이로드를 캐싱해서 서버 컴포넌트의 시간이 그대로있는 것
을 볼 수 있습니다.
