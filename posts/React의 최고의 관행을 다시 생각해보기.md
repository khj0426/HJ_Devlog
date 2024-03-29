---
title: 'React의 최고의 관행을 다시 생각해보기'
excerpt: '클라이언트 측 뷰 라이브러리에서 응용 프로그램으로 진화'
date: '2023-12-20'
author: '김효중'
category: 'React'
image: '/images/postImg/next13.png'
---

지난 10년의 시간 동안, 리액트는 클라이언트에서 랜더링하는 단일 페이지 애플리케이션(SPA)의 최고의 관행을 구성하였습니다.

오늘날, 리액트는 널리 사랑받고 채택되는 라이브러리가 되었고, 계속해서 건전한 비판과 의심을 받고 있습니다.

React 18은 React Server Component와 함께 클라이언트 측 MVC의 뷰라는 역할에서 벗어나 점차 새로운 단계로 진입하게 만들었습니다.

이 글에서는, React의 진화과정을 다뤄보려고 합니다. 먼저 React의 핵심 제약 조건과 과거의 접근 방식을 이해하고, React 애플리케이션을 통합하는 기본 원칙과 패턴을 탐구할 것입니다.

끝으로,우리는 Remix와 같은 리액트 프레임워크와 Next 13의 앱 디렉토리에서 변화하는 모델을 이해할 것입니다.

먼저 지금까지 해결하고자 한 근본적인 문제들을 이해하는 것부터 시작하겠습니다.

이를 통해 서버,클라이언트,번들러 간의 통합이 가능한 리액트와 함께 더 높은 수준의 프레임워크를 사용하려는 리액트 팀의 권고를 상황에 맞게 설명할 것입니다.

### 어떤 문제들이 해결되고 있나요?

소프트웨어에서 보통 두 가지 종류의 문제가 있습니다. <b>기술적인 문제와</b> <b>인간적인 문제</b>입니다.

아키텍쳐를 생각하는 방법 중 하나는 이런 문제를 관리하는 데 도움이 되는 적절한 조건을 찾는 과정입니다. 사람들끼의 협업을 많이 하면 할수록 더 복잡하고 오류가 발생하고, 시간이 지날수록 더 위험한 문제가 발생합니다.

기술적인 문제를 관리하는 적절한 제약이 없다면, 일반적으로 최종 사용자 경험은 더 나빠집니다.

이런 제약은 궁극적으로 인간이 복잡한 시스템을 구축하고 상호작용하는 가장 큰 제약을 관리하는 데 도움이 됩니다. 팀들은 시간과 자원이 한정되어 있습니다. 개인으로서 우리는 복잡성을 우리의 머리에 담을 수 있는 능력 또한 한정되어 있습니다.

우리가 사용하는 시간의 대부분은 무슨일이 일어나고 있는지, 새로운 것을 바꾸거나 추가적인 것들을 개발하기에 가장 좋은 방법이 무엇인지 알아내는데 쓰입니다.

리액트는 사용자의 복잡한 상호작용을 가진 기능을 구현하는 데 있어서 당시 다른 방법들보다 더 효과적이었습니다. 리액트는 2016년에 작성된 이후, 최종 사용자 하드웨어에서 처리해야 하는 크고 깊은 트리를 최적화하는 기술적인 문제를 사전에 해결했습니다.

사용자 입장에서, 프레임워크, 렌더링 아키텍쳐, 상태관리는 그렇게 중요한 문제가 아닙니다. 사용자들은 그저 마찰없이 그들이 해야 할 일을 하길 원합니다. 즉, 사용자들로 하여금 복잡한 생각을 하게 만들지 않는 것이 중요합니다.

앞으로 알게 되겠지만, 차세대 리액트 프레임워크에서 권장하는 많은 최적화 방법들은, <b>성능 문제가 점점 중요해지는 상황</b>에서, 사용자의 CPU에서 처리되는 <b>깊은 컴포넌트 트리</b>를 다루는 데 있어서 그 영향을 줄일 수 있는 내용을 담고 있습니다.


