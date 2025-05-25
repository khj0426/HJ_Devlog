---
title: "Hydration에러 선언적으로 해결하기"
excerpt: "선언적으로 Hydration해결하기"
date: "2025-05-25"
author: "김효중"
category: "Next.js"
image: "/images/postImg/next13.png"
---

Next로 개발을 하다보면, 다음의 오류 문구를 개발도중에 많이 볼 수 있어요.

서버에서의 렌더링 결과물과 클라이언트에서의 렌더링 결과물이 일치하지 않아서 위의 오류가 발생하는데요.

하이드레이션이란 간단하게 설명하면 "이벤트 핸들러 함수들" 을 정적인 DOM 노드들에 붙여서 동적으로 상호작용이 가능하도록 바꾸어주는 기능입니다.

서버는 클라이언트가 아닙니다. 다른 시간대나, 날짜, 브라우저에서만 사용할 수 있는 API의 경우 하이드레이션 오류를 충분히 유발할 수 있습니다.

```tsx
function LastUpdated() {
  const date = getLastUpdated();
  return <span>Last updated at: {date.toLocaleDateString()}</span>;
}
```

위 코드를 보겠습니다. 서버와 클라이언트 간의 locale이 다른 경우, 날짜가 한쪽에서는 "21/02/2024"로, 다른 쪽에서는 "2/21/2024"로 렌더링될 수 있습니다.

(**코드가 실행되는 환경의 locale에 따라 달라짐)**

이러한 불일치가 발생하면, React는 사용자에게 [최상의 사용자 경험을](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html) 제공하기 위해 서버 렌더링 결과와 클라이언트 렌더링 결과가 정확히 일치해야 하므로, 사용자에게 경고합니다.

하지만 앞서 살펴본 date.toLocaleDateString같은 API를 사용하는 경우, 이러한 불일치는 필연적입니다.

그럼 어떻게 해결할 수 있을까요?

첫번째 방법으로는 **suppressHydrationWarning**을 단순히 태그에 넣어주는 방법이 있습니다.

그러나 공식문서에 따르면, 해당 속성을 남용하지 말라고 되어있습니다.

```tsx
function UsingSurpressWarning() {
  const [state] = useState(() => (isServer() ? "server" : "client"));
  return <div suppressHydrationWarning={true}>{state}</div>;
}
// 서버에서는 'server'가 내려오고 클라이언트는 'client'를 랜더링하려 하여
// hydration mismatch가 일어나지만 suppressHydrationWarning flag라 그 내용을 무시한다.
```

그러나 해당 속성을 사용하는 것도 문제가 있습니다.

중첩된 dom 구조에 `suppressHydrationWarning`을 적용한다면 **여전히 hydration mismatch 에러가 발생해요.**

```tsx
<div suppressHydrationWarning={true}>
  <div>{state}</div>
  // suppressHydrationWarning이 적용되었지만 hydartion 에러 발생
</div>
```

클라이언트/서버인지 컴포넌트단에서 판별하는 방법

```tsx
function LastUpdated() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const date = getLastUpdated();
  return <span>Last updated at: {date.toLocaleDateString()}</span>;
}
```

위의 코드 같이, 컴포넌트에서 클라이언트 사이드에서 렌더링되는지를 판별하는 상태를 하나 만들고 사용할 수 있어요. 다만 이렇게 했을 때 발생하는 문제점은

- 클라이언트/서버 렌더링 판별하는 로직이 컴포넌트 단에 위치해 있는 것이 바람직한가?
- (아래 이미지의 시간 부분) 아주 작은 짧은 시간 동안, 깜빡이면서 내용이 바뀌는 문제가 있어요.

### **useSyncExternalStore훅을 통해 해결해보자!**

이 훅의 주요 용도는 리액트 내부적인 store(props, context API, useState, useReducer)를 사용하지 않는 외부 저장소를 구독하는 것이지만, Hydration 에러를 야무지게 해결하는 용도로도 사용할 수 있습니다.

이 훅의 숨겨진 **또 다른** **강점은** **CSR에서 마운트되었는지 SSR+Hydration에서 마운트 되었는지 구분할 수 있다는 것인데요. 기본적인 훅의 구성은 아래와 같습니다.**

```tsx
const snapshot = useSyncExternalStore(
  subscribe,
  getSnapshot,
  getServerSnapshot
);
```

- subscribe : 외부 저장소의 변화를 구독합니다. 리스너 함수를 인자로 받아, 상태가 바뀔 때마다 리스너를 호출해요.
- getSnapshot : 외부 저장소에 저장된 상태의 값을 반환하는 함수입니다.
- getServerShapshot : 외부 저장소에 있는 상태의 초기값을 반환하는 함수입니다. 이 함수는 서버 렌더링 중에만 사용되고, 클라이언트에서 서버 렌더링된 콘텐츠를 하이드레이션할 때 사용됩니다. 보통 직렬화되어 서버에서 클라이언트로 전달됩니다.

해당 훅을 이용해 ClientGate라는 컴포넌트를 만들었어요.

`ClientGate` 컴포넌트는 실제 외부 스토어를 구독하는 것이 목적이 아니므로, 여기서는 아무것도 하지 않는 빈 함수 `() => () => {}`를 넘겨줍니다.

\***\*클라이언트 환경에서는 `useSyncExternalStore`가 이 함수의 반환값인 `false`를 `isServer` 변수에 할당하게 됩니다. 하이드레이션이 끝난 후에도 이 값은 `false`로 유지됩니다**.\*\*

서버 렌더링 시에는 이 함수의 반환값인 `true`가 `isServer` 변수에 할당됩니다.

클라이언트에서 하이드레이션을 시작할 때도 초기에는 이 값이 사용됩니다. \*\*\*\*

```tsx
"use client";

import React from "react";

function ClientGate({ children }) {
  const isServer = React.useSyncExternalStore(
    () => () => {},
    () => false, //hydration이 끝나고 false값
    () => true //서버 스냅샷 함수. 서버+하이드레이션과정에서도 true값
  );
  //오직 클라이언트 환경에서만 children반환
  return isServer ? null : children;
}

function App() {
  return (
    <main>
      Hello Server
      <ClientGate>
        <p>{Date.now()}</p>
      </ClientGate>
    </main>
  );
}

export default App;
```

```tsx
//layout.tsx
import { Gothic_A1 } from "next/font/google";
import "./globals.css";
import "./styles/style.css";
import { stack } from "../../styled-system/patterns/stack.mjs";
import React from "react";

const inter = Gothic_A1({ subsets: ["latin"], weight: "800", display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={stack({ gap: "6", padding: "4" })}>
          {`${Date.now()}`}
          {children}
        </main>
      </body>
    </html>
  );
}

//page.tsx (ClientGate로 래핑 X) -> 하이드레이션 오류
("use client");

export default function Page() {
  return <div>{Date.now()}</div>;
}

import { ClientGate } from "@/components/ClientGate";

export default function Page() {
  return (
    <div>
      <ClientGate>{Date.now()}</ClientGate>
    </div>
  );
}
```

![image.png](attachment:26540bf5-5739-4149-93d9-29021aea99e7:image.png)

참고한 글

https://medium.com/hal-ang/react-18-storage%EB%A5%BC-%EC%83%81%ED%83%9C%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-usesyncexternalstore-181e6d5778d3

https://medium.com/@jiwoochoics/%EC%96%B4%EC%A9%94-%EC%88%98-%EC%97%86%EB%8A%94-hydration-mismatch%EB%A5%BC-useeffect%EC%97%86%EC%9D%B4-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0-c984c9120f9b

https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store
