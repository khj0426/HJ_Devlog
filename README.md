## ⭐Hj_Devlog

블로그를 만들게 된 계기는 기존의 블로그 템플릿에서 벗어나, 저만의 독창적인 블로그를 만들고 싶어서 입니다.

자세한 링크는 하단의 글에서 볼 수 있어요!@

https://hj-devlog.vercel.app/blog/Next%20js%20app%20route%EB%A1%9C%20%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%A7%8C%EB%93%A4%EA%B8%B0

<hr />

Next js 13버전을 사용하면서 기존 마크다운을 파싱해서 만든 블로그와 유사하게 만들었습니다.

Next js 13에서 추구하는 `서버컴포넌트`, `클라이언트 컴포넌트`의 명확한 분리가 제일 마음에 들었습니다.

뿐만 아니라 `정적,동적인 MetaData`나 `사이트맵`을 정말 간단히 만들 수 있는 부분도 마음에 들었습니다.

- https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

<hr />

### 랜더링 방식의 고민

처음 블로그를 만들었을떄, 모든 블로그의 대한 정적인 자원들을 모두 불러오는 식으로 화면을 처음에 그렸습니다.

다만 초기 페이지 로드 시 `블로그 대표 이미지`의 경우 현재 뷰포트에 있는 이미지가아니더라도 `모든 이미지`가 불러오는 것을 볼 수 있었습니다.

![image](https://github.com/khj0426/HJ_Devlog/assets/59411107/cd09799d-14d2-483b-8734-7baa09c9a1f1)

위의 이미지의 경우 현재 `화면에 없는 이미지`임에도 불구하고 초기에 받아오는 것을 확인할 수 있었습니다.

지금의 경우 블로그 글이 얼마 없고, 이미지도 많이 존재하지 않지만, 글이 많아지고 이미지가 많아졌을떄, 이러한 방식은 한계가 있을 것 같았습니다.

<hr />

### 했던 고민들

위의 경우 `Image priority 프로퍼티`로 `이미지 간 우선순위`를 줄 수 있지 않을까?라고 생각하였습니다.

그러나 `전체 블로그 이미지 중 몇 개만 선별`해서 priority속성을 주기엔 명확한 일관성이 없어지지 않을까..라고 생각했습니다.

아직도 명확하게 해답을 찾지 못하였지만, 다음의 방법을 사용하였습니다.

```
처음 5개의 블로그 글만 가져와서 랜더링을 합니다.
그 이후 추가적인 블로그 글은 버튼을 누를떄 클라이언트 요청에 의해 받아오고 갱신합니다.
```

초기 불러온 블로그 글을 `app/page.tsx`에서 랜더링하고, `클라이언트 요청`에 의해 랜더링되는 글들은 `클라이언트 컴포넌트 PostList.tsx`로 따로 분리해 처리했습니다.

저는 `클라이언트의 요청`에 대응하는 API를 정말 간단하게 `API ROUTES`로 만들 수 있었습니다.

- https://nextjs.org/docs/pages/building-your-application/routing/api-routes

<hr />

그리고 다음과 같이 요청이 들어올떄, 전체 블로그의 리스트에서 다음과 같이 반환하도록 하였습니다.

```
http://localhost:3000/api/posts?start=1&end=5
```

![image](https://github.com/khj0426/HJ_Devlog/assets/59411107/463802b4-d9db-4b35-9be0-22d12759f4c9)

이를 통해 `버튼을 누르면` `클라이언트 요청에 의해` 추가적인 블로그 글이 불러와지고 `이미지`도 이때 불러올 수 있도록 설정하였습니다.

그리고 `커스텀 훅`으로 `API호출로직`을 분리하였습니다

<hr />

### 구현한 목록들

- 여러 공통 컴포넌트(스켈레톤,Drawer,페이지네이션,스피너,ScrollToTop,토스트 등) 구현 및 CI단에서 문서화
  [스토리북주소](https://65957ec0c4b6100ce2f96f92-lctdejunii.chromatic.com/?path=/docs/configure-your-project--docs)
- Next의 Loading.tsx을 이용한 선언적 로딩 처리
- 방명록, 블로그 글에 대해 useInfinityQuery훅을 이용한 무한스크롤 구현
- 블로그 글에 대한 TOC(Table Of Content)를 Intersection Observer를 이용해 구현
- 블로그 글 검색 기능
- 이미지에 대해 Blur처리를 하는 유틸 함수를 `sharp` 패키지를 이용해 구현
- `쿼리 키 관리`를 위해 `쿼리 키,옵션`을 관리하는 상수 별도로 분리
- `Prefetch Infinity Query` + `Hydration`을 이용한 SSR도입
