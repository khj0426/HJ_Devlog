---
title: 'react-query의 Stale vs Cache 상태'
excerpt: '둘의 차이점이 무엇일까'
date: '2024-03-09'
author: '김효중'
category: 'react-query'
image: '/images/postImg/react-query.png'
---

![](/images/postImg/react-query.png)

react-query를 쓰면서 stale와 cache가 뭐지?하는 순간이 많았다. 둘의 차이를 명확히 알아보려고 한다.

먼저 react-query장점은 서버로부터 불러온 데이터를 <mark>적절한 캐싱 전략을 통해 불필요한 네트워크 호출을 줄여줄 수 있다</mark>는 점이다. react-query는 설정한 cacheTime(기본값 5분)만큼 데이터를 메모리에 저장해 놓는다. 

그럼 이 메모리는 어떤 것일까? QueryCache를 쓴다고 한다. (보통 이 QueryCache를 직접 접근하지 않고 QueryClient를 사용한다.)

```ts
import {QueryCache} from '@tanstack/react-query'

const queryCache = new QueryCache({
    onError:(error) => {

    },
    onSuccess:(data) => {

    }
})

//queryClient의 구조체 일부

export class QueryClient {
    #queryCache : QueryCache
    ...

    constructor (config : QueryClientConfig = {}) {
        this.#queryCache = config.queryCache ?? new QueryCache()
    }
}
```

그럼 이 QueryCache는 실제 무엇이 저장되는 걸까? 코드를 살펴보면 다음과 같이 구성되어 있고, Query를 관리하는 역할을 하는 것이 QueryCache같이 보인다. 

```ts
//QueryCache
export class QueryCache extends Subscribable<QueryCacheListener> {
    #queries : QueryStore

    constructor(public config:QueryCacheConfig = {}){
        super()
        this.#queries = new Map<string,Query>()
    }
    
    build(client:QueryClient,options,state:QueryState) {
        const queryKey = options.queryKey
        const queryHash = options.queryHash
        let query = this.get(queryHash)

        if(!query){
            query = new Query({
                cache:this,
                queryKey,
                queryHash,
                options:client.defaultQueryOptions(options)
                state,
            })
            this.add(query)
        }
    }
}

```
QueryCache의 객체를 살펴보면 아래와 같다.

- 쿼리들은 해시키를 바탕으로 Map형태로 관리한다.
- 이미 쿼리가 있는 경우 해당 쿼리를 queries에서 찾아서 가져온다.
- 쿼리가 없는 경우 새로운 쿼리를 만든다.

그럼 쿼리의 캐시가 존재하면 데이터를 다시 가져오지 않는걸까? 근본적으로 그럼 react-query를 쓸 때 어느 시점에 데이터를 가져오는걸까?

### 비동기 상태 