지금까지 기술은 서비스의 중앙화 vs 분산화, 두꺼운 클라이언트의 의존 vs 얇은 클라이언트의 의존 등과 같은 다양한 축을 따라 방향성이 왔다 갔다하는 모습이었습니다.

모바일 컴퓨팅과 단일 페이지 애플리케이션(SPA)의 부상으로 두꺼운 클라이언트 의존의 흐름으로 진화했습니다. 그리고 현재 리액트의 기본적인 사고 모델은 이 두꺼운 클라이언트의 의존에 기반을 두고 있습니다.

### 프론트엔드 개발의 정체성

이러한 변화는 '프론트엔드 전방과 후방'의 구분을 만들게 되었습니다.

버넌 조이스의 "프론트엔드 개발의 정체성은 무엇인가?"라는 글에서 다음과 같은 글을 볼 수 있습니다.

앵귤러와 같은 프레임워크나 리액트를 다루는 개발자들은 프로그래밍 개념에 대해 더 깊은 이해를 요구합니다. 이 개념들은 과거에는 백엔드에서만 관련되어 있을 수 있습니다. MVC,함수형 프로그래밍,고차함수 등등..

저는 현대 프레임워크, 빌드 도구 등을 찾아보고, 이것들을 공부하고 코드에 반영하는 것을 즐깁니다. React를 UI라이브러리로, GraphQL을 데이터로, Cypress를 통합 테스트로, Webpack을 빌드 도구로 사용하는 것을 즐깁니다.

저는 이것들을 프론트엔드 개발의 일부라고 보고 있지만, 의미론적 마크업, CSS,UX를 위해 고려해야 할 것들, UI의 각종 디테일한 부분들과 관련된 기사나 대화에서는 너무나도 멀게 느껴집니다.

마치 두 개가 다른 세계인 것만 같습니다.

회사에서 "프론트엔드 개발자"를 위한 공고를 낼 떄, 그들은 무엇을 요구하고 있나요? 아마 "프론트엔드 개발자"라는 제목만으로는 충분하지 않을 지도 모릅니다.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/01/jobbs.png?ssl=1)

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/01/hiring.png?ssl=1)


리액트의 시스템 아래에서, 프론트엔드와 백엔드의 장점을 모두 활용하려는 노력으로 인해, '프론트엔드를 위한 백엔드'의 대부분이 다시 서버로 이동하고 있습니다.

### MVC의 View에서 다시 애플리케이션 아키텍처로

많은 조직에서, 엔지니어의 일부분은 소프트웨어 설계 및 구축에 있어 좋은 방법을 찾고, 그것들을 조직이 사용하는 프레임워크에 적용함으로써 조직 전체의 개발 작업을 효과적으로 만드는 역할을 합니다.

이러한 종류의 개발자들은 우리의 제한된 시간과 관심을 더 효율적으로 사용하게 만듭니다. 이를 통해 다른 개발자들이 신규 기능 개발과 같은 더 중요한 작업에 관심을 온전히 쏟을 수 있게 도와줍니다.

제한된 시간 안에서 우리는 종종 가장 쉬워보이는 것을 기본으로 선택하게 됩니다. 그래서 우리는, 올바른 길을 가게 도와주고 성공적으로 작업을 끝낼 수 있게 하는 여러 제약 조건을 원합니다.

사용자 경험을 개선하고, 소프트웨어를 효과적으로 만들 기 위해, 종종 사용자의 장치에서 로드되고 실행되는 코드의 양을 줄일 필요가 있습니다.

이는 "필요한 것만 다운로드하고 실행해라"는 원칙에 의해 진행되는데, 이런 원칙은 성공적으로 작업을 수행하게 하는 제약 조건일 수 있습니다.

우리가 순수하게 클라이언트만을 기반으로 하는 패러다임에 제한되어 있다면, 이런 원칙을 준수하는 것이 어렵습니다.  결과적으로 번들들은 데이터를 가져오고, 처리하고, 여러 라이브러리를 포함하는데, 이 라이브러리는 메인 스레드가 아닌 다른 곳에 위치할 수 있습니다.

