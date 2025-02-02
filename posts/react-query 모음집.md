---
title: "react-query 모음집"
excerpt: "react-query를 더 잘 써보자"
date: "2025-02-02"
author: "김효중"
category: "react-query"
image: "/images/postImg/react-query.png"
---

### staleTime 잘 쓰기

리액트 쿼리의 useQuery옵션에는 staleTime이 존재한다. staleTime은 얼마의 시간이 흐른 뒤에 데이터를 stale하다고 취급할 것인지를 지정한다.

stleTime은 <b>신선하지 않은 데이터</b>를 의미한다. 비유를 하면, 유통기한이 지난 오래된 식빵..?과 비슷할 것 같다.

즉, 데이터를 허용하는 최대 시간이라고도 볼 수 있을 것 같다. 데이터가 만료되었다고 판단하기 전까지 허용하는 시간이 staleTime이다.

"내 웹사이트에 표시된 데이터가 10초까지는 그대로여도 상관없어" 라고 판단하면, staleTime을 10초로 설정하고, 5분까지는 내 웹에 표시된 데이터가 그대로여도 괜찮은데..? 라고 판단하면 이 staleTime을 5분으로 설정한다.

그 이후 staleTime이 지난 다음은, 데이터 리패칭이 발생한다. 데이터 리패칭은 staleTime이 지난, 만료된 데이터에서만 진행한다.

이 떄 주의할 점으로는 , staleTime의 기본 값이 0이기 떄문에 서버에서 받아오는 즉시 staleTime하다고 판단해서, 캐싱 데이터와 무관하게 계속 fetching 수행합니다.

[리패칭이 발생하는 조건]

- 네트워크가 다시 연결될 때 (refetchOnReconnect)
- 브라우저 화면을 이탈했다가 다시 Focus 할 때 (refetchOnWindowFocus)
- 쿼리가 다시 마운트 될 때(refetchOnMout)

서비스 내에서 항상 동일한 상태를 유지하는 정적인 데이터들은 실시간성이 중요하지 않을 수 있다. 수시로 refetch를 해 줄 필요 없고, 이 경우는 staleTime은 Infinity로 지정할 수 있다.

[만약 staleTime을 Infinity로 지정했지만, gcTime을 따로 조정하지 않으면? ]

gcTime은 inactive인 상태로 메모리에 남아있는 시간이다. 기본값은 5분이며, inactive인 상태로 cacheTime이 지나면, 가비지 콜렉터에 의해 제거된다.

staleTime을 Infinity로 지정해도, gcTime을 별도로 설정하지 않으면, 기본인 5분이 지났을 때 메모리에서 제거되어, 다시 데이터를 fetch하게 된다. 이러면 결국 staleTime을 무한으로 지정한 의미가 없어지기 때문에, cacheTime도 무한으로 지정하는 것이 좋다.

### invalidateQueries와 쿼리무효화

Post,Put,Delete와 같이 데이터를 변화시키는 요청은 useMutation훅을 사용한다. 이렇게 데이터를 업데이트 한 이후, 갱신된 데이터를 다시 불러올 필요가 있다.

이럴 떄 주로 invalideQueries를 사용한다.

invalideQueries는 캐싱된 쿼리를 무효화하는 메서드이다. 기본적으로 쿼리키와 일치하는 모든 쿼리를 즉시 유효하지 않은 것으로 판단한다.

만약 쿼리 키가 ["events"]로 지정되어있는, 모든 쿼리가 무효화되면 , 해당 쿼리 키를 사용해 데이터를 가져온 모든 컴포넌트가 영향을 받는다.

쿼리 키는 배열이며, 배열의 첫번째 요소는 일반적으로 엔티티의 이름이고, 추가요소는 해당 데이터를 가져오기 위한 조건이나 식별값이다.

```tsx
const queryClient = useQueryClient();

queryClient.invalidateQueries({
  queryKey: ["todos"],
});
```

invalidQueries함수에는 exact옵션이 있다. 쿼리 키가 정확히 일치하느 경우에만 쿼리를 무효화시킬 수 있다.

예를 들어, exact : true를 설정하면 ["events"]라는 쿼리 키를 가진 쿼리만 무효화된다.

보통 뮤테이션이 성공했다면, 쿼리에 영향을 줄 가능성이 높다. 그러나 , 하나의 뮤테이션에 여러 쿼리를 무효화시키는 상황이 오면, 다음과 같은 코드들이 많아진다.

```tsx
const { mutate } = useMutation({
  mutationFn: redeemVoucher,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: "voucher" });
    queryClient.invalidateQueries({ queryKey: "referralHistory" });
    queryClient.invalidateQueries({ queryKey: "referralVoucher" });
  },
});
```

이를 해결하기 위해 쿼리 자동 무효화를 도입할 수 있다.

무효화를 자동화하기 위해서는 MutationCache를 확장해, 뮤테이션 성공 시 자동으로 쿼리를 무효화시키는 기능을 추가한다.

모든 쿼리를 무효화시키는 방법은 아래와 같다. 단, 전역으로 모든 쿼리를 뮤테이션 성공 시, 무효화시키기 때문에 불필요한 리패치가 발생할 수 있다.

```tsx
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: () => queryClient.invalidateQueries(),
    onError,
    onSettled,
  }),
});
```

### MutationKey

모든 쿼리가 아닌, 특정 쿼리만 무효화시키려면 어떻게 해야할까? 이 떄 mutatioKey를 이용할 수 있다.
뮤테이션 성공 시 , onSuccess 콜백에서 mutatioKey를 통해 쿼리를 무효화할 수 있다.

```tsx
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: mutation.options.mutationKey,
      });
    },
  }),
});
```

이렇게 하면 mutationKey를 통해 뮤테이션들을 식별한다. 뮤테이션 성공 시 mutation.options.mutationKey를 통해 쿼리 키와 일치하는 쿼리를 무효화시킨다. 만약 뮤테이션 키가 없다면, 모든 쿼리를 무효화한다. 그러나 모든 쿼리가 무효화 될 필요 없다면?

이 때 meta옵션을 사용할 수 있다.

```tsx
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          // 일치하는 모든 태그를 한 번에 무효화, 그 외에는 무효화 X
          mutation.meta?.invalidates?.some((queryKey) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            matchQuery({ queryKey }, query)
          ) ?? false,
      });
    },
  }),
});

//사용처
export function usePatchTeacherModal() {
  return useMutation({
    mutationFn: patchTeacherModal,
    meta: {
      invalidates: [["teachers"]],
    },
  });
}
```

기존의 콜백에서 쿼리 무효화 메서드를 실행하는 것이 아니라, 일관된 방식으로 쿼리 무효화를 구현할 수 있어서 좋은 것 같다.
