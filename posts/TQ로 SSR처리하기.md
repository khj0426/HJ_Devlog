---
title: 'TQ로 SSR처리하기'
excerpt: 'SSR을 TanstackQuery로 처리하기'
date: '2024-07-04'
author: '김효중'
category: 'react-query'
image: '/images/postImg/react-query.png'
---

공식문서에서, 서버에서 데이터를 프리패칭하고 queryClient에 제공하는 방법은 2가지
가 존재한다.

- initalData를 사용하는 방법
- Hydration을 사용하는 방법

먼저 initalData를 사용하는 방법에 대해 알아보자. 쿼리에 initalData를 주입하는 방
법은 query옵션에 직접 주입하는 방법과, queryClient의 prefetchQuery,setQueryData
메서드를 사용하는 방법이 있다.

### initalData_placeholderData

config.initalData옵션으로 쿼리의 초기 데이터를 설정할 수 있다. 다만 initalData는
캐시에 남는다. 캐시 레벨에서 동작하고, 오직 하나만 존재할 수 있다. 만약
placeholder를 제공하고 싶다면, placeholderData를 사용한다.

```ts
function Component() {
  //둘다 status는 success가 되어 있음.
  const { data, status } = useQuery({
    queryKey: ['number'],
    queryFn: fetchNumber,
    placeholderData: 23,
  });

  const { data, status } = useQuery({
    queryKey: ['number'],
    queryFn: fetchNumber,
    initalData: () => 42,
  });
}
```

### cacheLevel_ObserverLevel

둘의 가장 큰 차이는 캐시에 들어가냐? 아니냐? 의 차이이다. initalData의 경우에는
캐시 객체를 만들 때 직접 옵션으로 넣어둔 것을 사용하는 것을 볼 수 있다.

```ts
//export class Query...

this.#initialState = config.state || getDefaultState(this.options);
```

이 캐시 객체는 각 쿼리 키에 대해 존재한다.

이 쿼리 키로 애플리케이션에서 전역적으로 동일한 데이터를 관리하게 도와주고, 쿼리
키당 하나의 엔트리만 존재하기 떄문에, staleTime, cacheTime에 따라 stale, GC에 의
해 수거되는 시간을 알 수 있다.

반면 Observer level같은 경우 하나의 쿼리 레벨에 생성된 구독을 의미한다. 캐시 레
벨단에서의 변경 사항을 확인하고, 변경사항이 있다면 알림을 받는다 (이 역할을
notifymanager가 한다.!)

이 observer는 useQuery훅을 호출할 떄마다 생긴다. 즉 동일한 캐시를 바라보는 여러
옵저버가 존재할 수 있다.

<b>initalData는 cache Level에서, placeholderData는 Observer Level에서 돌아간다
!</b>

### 초기설정

먼저 QueryClient를 선언해주어야 한다. Providers폴더에 Query부분에서
queryClient.tsx를 만들었다.

```tsx
// Provider.tsx

'use client';

import React from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          staleTime: Infinity,
          suspense: true,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Providers;
```

그리고 이 queryClient를 단 한번만 생성하고, 다시 사용하기 위해 싱글톤 형태로
queryClient를 만들어준다.

왜 싱글톤 형식으로 만들어야만 할까!

사용자별로, 다른 분리된 상태를 유지하고, 요청당 하나의 QueryClient를 유지하기 위
해서이다.

```ts
// app/getQueryClient.jsx

import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

const getQueryClient = cache(() => new QueryClient({}));
export default getQueryClient;
```

이렇게 하고 App Router의 layout파일에서 선언한 Providers로 감싸주면 모든 준비가
끝난다.

### initalData

tanstack-query는 SSG와 SSR모두에서 pre-rendering을 제공한다.

기본적으로, initalData는 staleTime의 영향을 받는다. 만약 initalData를 넣어두고,
staleTime을 0으로 잡아두면 (기본값으로), 마운트 되자마자 리패칭을 한다.

```tsx
//즉시 초기 데이터가 보여지지만,
// 컴포넌트가 마운트 되면 다시 가져옴

const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initalData: initalTodos,
});
```

만약 이번에는 staleTime을 1000으로 두면, 1초 동안 이 데이터는 신선한 상태가 되고
, 1초동안은 다시 데이터를 패칭하지 않는다. 만약 1초가 지나면 stale 상태로 간주되
어, 필요 시 다시 패칭된다.

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initalData: initalTodos,
  staleTime: 1000,
});
```

app router에서 initalData를 사용하는 방법은 서버 컴포넌트에서 데이터를 프리패칭
하고 클라이언트 컴포넌트에 initalData를 props로 전달하는 것이다.

이 방법은 빠르게 설정할 수 있고, 필요에 따라 initalData의 props Drilling이 발생
할 수 있다.

```tsx
// app/page.jsx
export default async function Home() {
  const initialData = await getPosts();

  return <Posts posts={initialData} />;
}

// app/posts.jsx
('use client');

import { useQuery } from '@tanstack/react-query';