![](https://tkdodo.eu/blog/images/thinking-in-react-query/38.png)

리액트 쿼리가 다루는 상태는 일반적으로 쓰는 useState와 같은 상태와는 결이 다르다고 할 수 있다. 리액트 쿼리는 주로 비동기 데이터, 서버나 API로 받아온 데이터를 캐싱, 동기화 하는데 초점을 둔다. (당장 useQuery의 반환 값도 Promise이다.)

리액트 쿼리는 비동기 업데이트 작업을 다음의 특정 시점에서 수행한다.

- QueryKey가 수정되었을 경우
- 네트워크 연결이 다시 이뤄진 경우
- 컴포넌트의 마운트
- window의 포커스가 간 경우

다만 이 모든 작업은 오로지 <mark>stale한 Query</mark>에 대해서만 이루어진다. 다시 데이터를 패치할지 말지는 오로지 이 stale에 대해서만 의존적이다.

결국 캐싱이 있더라도, stale에 따라서, 다시 데이터 패칭을 할지 말지가 결정된다.

그럼 이 stale한 Query가 대체 무엇일까 ?

### Stale

Stale의 뜻을 찾아보면 말라비틀어진, 탁한 이라는 뜻이 나온다.

![](https://mblogthumb-phinf.pstatic.net/MjAyMzA1MTZfMTg1/MDAxNjg0MjQ2MDQwNTc3.31cJHOo-vXV3Ae5YLsxZppP2r0L7xfV9j9gHTO3lBdYg.-4gET9tWK_3Q-lqZGCCZltRRGvxYNPGvR1hJYAfFkQUg.PNG.tikateachesenglish/image.png?type=w800)

staleTime으로 설정한 시간만큼(기본값인 0초이다) 데이터가 fresh상태로 있다가 이후 stale의 상태로 바뀌게 된다. 예를 들어 다음과 같이 staleTime을 설정한다면 600,000밀리초 (10분)동안 fresh 상태이고 그 이후 stale 상태로 바뀐다.

그리고 이 stale 상태이고 위에서 언급한 경우(컴포넌트가 마운트 된 경우)에 한해서 다시 데이터 패칭이 일어난다.

```ts
import { useQuery } from '@tanstack/react-query';

import { getSearchQueryPostList } from '@/services/Post';

export default function useSearchPostQuery(searchPostQuery: string) {
  return useQuery({
    queryKey: ['searchPostQuery', searchPostQuery],
    queryFn: () => getSearchQueryPostList(searchPostQuery),
    staleTime: 60 * 10 * 1000,
    cacheTime: 60 * 10 * 1000,
  });
}
```

결국 staleTime을 어떻게 사용하는지가 제일 중요한 부분인 것 같다. 

만약 staleTime이 0이라면, 항상 최신의 데이터나 빠르게 변하는 데이터에서 유용할 것이고, Infinity라면 서버가 재시작할때만 변화하는 것이 필요할 때 적절할 것이다.

### Cache

이번에는 그럼 Cache에 대해 알아보자. 앞서 QueryCache가 Query라는 객체를 사용하는 것을 볼 수 있다. 그럼 이 Query라는 객체에 대해 더 살펴보자. 그리고 이 Query에 Cache가 어떻게 들어가 있는지도 알아보자!

```ts
//Query.ts
export class Query {
    #cache : QueryCache
    ...

    constructor(config:QueryConfig) {
        super()
        this.#setOptions(config.options)
        this.#cache = config.cache
        this.scheduleGC()
    }

    #setOptions(
    options?: QueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  ): void {
    this.options = { ...this.#defaultOptions, ...options }
    //options의 GCTime으로 갱신
    this.updateGcTime(this.options.gcTime)
  }
}
```

그리고 이 GCTime을 갱신하고 수정하는 클래스는 removable에 정의되어 있다.

```ts
//removable.ts
import { isServer, isValidTimeout } from './utils'

export abstract class Removable {
  //설정한 gc시간 -> 가비지 컽렉션을 실행할 시간
  gcTime!: number
  #gcTimeout?: ReturnType<typeof setTimeout>

  destroy(): void {
    this.clearGcTimeout()
  }

  //가비지 컬렉션을 예약한다.
  protected scheduleGc(): void {
    //기존의 gcTimeout이 있다면 클리어를 먼저 해준다.
    this.clearGcTimeout()

    //올바른 gc시간이 오면 새로운 가비지컬렉션을 설정한 gcTime으로 예약해둔다.
    if (isValidTimeout(this.gcTime)) {
      this.#gcTimeout = setTimeout(() => {
        this.optionalRemove()
      }, this.gcTime)
    }
  }

  protected updateGcTime(newGcTime: number | undefined): void {
    // Default to 5 minutes (Infinity for server-side) if no gcTime is set
    //newGCTime이 undefined라면 기본값으로 5분이 설정된다.
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (isServer ? Infinity : 5 * 60 * 1000),
    )
  }

  protected clearGcTimeout() {
    if (this.#gcTimeout) {
      clearTimeout(this.#gcTimeout)
      this.#gcTimeout = undefined
    }
  }

  protected abstract optionalRemove(): void
}
```
cache를 종합해보면 다음과 같다. 먼저 queryClient에서 QueryCache를 관리한다. QueryCache는 Query객체를 관리하는데, 이 Query객체의 옵션으로서 캐시를 설정할 수 있고, 이 캐시를 실제 가비지 컬렉션에서 제거, 업데이트, 예약하는 모든 과정은 Removable이라는 추상클래스에서 담당하는 구조로 이루어져 있다.

보통 <mark>cacheTime</mark>을 옵션으로서 정해주는데, 이것은 비활성화된 쿼리가 <mark>캐시에서 제거될떄까지</mark>의 시간을 의미한다.

즉, 특정 쿼리를 사용하는 모든 컴포넌트의 언마운트 시점에서 이 쿼리는 비활성화된 쿼리가 된다. 결국 cacheTime은 쿼리가 활성화 되어 있으면 아무역할을 하지 않는다.