예를 들어 'moment'와 같은 라이브러리는 날짜와 시간을 처리합니다. 이런 라이브러리는 메인스레드가 아닌 다른 곳에서 충분히 실행될 수 있습니다.

이런 상황은 Remix와 Next등의 프레임워크에서 바뀌고 있습니다. 이 프레임워크들은 리액트의 단방향 데이터 흐름이 서버까지 확장되어, MPA(Multi Page Application)의 간단한 요청-응답 모델과 SPA의 상호작용이 결합됩니다.

### 서버로 돌아가는 여정

이제 시간이 지남에 따라 클라이언트 패러다임에 적용한 최적화를 이해해봅시다. 이는 더 나은 성능을 위해 다시 서버로 돌아가는 것을 요구했습니다.

이런 맥락에서 서버의 역할이 점점 중요해지는 리액트 프레임워크를 이해하는 데 도움이 될 것입니다.

많은 스크립트 태그가 포함된 빈 HTML페이지에서 클라이언트 렌더링 프론트엔드를 제공하는 간단한 방법은 아래의 그림과 같습니다.

![](https://frontendmastery.com/_astro/simple_CSR.cf234c3f_Z1CckRU.png)

이 방법의 이점은 빠른 TTFB, 간단한 운영 모델, 그리고 분리된 백엔드입니다.

(TTFB는 Time to First Byte의 약자로 , 사용자가 웹 페이지를 요청한 후 서버가 첫번째 바이트를 응답하기까지의 시간을 측정한 것입니다.)

![](https://res.cloudinary.com/lwgatsby/nx/blog/What-Does-TTFB-measure.png)

리액트의 모델과 결합된 이러한 방식은 많은 사람들의 문제를 단순화시킵니다.

하지만 모든 일을 사용자의 하드웨어에 의존하게 되면서 빠르게 기술적인 문제에 부딪히게 됩니다. 사용자에게 유용한 것이 표시되기 전에 모든 것을 다운로드 해 실행하고, 클라이언트에 가져와야 하기 떄문에 기다려야 합니다.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtdtGF4KSGN3xo5yNXepn3H3itZkPo76JAUQ&usqp=CAU)

코드가 많아지면 많아질수록, 필요한 라이브러리가 늘어나면 늘어날수록 애플리케이션을 실행하고 로드하는데 더 많은 시간과 자원이 필요합니다.

따라서 성능관리를 신중하게 하지 않으면 애플리케이션이 느려져 사용자가 사용하기 어렵게 될 수 있습니다.

이를 위해 불필요한 코드를 정리해줘야하고, 성능 최적화를 지속적으로 실시해야 합니다.

### 서버사이드 렌더링

서버로 돌아가는 첫번째 단계는 이런 느린 시작-시간을 해결하는 것이었습니다.

초기 문서 요청에 빈 HTML을 응답하는 대신 서버에서 데이터 가져오기를 즉시 시작한 후 구성요소를 HTML로 렌더링하여 응답합니다.

클라이언트 렌더링 SPA의 맥락에서, 서버 사이드 렌더링(SSR)은 자바스크립트가 로드되는 동안 최소한 무언가를 처음에 보여주는 트릭과 같습니다. 이는 공백의 흰 화면 대신 보여집니다.

![](https://frontendmastery.com/_astro/SSR_with_hydration.1a26d94b_Z1dSxcG.png)


SSR은 특히 콘텐츠가 많은 페이지에서 성능을 향상할 수 있습니다. 그러나 운영비용이 동반되며 TTI(Time To Interactive)가 늦어질 수 있습니다.
또한 사용자들이 페이지에서 무언가를 보고 그것과 상호작용하려고 하지만, 스레드가 잠길 수 있습니다.

이처럼 SSR은 Time To View와 Time To Interact간에 시간 간격이 존재합니다. 

TTI는 페이지가 완전히 로드되고 사용자가 페이지와 상호작용할 수 있는 상태가 되는 시간을 말합니다. SSR을 사용할 경우, 서버에서 렌더링된 HTML이 브라우저로 전송되어 빠르게 보여지지만, 클라이언트 사이드 자바스크립트가 아직 로드되지 않았다면 사용자는 페이지와 상호작용할 수 없습니다. 

이로 인해 사용자는 페이지의 일부 또는 전체가 '잠긴' 상태를 경험할 수 있습니다.

### 더 많은 최적화

그래서 결국 SSR은 속도를 빠르게 할 수 있지만, 만병통치약은 아닙니다.

서버 사이드 렌더링은 초기 페이지 로딩 시간을 줄일 수 있습니다. 그러나 서버에서 페이지를 렌더링하는데 시간이 걸리면 Time to First Byte가 느려질 수 있습니다. 

즉, 이 경우 브라우저가 서버로부터 첫 바이트를 받는 시간이 늘어날 수 있습니다. 이는 사용자가 페이지를 요청하고 요청에 대한 응답을 받는 시간이 늘어날 수도 있음을 의미합니다.

이런 상황에서 <b>스트리밍</b>이 등장합니다.

만약 ChatGpt가 전체 응답이 완료될 때까지 스피너를 보여준다고 생각해볼까요? 대부분의 사람들은 뭔가 오류가 있다고 생각하고 탭을 닫을 것입니다. 그래서 우리는 데이터와 콘텐츠를 <b>브라우저에 스트리밍</b>
하여 곧 완료할 수 있는 모든 것을 보여줍니다.

스트리밍을 통한 동적 페이지는 서버에서 가능한 빨리 데이터를 가져오는 방법입니다. 브라우저가 동시에 여러 자원을 다운로드하기 시작해, 모든 것이 병렬로 이루어집니다. 이를 통해 사용자는 더 빠른 페이지의 상호작용을 가능하게 합니다.

리액트 18에서 페이지 부분을 Suspense로 감싸서 특정 컴포넌트가 준비 전 fallback UI를 보여주게 할 수 있습니다.

예를들어, Comments컴포넌트를 Suspense로 감싸, <b>댓글 컴포넌트를 기다리지 않고 나머지 페이지에 대해 HTML을 스트리밍해</b>라고 명령할 수 있습니다. 

또한 Selective Hydration을 통해 렌더링 비용이 큰 컴포넌트를 Suspense로 감싸 부분적이고 독립적인 Hydration을 수행할 수 있습니다. 

이렇게 하면 댓글 컴포넌트와 같이 코드 로드에 시간이 많이 걸리는 컴포넌트를 기다리지 않고, 다른 컴포넌트를 먼저 Hydration할 수 있습니다.

따라서 댓글 컴포넌트가 서버에서 생성되어 클라이언트로 전송되면, 클라이언트는 이 HTML을 수신하여 댓글 컴포넌트를 렌더링합니다. 

이후 JavaScript 스크립트를 통해 댓글 컴포넌트의 동적인 동작이 추가되는데, 이 과정을 Hydration이라고 합니다.

```ts
<Layout>
    <NavBar />
    <SideBar />
    <Post />
    <Suspense fallback = {<div>로딩..</div>} >
        <Comments />
    </Suspense>
</Layout>
```

![](https://miro.medium.com/v2/resize:fit:828/format:webp/0*8lcpVjIcqJdmxxbn.png)

이렇게 하면 최초로 서버에서 온 HTML은 댓글 컴포넌트 대신 fallback UI가 들어가게 됩니다.

만약 댓글 컴포넌트가 준비되면, 리액트에서는 <b>추가된 HTML</b>과 <b>작은 script</b>을 보내줍니다.

```ts
<div hidden id="comments">
  <!-- Comments -->
  <p>First comment</p>
  <p>Second comment</p>
</div>
<script>
  // This implementation is slightly simplified
  document.getElementById('sections-spinner').replaceChildren(
    document.getElementById('comments')
  );
</script>
```

![](https://miro.medium.com/v2/resize:fit:828/format:webp/0*oYg-utLL7hKBOag_.png)

이제 무언가를 보여주기 위해 모든 데이터를 기다릴 필요가 없습니다. 단지 리액트는 해당 위치에 스트림으로 스크립트와 컴포넌트를 넣어주기 때문에 특정한 순서를 고려할 필요도 없습니다.



### 스트리밍

이 스트리밍 기술은 스트리밍 데이터를 지원할 수 있는 백엔드 서버 또는 에지 런타임에 따라 달라집니다.

최신 브라우저에는 fetch API가 내장되어 있어 fetch 응답을 읽을 수 있는 스트림으로 소비할 수 있습니다. fetch API는 응답을 "스트림" 형태로 제공할 수 있습니다.

아래의 코드는 fetch API에서 스트림에 대한 데이터 청크를 읽어오는 MDN의 예시 코드입니다. ReadStreamDefaultRead.read()메서드로 읽어올 수 있습니다.

```ts
// Fetch the original image
fetch("./tortoise.png")
  // Retrieve its body as ReadableStream
  .then((response) => {
    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          });
        }
      },
    });
  })
  // Create a new response out of the stream
  .then((stream) => new Response(stream))
  // Create an object URL for the response
  .then((response) => response.blob())
  .then((blob) => URL.createObjectURL(blob))
  // Update image
  .then((url) => console.log((image.src = url)))
  .catch((err) => console.error(err));
```

응답 데이터를 스트림형태로 받아올 수 있고, 이는 모든 조각들이 한번에 다운로드되는 것을 기다리지 않습니다.

그러나 이 방법은 서버에서 스트리밍된 응답을 전송하고 , 클라이언트에서 다시 읽을 수 있는 기능을 추가로 설정해야 하므로 클라이언트-서버간의 긴밀한 협업이 필요합니다.

스트리밍에는 캐싱,HTTP 상태코드와 오류처리, 최종 사용자 경험이 어떻게 보이는지 등과 같은 고려해야 할 것들이 굉장히 많습니다. 또한 스트리밍을 사용한다면 웹의 레이아웃이 빠르게 변화할 수 있습니다. 

### 리액트에서 데이터를 가져올 때의 제약 사항

리액트에서 각 컴포넌트는 특정 기능을 수행하도록 설계되었지만, 여러 가지 역할을 동시에 수행해야 할 때가 많습니다. 한 컴포넌트에서 데이터를 가져오는 요청을 시작할 수도 있고, 이벤트에 반응할 수도 있으며, 단순히 렌더링하는 역할도 할 수 있습니다.

이런 상황에서 어떤 데이터를 불러와야 할지 알려면, 컴포넌트 트리를 탐색해야 했습니다. 다만 이런 방식의 문제는 초기 HTML을 만들기 위해 서버에서 <b>컴포넌트 트리를 일일이 탐색</b>하면서 필요한 데이터를 불러와야 했습니다.

그래서 매번 트리 전체를 탐색할 필요 없이 필요한 부분만 빠르게 접근할 수 있는 방법이 필요했습니다.

### Relay 이해해보기

Relay는 페이스북에서 만든, 데이터 관리 라이브러리입니다.  릴레이의 원리를 이해하면 페이스북에서 앞서 문제를 어떻게 해결하는지 이해하는 데 유용합니다.

각 컴포넌트가 필요로 하는 데이터 요청을 해당 컴포넌트 코드와 함께 위치시킵니다. 이렇게 하면 어떤 데이터가 어떤 컴포넌트에 필요한지 알 수 있습니다.

Relay에서는 컴포넌트들이 GraphQL 프래그먼트를 사용해 데이터 의존성을 정의합니다. 이 말은, 컴포넌트가 어떤 데이터를 필요로 하는지 <b>코드 상에서 명확히</b>보여줍니다.

Relay는 빌드 타임에 각 컴포넌트의 요구사항을 분석해 최적화된 쿼리를 생성하고, 특정 진입점에서 이 쿼리는 실행됩니다. 이를 통해 컴포넌트 코드와 서버 데이터를 가능한 빠르게 병렬로 로드할 수 있습니다.

Relay를 사용하려면 그러나 GraphQL이 필요하고, 클라이언트 측 고급 컴파일러가 필요합니다. 

### 차선책

데이터나 코드를 가져올 때 또 다른 방법이 무엇일까요?

여기서 Remix나 Next와 같은 프레임워크에서 사용되는 서버의 중첩 경로가 작동합니다.

컴포넌트의 데이터 의존성은 일반적으로 URL에 매핑될 수 있습니다. 이 매핑은 프레임워크가 특정 URL에 필요한 컴포넌트와 데이터를 미리 식별할 수 있게 합니다.

예를들어 /users/1의 URL은 첫번째 사용자의 정보를 필요로 하는 컴포넌트를 가리킬 수 있습니다. 만약 이 상황에서 /users/1/posts/2의 URL은 사용자 컴포넌트 하위에 존재하는 특정 게시글을 가리킬 수 있습니다.

![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fterminology-url-anatomy.png&w=1920&q=75&dpl=dpl_9XoWNXvs1c9nCe1t1mk7FgybT9Tf)

이런 방법은 독립적인 경로에 대해 <b>별도의 에러 경계</b>를 제공하고 URL을 보고 데이터와 코드를 미리 로드하여 SPA의 전환을 빠르게 만들 수 있습니다.

이제 Suspense, 동시모드, 스트리밍이 어떻게 데이터 가져오기 패턴을 향상시키는지 알아보겠습니다.

서스펜스를 사용하면 데이터를 사용할 수 없을 때 하위 트리가 다시 로드 UI를 표시하고 준비가 되면 렌더링을 다시 할 수 있습니다.

동기화되지 않은 트리 구조에서 선언적으로 비동기성을 표현할 수 있고, 렌더링과 함께 불러오는 리소스를 병렬화할 수 있습니다. 리믹스에선 이 패턴은 다음과 같은 코드로 표현됩니다.

```ts
export function loader({params}) {
  const productReviews = fetchReview(params.id);

  const product = await fetchProduct(params.id);
  return defer({
    product,
    productReviews
  })
}

export default function ProductPage(){
  const {product,productReviews} = useLoaderData();
  	return (
		<>
			<ProductView product={product}>
			<Suspense fallback={<LoadingSkeleton />}>
				<Async resolve={productReviews}>
					{reviews => <ReviewsView reviews={reviews} />}
				</Async>
			</Suspense>
		</>
	)
}
```

loader함수에서 라우트 단위에서 필요한 데이터를 가져옵니다. 위에서는 상품과 상품의 리뷰를 가져오는데, loader에서 반환하는 defer함수는 이 두 작업을 <b>병렬로 처리하도록</b>도와줍니다.

여기서 주목할 점은 ReviewsView가 Suspense와 Async로 감싸져 있다는 것입니다. 상품 리뷰가 준비되지 않았을 때 로딩 화면을 보여줍니다.

이렇게 하면, 상품 정보와 상품 리뷰를 동시에 요청하지만, 상품 정보만 있어도 페이지를 먼저 보여주고, 상품 리뷰는 준비가 되면 나중에 표시하도록 할 수 있습니다. 

Next의 React Server Component는 서버의 비동기 구성 요소를 사용해 유사한 데이터 가져오기 패턴을 제공합니다.

```ts
// Example of similar pattern in a server component
export default async function Product({ id }) {
	// non critical - start fetching but don't block
	const productReviewsPromise = fetchReview(id)
	// critical - block rendering with await 
	const product = await fetchProduct(id)
	return (
		<>
			<ProductView product={product}>
			<Suspense fallback={<LoadingSkeleton />}>
				{/* Unwrap promise inside with use() hook */} 
				<ReviewsView data={productReviewsPromise} />
			</Suspense>
		</>
	)
}
```
불필요한 대기 시간을 방지하기 위해, 중요한 데이터를 덜 스트리밍하여 단계적으로 페이지를 로드할 수 있습니다. 이는 Suspense를 통해 쉽게 만들어집니다.

### 단방향 데이터 흐름과 서버로의 확장

그렇다면 리액트의 단방향 데이터 흐름이 서버로 확장될 때 어떤 패턴이 사용될까요? 아래는 Remix의 데이터 흐름에 관한 이미지로 MPA(Multi Page Application) 아키텍쳐에서 볼 수 있는 요청-응답 모델을 향한 프레임워크의 변화를 보여줍니다.

이런 변화의 핵심은 모든 것을 사용자 단에서 처리하는 모델에서 서버가 더 중요한 역할을 하는 모델로 전환하는 것입니다.

![](https://frontendmastery.com/_astro/remix-data-flow.226defa0_Z2so8Sq.png)

이 패턴은 아직은 실험적인 "서버 액션 함수"를 갖는 React Server Component로 확장됩니다. 리액트의 단방향 흐름이 서버로 확장되는 경우 점진적으로 형태가 개선됩니다.

이런 접근법은 클라이언트의 코드를 제거하고 단순화하는 데 큰 이점을 줍니다. 하지만 이것의 주요 이점은 데이터 관리의 멘탈 모델을 단순화함으로써 기존 클라이언트 코드의 많은 부분을 단순화하는 것입니다.

더 깊은 이해를 위해서는 '웹의 다음 전환'에 대한 포스트를 참조하시면 좋습니다. 이 포스트에서는 이런 전환을 더 깊게 탐구해 보았습니다.

<a href = "https://www.epicweb.dev/the-webs-next-transition" target = "_blank" style = "color:rgb(0, 131, 120)">웹의 전환</a>이라는 글에서 더 자세한 내용을 보실 수 있습니다. 😀


<a href = "https://hj-devlog.vercel.app/blog/%EC%84%9C%EB%B2%84%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0" target = "_blank" style = "color:rgb(0, 131, 120)">서버 컴포넌트 이해하기</a>라는 글에서 서버 컴포넌트의 대한 내용도 볼 수 있습니다. 😆

### 결론

소프트웨어는 단순히 사람들이 목표를 달성하는 데 도움을 주는 도구일 뿐입니다. 이 점을 많은 프로그래머들이 잊지 않았으면 합니다. 가치를 전달하는 것에 초점을 맞추고, 도구의 세부 사항에 너무 몰두하지 않는 것이 중요합니다.

React 생태계가 클라이언트만의 패러다임을 넘어서면서, 우리가 작동하는 환경의 기본 제약 사항을 명확히 이해하는 것이 중요해졌습니다. 이를 통해 더욱 정보에 기반한 트레이드오프를 결정할 수 있게 됩니다.

진자가 한 번 흔들릴 때마다, 우리는 새로운 지식과 경험을 얻습니다. 이를 다음 반복 과정에 통합함으로써, 이전 접근법의 장점을 계승하면서 새로운 방향으로 나아갈 수 있습니다. 항상 각 선택에는 트레이드오프가 존재합니다.

다행히도, 프레임워크들은 개발자들이 특정 상황에 대해 더 세밀한 트레이드오프를 결정할 수 있도록 도와주는 레버를 제공하고 있습니다. 이를 통해 최적화된 사용자 경험과 개발자 경험을 동시에 이룰 수 있습니다. MPA의 단순한 모델이 SPA의 복잡한 모델과 만나 클라이언트와 서버의 혼합 형태를 이루는 곳에서 이것은 더욱 명확해집니다.

우리는 소프트웨어 도구의 세부 사항에 치중하기보다는 그 도구를 통해 어떻게 가치를 전달할 수 있는지에 더욱 집중해야 합니다.