export function Posts(props) {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: props.posts,
  });
  // ...
}
```

### Hydration,Dehydrate

서버에서 데이터를 호출하고 , 클라이언트에 보낼 때 hydration하는 것이다. 그럼
dehydrate와 hydration을 살펴보자.

dehydrate : 서버에서 클라이언트로 전송할 수 있는 형태로 만들기 위해 사용된다. 서
버에서 데이터를 가져오고 이 데이터를 직렬화 해 클라이언트로 전송한다. 직렬화된
데이터는 <b>DehydratedState</b>로 표현되고 hydrate함수를 통해 다시 변환된다.

요기서 직렬화 할 수 없는 것들(함수 등)이 포함되면 serialization에러가 발생한다.

hydrate : 클라이언트에서 직렬화된 상태를 받아서, 서버에서 미리 받은 데이터를 클
라이언트의 쿼리 캐시에 적용해준다.

```ts
//query-core/hydration.ts

export function hydrate(
  client: QueryClient,
  dehydratedState: unknown,
  options?: HydrateOptions,
): void {
  //직렬화된 상태 검사 -> 객체인지 아닌지의 검사
  if (typeof dehydratedState !== 'object' || dehydratedState === null) {
    return
  }

  const mutationCache = client.getMutationCache()
  //쿼리 캐시를 가져온다.

  const queryCache = client.getQueryCache()

  //데이터를 역직렬화해주는 함수
  //서버 -> 클라로의 직렬화
  //클라에서의 역직렬화

  //queryClient으로부터 가져온다.

  const deserializeData =
    options?.defaultOptions?.deserializeData ??
    client.getDefaultOptions().hydrate?.deserializeData ??
    defaultTransformerFn


  //dehydratedState으로부터 mutation,query들을 모두 추출

  const mutations = (dehydratedState as DehydratedState).mutations || []
  const queries = (dehydratedState as DehydratedState).queries || []

  //state.data를 역직렬화해서 쿼리의 data에 넣어준다.

  queries.forEach(({ queryKey, state, queryHash, meta, promise }) => {
    let query = queryCache.get(queryHash)

    const data =
      state.data === undefined ? state.data : deserializeData(state.data)

    // Do not hydrate if an existing query exists with newer data
    if (query) {
      if (query.state.dataUpdatedAt < state.dataUpdatedAt) {
        // omit fetchStatus from dehydrated state
        // so that query stays in its current fetchStatus
        const { fetchStatus: _ignored, ...serializedState } = state
        query.setState({
          ...serializedState,
          data,
        })
      }
    }
    //..실패했을 떄의 처리
}
```

### 사용해볼까?

- 먼저 queryClient를 만든다.
- 미리 가져오고 싶은 쿼리에 대해 queryClient.prefetchQuery를 실행한다.
- 이제 dehydrate(queryClient)를 반환한다.
- HydrationBoundary state로 트리를 감싸준다.

먼저 queryClient를 만들고 13버전이기 때문에, layout.tsx에서 queryClient를 감싸주
자!

```tsx
// Provider.tsx

'use client';

import React from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          staleTime: Infinity,
          suspense: true,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Providers;
```

이제 queryClient를 싱글톤 형식으로 관리하기 위해 getQueryClient라는 함수를 만들
고 queryClient를 한번만 실행되게 만들었다(물론 상황에 따라 queryClient를 여러개
놓고? 관리할 수도 있지 않을까..?)

```tsx
//getQueryClient
import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

const getQueryClient = cache(() => new QueryClient({}));
export default getQueryClient;
```

이제 저 getQueryClient로 queryClient를 가져오고, prefetchQuery를 통해 데이터를
미리 가져와보자!!

```ts
import { dehydrate } from '@tanstack/react-query';

import CategoryList from '@/Component/CategoryList/CategoryList';
import Hydrate from '@/Component/Common/Hydrate';
import PostContainer from '@/Component/Post/PostContainer';
import { postQueryKey } from '@/hooks/queries/queryKey';
import { getPosts } from '@/services/Post';
import getQueryClient from '@/utils/getQueryClient';
import { getAllCategories } from '~/lib/api';

export default async function Home() {
  const queryClient = getQueryClient();

  //서버에서 미리 데이터를 가져오고 이를 queryClient에 전달해두자!
  await queryClient.prefetchInfiniteQuery({
    queryKey: postQueryKey.all,
    queryFn: () => getPosts({ pageParams: 0 }),
  });
  const dehydratePostState = dehydrate(queryClient, {
    shouldDehydrateQuery: () => true,
  });
  const allCategory = getAllCategories();

  return (
    <>
      <CategoryList category={allCategory}></CategoryList>
      <main>
        <Hydrate state={dehydratePostState}>
          <PostContainer />
        </Hydrate>
      </main>
    </>
  );
}
```

나는 블로그 목록에 대해 prefetchQuery를 적용했다. 그럼 실제로 어떻게 불러오는지
확인해보자!

![](/images/postImg/SSR_.mp4)

잘 동작하는 것을 볼 수 있다!
