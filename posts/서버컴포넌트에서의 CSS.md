---
title: '서버컴포넌트에서의 CSS'
excerpt: '서버 컴포넌트와 CSS,어떤 것을 택할까?'
date: '2024-06-08'
author: '김효중'
category: 'Next.js'
image: '/images/postImg/next13.png'
---

Vercel은 Next.js의 13.4의 안정적인 버전을 발표하면서 React Server Component를 기반으로 구축된 최초의 React 프레임워크가 되었습니다.

![](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcss-in-rsc%2Fnext-release-dark.png&w=750&q=75)

이것은 큰 변화입니다! React Server Component는 React에서 서버 전용 코드를 작성할 수 있는 공식적인 방법을 제공해, 개발자들에게 많은 새로운 가능성을 열었습니다.

그러나 React Server Component는 React의 작동 방식에 근본적인 변화를 가져왔고, 우리가 사용해 오던 일부 라이브러리와 도구들이 혼란스러워졌습니다😅

관련해서, 가장 인기있는 CSS-in-JS 라이브러리(💅 styled-components, Emotion)들은 이 새로운 React버전과 완벽히 호환되지 않고, 실제로 완벽한 해결책이 제시되진 않았습니다. 

만야갸 당신이 CSS-in-JS 라이브러리를 사용한다면, 이 블로그 글이 당신의 여러 혼란을 깨끗히 없애주고, 무엇을 해야 할지에 대한 실용적인 옵션을 제공해 주길 바랍니다.

### 그냥 _____를 사용하세요😵

온라인으로 여러 토론을 거치면, 많은 제안들은 그저 당신이 다른 CSS 도구로 바꾸면 된다고 합니다. 

물론, React의 생태계에는 선택할 수 있는 옵션이 굉장히 많습니다.

그러나 많은 이들에게, 이는 현실적인 제안이 아닙니다. 만약 블로그나, 다른 개발 프로젝트에서 5000개가 넘는 스타일 컴포넌트를 사용하고 있다면,그리고 규모가 크면 클수록 완전히 새 도구로 마이그레이션 하는 것은 결코 쉬운 일이 아닙니다.

그리고 styled-components를 좋아하는 사람도 굉장히 많습니다.

### 서버 컴포넌트에 대해 깊이 알아봅시다.

이 호환성 이슈에 대해 이해하기 위해, 우리는 React Server Component에 대해 알 필요가 있습니다. 그 전에, 우리는 먼저 Server Side Rendering(SSR)에 대해 알아봅시다.

SSR은 여러 전략과 구현을 포괄하는 용어지만, 가장 일반적인 형태는 아래와 같습니다.

- 🤚 사용자가 우리의 웹 페이지를 방문합니다.

- 🤚 요청이 서버로 수신됩니다(Node.js와 같은). 우리의 애플리케이션을 렌더링하고, 모든 초기 UI를 포함한 HTML문서를 제공해줍니다.

- 🤚 이 HTML문서가 사용자의 기기에서 로드되면, React는 서버에서 수행한 동일한 컴포넌트들을 다시 렌더링합니다. 그러나 새 HTML요소를 만드는 대신, 서버에서 생성된 HTML을 채택합니다. 이를 Hydration이라고 부릅니다.

![](https://blog.kakaocdn.net/dn/RZ89B/btrbENofpfp/fBn3QJncluRPEBQNpeXjE1/img.png)

리액트는 사용자가 기기에서 상호작용하는 것들을 실행할 수 있어야 합니다. 서버에서 생성된 HTML은 모두 정적입니다; 

이 서버에서 생성된 HTML은 우리가 적어둔 어떠한 이벤트 핸들러도 포함하지 않습니다(onClick과 같은), 또한 우리가 명시해둔 어떠한 ref도 확인할 수 없습니다.

리액트가 사용자의 디바이스에서 돌아가면, 미리 존재하는 많은 UI를 발견하지만, HTML요소가 어떤 컴포넌트에 속해 있는지의 맥락은 알지 못합니다.

리액트는 컴포넌트 트리를 재구축하고, 기존 HTML을 올바르게 연결하고, 우리가 선언해둔 이벤트 핸들러와 ref를 올바른 요소에 부착해야 합니다.

<b>그러나 이것은 큰 한계를 갖고 있습니다.</b> 우리가 작성하는 모든 코드는 서버, 클라이언트 동시에 실행됩니다. 

즉, 오로지 서버에서만 렌더링되는 컴포넌트는 존재하지 않습니다.

우리가 database가 존재하는 풀스택 웹 애플리케이션을 만든다고 가정해봅시다. 만약 PHP와 같은 언어를 사용하면, 아마 다음 코드를 기대할 수 있습니다.

```jsx
function Home(){
    const data = db.query("SELECT * FROM SNEAKERS");

    return (
        <main>
            {data.map((item) => (
                <Sneaker key = {item.id} item = {item} />
            ))}
        </main>
    )
}
```

이론적으로, 이 코드는 서버에서 잘 동작할 수 있지만, 정확히 같은 코드가 사용자의 디바이스에서 다시 실행되는데, 이것은 문제라고 할 수 있습니다.

우리가 리액트에게 다음과 같이 말할 수 없습니다.

```bash
이 코드를 오직 서버에서만 실행하고,
클라이언트 측에서는 이 결과를 재사용해!
```

리액트로 만들어진 여러 프레임워크(Next.js와 같은)는 그들만의 고유한 해결책을 내놓았습니다.

예를들어, Next.js에서는 우리는 아래와 같이 사용할 수 있습니다.

```jsx
export async function getServerSideProps(){
    const data = await db.query("SELECT * FROM SNEAKERS");

    return {
        props:{
            data,
        }
    }
}

function Home({ data }) {
    return (
        <main>
            {data.map((item) => (
                <Sneaker keys = {item.id} item = {item} />
            ))}
        </main>
    )
}
```
Next.js 팀에서는 "정확히 같은 React코드가 클라이언트와 서버에서 모두 실행되고 있네?!.. 그러나 몇가지 코드만 추가하면, 리액트 밖에서, 오로지 서버에서만 돌아갈 수 있어!"라고 말합니다.

Next.js의 서버가 요청을 받게 되면, 처음에 <b>getServerSideProps</b>함수가 실행됩니다, 그리고 이 함수가 반환하는 것이 React 코드에 props로 전달됩니다. 저는 이러한 방식을 사랑하는 팬 중 하나입니다.

그러나 이것은 약간의 임시방편 같이 느껴집니다. React의 한계 때문에 만들어진, API같습니다. 또한, 이것은 page단위에서만 동작합니다.(모든 라우트의 최상단); 우리는 우리가 원하는 곳 어느곳에서 <b>getServerSideProps</b>를 사용하는 것은 불가능합니다.

React Server Component는 이 문제에 대해, 보다 직관적은 해결책을 제시합니다. React Server Component를 통해, 우리는 서버 컴포넌트에서 바로 데이터베이스 호출이나, 다른 서버관련 작업을 수행할 수 있습니다.

```jsx
//서버 컴포넌트 Home
async function Home(){
    const data = await db.query("SELECT * FROM SNEAKERS")

    return (
        <main>
            {data.map((item) => (
                <Sneakers key = {item.id} item = {item } />
            ))}
        </main> 
    )
}
```
서버 컴포넌트 패턴에서는, 컴포넌트들은 기본적으로 <b>서버 컴포넌트</b>가 됩니다. 서버 컴포넌트들은 오직 서버에서만 돌아가게 됩니다. 이 코드는 사용자의 디바이스에서 <b>다시 돌아기지 않습니다!!!</b>;심지어 자바스크립트 번들에도 포함되지 않습니다.

이 서버 컴포넌트 패턴은 또한 클라이언트 컴포넌트라는 용어를 만들었습니다. 클라이언트 컴포넌트는 서버와 클라이언트 동시에 실행되는 컴포넌트입니다.전통적으로 서버 컴포넌트 패턴 전에 당신이 작성했었던 모든 컴포넌트는 클라이언트 컴포넌트가 됩니다.

우리는 파일 상단에 새로운 'use client' 지시어를 추가해, 클라이언트 컴포넌트를 선택합니다.

```jsx
'use client';
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

이 'use client'의 선언은 "클라이언트 영역"을 생성합니다; 이 파일의 모든 컴포넌트들은, 어디서 그것들이 import 되었어도, 클라이언트 컴포넌트로 렌더링됩니다(서버에서 먼저 실행되고, 그 후 ㅡ 클라이언트에서 한 번 더 실헹됩니다).

다른 리액트의 기능(hooks등과 같은)과는 다르게, 리액트 서버 컴포넌트는 번들러에 대한 깊은 이해가 필요합니다. 2024년 4월에 이 글을 작성했기 떄문에, 실제 리액트 서버 컴포넌트를 사용하는 실용적인 방법은 Next.js를 사용하는 것이었습니다.

### 서버컴포넌트는 제한적이다.

리액트 서버 컴포넌트에 대해 이해해야 할 핵심 사항은, 그것이 완전한 React 경험을 제공하지 않는다는 것입니다. 대부분의 React API는 서버 컴포넌트에서 동작하지 않습니다.

예를 들어, useState훅이 있습니다. 상태값이 변화하면, 컴포넌트가 다시 렌더링됩니다. 그러나 서버 컴포넌트는 다시 렌더링 하는것이 불가능합니다; 서버 컴포넌트의 코드는 절대 브라우저에 전송되지 않고, 리액트는 상태 변화를 처리할 어떠한 방법도 없습니다. React의 관점에서, 서버 컴포넌트에 의해 생성된 마크업은 고정되어 있고, 클라이언트에서 바꿀 수 없습니다.

유사하게, 우리는 서버 컴포넌트 안에서 useEffect를 사용할 수 없습니다. effects는 서버에서 동작하지 않고, 클라이언트에서 렌더링 되야만 동작하게 됩니다. 그리고 서버 컴포넌트는 우리의 번들 크기에서 제외되기 때문에, client-side의 리액트는 우리가 useEffect훅을 작성했다는 사실을 결코 알지 못합니다.

어떻게 보더라도, 서버 컴포넌트는 완전한 리액트의 컴포넌트는 아닙니다. 적어도 우리가 전통적으로 이해해온 컴포넌트와 다릅니다. 서버 컴포넌트 패턴은 오히려 PHP템플릿 같습니다(서버에서 실행되며 완전한 HTML을 만드는). 유일한 혁신은 서버 컴포넌트와 클라이언트 컴포넌트가 동일한 애플리케이션에 공존할 수 있다는 점입니다.

### CSS-in-JS

![](data:image/jpeg;base64,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)

좋습니다, 우리는 리액트 서버 컴포넌트의 기본적인 사항에 대해 다뤘습니다. 이제 우리는 💅 styled-components와 같은 CSS-in-JS라이브러리를 이야기 해 보겠습니다.

간단한 예시가 있습니다.

```jsx
import styled from 'styled-components'

export default function HomePage(){
    return (
        <BigRedButton>
            Click Me!
        </BigRedButton>
    )
}

const BigRedButton = styled.button`
    font-size: 2rem;
    color: red;
`
```

.red-btn와 같은 class의 CSS를 넣는 것이 아니라, 우리는 단지 CSS를 새로 생성된 React 컴포넌트에 첨부합니다. 이것은 styled-components를 더 특별하게 만듭니다; 컴포넌트들은 클래스가 아니라 재사용가능한 기본 요소입니다.

styled.button은 동적으로 새로운 React 컴포넌트를 만들어주는 함수이며, 우리는 그 컴포넌트를 BigRedButton이라는 변수에 할당하고 있습니다. 우리는 그 styled-components로 만든 컴포넌트를 React 컴포넌트와 같이 사용하는 것과 동일하게 사용할 수 있습니다. BigRedButton은 큰, 빨간 텍스트의 button태그를 렌더링 할 것입니다.

그러나 어떻게 이 라이브러리가 요소에 CSS를 정확하게 적용하는 것일까요? 우리는 3개의 옵션이 있습니다.

- 🤚 스타일들은 style 속성을 통해 인라인으로 적용됩니다.

- 🤚 스타일들은 link태그를 통해 로드된 별도의 CSS파일로부터 주입됩니다.

- 🤚 스타일들은 전형적으로 현재 HTML요소의 head태그의 style태그로부터 주입됩니다.

만약 우리가 이 코드를 실행하고, DOM을 검사한다면, 해답을 얻을 수 있습니다.

```html
<html>
  <head>
    <style data-styled="active">
      .abc123 {
        font-size: 2rem;
        color: red;
      }
    </style>
  </head>
  <body>
    <button className="abc123">
      Click me!
    </button>
  </body>
</html>
```

styled-components는 라이브러리가 관리하는 style태그로부터 제공된 스타일을 사용하게 됩니다. 이 스타일을 현재 button과 연결하기 위해, <b>독특한 새 클래스 이름</b>인 abc123을 만듭니다.

모든 이러한 작업은 처음 리액트가 렌더링될 때 발생합니다.

- 🤚 Client-Side 렌더링 문맥(Parcel이나, create-react-app등과 같은)에서는 style태그는 React가 생성하는 모든 DOM 노드와 마찬가지로, 사용자의 기기에서 동적으로 만들어집니다.

- 🤚 Server-Side 렌더링 문맥(Next나 Remix)에서는, 이러한 작업은 서버에서 발생합니다. 만들어진 HTML은 style태그를 포함하게 될 것입니다.

사용자가 우리의 애플리케이션과 상호작용 할 떄, 특정 스타일이 생성되거나 삭제, 수정될 수도 있습니다. 예를 들어 , 조건부로 렌더링되는 styled-components가 있다고 가정해봅시다.

```jsx
function Header() {
  const user = useUser();
  return (
    <>
      {user && (
        <SignOutButton onClick={user.signOut}>
          Sign Out
        </SignOutButton>
      )}
    </>
  );
}
const SignOutButton = styled.button`
  color: white;
  background: red;
`;

```

처음에, user가 정의되어 있지 않다면, SignOutButton은 렌더링 되지 않습니다. 그리고 어떠한 스타일도 아직 존재하지 않습니다. 그 후, 만약 사용자가 로그인을 하고, 우리의 애플레케이션이 다시 렌더링되면, styled-components가 작동해 이러한 스타일을 style태그에 주입하게 됩니다.

본질적으로, 모든 styled컴포넌트는 일반 React컴포넌트지만, 조금의 부작용이 있습니다. 그들은 자신의 스타일을 style태그에 렌더링합니다.

(더 자세한 방법에 대해 파봐야겠다고 느꼈습니다.!)

### CSS-in-JS의문제

우리가 지금 껏 배운 것을 요약해보면 다음과 같습니다.

- 🤚 리액트 서버 컴포넌트는 새 유형의 컴포넌트를 우리에게 주는, 새로운 패러다임입니다. 서버 컴포넌트는 오로지 서버에서만 렌더링됩니다. 그들의 코드는 클라이언트 번들에 포함되지 않습니다.

- 🤚 styled-components는 동적으로 첨부된 CSS와 함께 리액트 컴포넌트를 만듭니다. 이것은 컴포넌트가 다시 렌더링 될 때, 업데이트되는 style태그를 관리함으로서 작동합니다.

근본적으로 styled-component는 브라우저에서 동작하도록 설계되었으며, 서버 컴포넌트는 브라우저와 상호작용하지 않는다는 점입니다.

내부적으로, styled-components는 useContext훅으로 인해 비대해질 수 있습니다. 이것은 styled-components가 React 라이프사이클에 의존적이다는 뜻이고, 리액트 서버 컴포넌트에서는 이런 라이프사이클이 존재하지 않습니다. 만약 우리가 새로운 리액트 서버 컴포넌트의 패턴에서 styled-components를 사용하길 원한다면,단 하나의 styled-components를 렌더링 하기 위해 모든 리액트 컴포넌트는 클라이언트 컴포넌트가 되어야만 합니다.

저는 잘 모르지만, 스타일링이 포함되지 않는 리액트 컴포넌트를 갖는 것은 저에겐 꽤 드뭅니다. 저는 90%의 컴포넌트 파일이 styled-components를 사용하고 있다고 추정합니다. 대부분의 이런 컴포넌트들은 완전히 정적입니다. 상태나 다른 클라이언트 컴포넌트의 기능을 사용하진 않습니다.

이것은 우리가 새 리액트 서버 컴포넌트의 패턴을 충분히 활용할 수 없는 것을 의미하여 실망스럽지만, 당황하지 않아도 됩니다.

그리고 만약, styled-components를 사용하고 있는 전체의 10%만 서버 컴포넌트가 된다면, 이것은 엄청난 개선입니다! 우리의 애플리케이션은 더 가벼워지고, 더 빨라질 수 있습니다.

그럼 styled-components나 Emotion가 Server component와 호환되도록 라이브러리를 업데이트 하지 않았나요? 우리는 이 변화가 1년 넘게 다가오고 있다는 것을 알고 있는데, 왜 아직 해결책을 찾지 못한 것일까요?

styled-components 팀은 서버 사이드 렌더링 중에 모든 스타일을 올바르게 적용하기 위해 컴포넌트 간 데이터를 공유할 방법이 필요합니다. 솔직히 말해서, React Context 없이, 이것이 어떻게 동작하면 좋을지 상상하는 것은 꽤나 힘든 일입니다. 유일한 해결책은 완전히 다른 접근 방식으로 현재 라이브러리를 다시 작성하는 것입니다. 이는 상당한 호환성 문제를 갖고 있고, 비현실적입니다.

### CSS-in-JS라이브러리의_제로_런타임

지금까지 이야기는 다소 어두웠습니다. 리액트 서버 컴포넌트 사이에는 근본적인 호환성 문제가 있고, 이를 위한 추가적인 도구를 제공받지 않았습니다.

다행히, React 커뮤니티는 이 문제에 대해 잠자고 있지 않았습니다. styled-components와 유사한 API를 제공하지만, 서버 컴포넌트와 완전히 호환되는 여러 라이브러리가 개발 중입니다!✨

리액트 라이프사이클에 종속적인 것 대신에, 이런 도구들은 다른 접근 방식을 사용합니다. 모든 절차는 <b>컴파일 시간에 끝납니다.</b>

대부분의 리액트 애플리케이션은 빌드 단계가 존재합니다(보통 Typescript나 JSX를 자바스크립트로 변환하는 과정을 거치게 됩니다.). 이 작업은 우리의 애플리케이션이 배포환경으로 동작하기 전, 배포될 때 진행됩니다. <b>런타임 대신 우리의 styled-components를 이 단계에서 처리하면 어떨까요?</b>

이 아이디어는 우리가 이 챕터에서 다룰 여러 라이브러리들의 핵심 아이디어입니다.

### Linaria

[Linaria](https://github.com/callstack/linaria)는 2017년에 처음 만들어졌습니다. 이 라이브러리는 styled-components 만큼이나 오래되었습니다!

API는 styled-components와 거의 동일하게 보입니다:

```jsx
import styled from '@lineria/react';

export default function HomePage(){
  return (
    <BigRedButton>
      Click Me!
    </BigRedButton>
  )  
}

const BigRedButton = styled.button`
  font-size:2rem;
  color:red;
`
```

컴파일 단계동안, Linaria는 이 코드를 변환하고, 모든 스타일을 CSS 모듈로 이동시킵니다. Linaria를 실행한 후, 코드는 이렇게 보일 것입니다;

```jsx
/* /components/Home.module.css */

.BigRedButton{
  font-size:2rem;
  color:red;
}

/* /components/Home.js */

import styled from './Home.module.css';

export default function HomePage(){
  return (
    <button className = {styles.BigRedButton}>
      Click Me!
    </button>
  )
}
```

만약 당신이 CSS모듈과 친숙하지 않다면, CSS 모듈은 CSS에 대한 가벼운 추상화입니다. 거의 일반적인 CSS처럼 다룰 수 있지만, 전역적으로 고유한 이름에 대해 걱정할 필요가 없습니다. 컴파일 시간동안, .BigRedButton와 같은 일반적인 이름들이 .abc123과 같은 고유한 이름들로 변환됩니다.

<b>중요한 점은, CSS모듈들은 이미 널리-사용되고 있다는 점입니다.</b> Next.js와 같은 프레임워크는 이미 CSS 모듈에 대한 강력한 지원을 갖고 있습니다.

Linaria팀은 지름길을 선택했습니다. 우리는 styled-components를 작성할 수 있고, Lineria는 이를 CSS모듈로서 사전 처리한 후 , 평범한 CSS로 변환합니다. 이 모든 과정은 컴파일 시간에 일어납니다.

### 런타임VS컴파일시간의_트레이드오프

서버 컴포넌트 패턴의 등장 전에, Lineria와 같은 컴파일 시간 라이브러들이 구축되고 있었습니다. 성능적으로 이점이 있다는 것에는 매우 설득력이 있습니다. styled-componenets는 우리의 자바스크립트 번들에 11킬로바이트를 추가하지만, Lineria는 모든 작업이 사전에 이루어지기 때문에, 0KB를 추가합니다. 추가적으로, 서버사이드 렌더링이 조금 더 빨라집니다. 스타일을 수집하고 적용하는 데 어떤 시간도, 소비할 필요가 없어지기 떄문입니다.

이것은 styled-components의 런타임이 쓸모 없다는 것을 의미하지 않습니다. styled-components는 컴파이리 시간에는 불가한 일들을 처리할 수 있습니다. 예를 들어, styled-components는 어떤 React상태가 바뀔 때, 동적으로 CSS를 업데이트 할 수 있습니다.

다행히도, styled-components가 처음 만들어진 이후 거의 10년 동안 CSS는 훨씬 더 강력해졌습니다. 우리는 대부분의 동적 사용 사례를 처리하기 위해 CSS 변수를 사용할 수 있습니다. 요즘에는 런타임이 특정 상황에서 개발자 경험을 약간 더 좋게 만들 수 있지만, 제 생각에는 더 이상 정말로 필요하지는 않습니다.

이는 Linaria 및 다른 컴파일 시간 CSS-in-JS 라이브러리가 styled-components/Emotion의 완벽한 대체품이 될 수 없다는 것을 의미합니다. 우리는 동적 컴포넌트를 다시 작업하는 데 약간의 시간을 할애해야 할 것입니다. 하지만 이는 완전히 다른 CSS 도구로 전환하는 것에 비하면 아주 적은 작업량입니다.

### Lineria로의_전환

그래서, 우리는 우라의 styled-components를 Lineria로 마이그레이션 해야만 할까요?

불행하게도, 문제가 하나 있습니다. Lineria는 활발히 유지되고 있지만, Next.js에 대한 공식적인 방법은 없으며, Lineria를 Next.js와 같이 작동시키는 것은 간단하지 않습니다.

가장 유명한, [next-linaria](https://github.com/Mistereo/next-linaria)는 업데이트 된지 3년이 지났고, App Router/React Server Component와 호환이 되지 않습니다. 새로운 옵션이 있습니다.[next-with-linaria](https://github.com/dlehmhus/next-with-linaria).그러나 프로덕션에서 사용하지 말라는 큰 경고가 있습니다.😅 그래서, 모험을 즐기는 개발자들에게는 옵션이 될 수 있지만, 이것을 추천하는 것이 편안하다고 느끼지 않습니다.

## PandaCSS

![](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcss-in-rsc%2Fpandacss.png&w=256&q=75)

[Panda CSS](https://github.com/chakra-ui/panda)은 인기 있는 라이브러리인 Chakra UI를 개발한 사람들이 만든 현대적인 CSS-in-JS 라이브러리입니다.

Panda CSS는 많은 다양한 인터페이스를 갖고 있습니다. Panda CSS를 클래스를 사용하여(mb-5 와 같은) 사용할 수 있고, variants와 cva를 사용해서 Stitches처럼 사용할 수도 있습니다. 또는 styled-components처럼 사용할 수도 있습니다.

styled API를 사용해서 다음과 같이 작성할 수 있습니다.

```jsx
import {styled} from '../styled-system/jsx'

export default function HomePage(){
  return (
    <BigRedButton>
        Click Me!
    </BigRedButton>
  )
}

const BigRedButton = styled.button`
  font-size:2rem;
  color:red;
`
```

Linaria처럼, Panda CSS는 컴파일 되지만, tailwind 스타일의 유틸리티 클래스로 컴파일 됩니다. 최종 결과는 다음과 같을 것입니다:

```css
.font-size_2rem{
  font-size:2rem;
}

.color_red{
  color:red;
}
```

```jsx
/* /components/Home.js */
export default function Homepage() {
  return (
    <button className="font-size_2rem color_red">
      Click me!
    </button>
  );
}
```

color:red와 같은 모든 독특한 CSS 선언에 대해, Panda CSS는 중앙 CSS 파일에 새로운 유틸리티 클래스를 생성합니다. 이 파일은 우리의 리액트 애플리케이션의 모든 라우트에서 로드될 것입니다.

그러나 경험해 본 결과, 이것은 저에게 맞지 않는다는 것을 발견했습니다. 제가 가진 몇 가지 문제는 피상적이나 사소한 것들입니다. 예를 들어, Panda CSS는 프로젝트 파일을 어지럽히는 많은 것들을 생성합니다.

저에게 더 큰 문제는 Panda CSS가 컴포넌트 간 상호참조될 수 없다는 것입니다.

예시를 들어 설명하는 것이 더 빠를 것 같습니다. 이 블로그에서, TextLink컴포넌트가 있습니다. 이 컴포넌트는 Next.js의 Link컴포넌트를 래핑한 컴포넌트입니다. 그러나 이 컴포넌트는 특정한 상황에 따라 다른 스타일을 갖고 있습니다. 예를 들어 TextLink가 Aside내부에 있을 떄, 밑줄을 그립니다.

저는 이 Aside컴포넌트를 부가적인 정보를 위해 사용합니다. 기본 TextLink 스타일이 상황에 맞지 않는다고 느꼈기 때문에, 여러 오버라이드를 적용하고 싶었습니다  styled-components에서 다음고 같이 표현할 수 있었습니다.

```jsx
import Link from 'next/link';

import {AsideWrapper} from '@/components/Aside'

const TextLink = styled(Link)`
  color:var(--color-primary);
  text-decoration:none;

  ${AsideWrapper} & {
    color:inherit;
    text-decoration:underline;
  }
`
```

엠퍼샌드 문자&는 CSS언어에 추가되었지만, CSS 전처리가와 도구에서는 관례적으로 사용되어 왔습니다. styled-components에서는 이 문자는 현재 선택자로 평가됩니다. 이 코드를 렌더링하면, 생성된 CSS는 다음과 같을 것입니다.

```css
.textlink_abc123 {
  color:var(--color-primary);
  text-decoration:none;
}

.aside_def456 .textlink_abc123 {
  color:inherit;
  text-decoration:underline;
}
```
제가 CSS와 적업하면서, 저는 한가지 규칙을 따라갔습니다: <b>특정 컴포넌트에 대한 모든 스타일은 한 곳에 작성되어야 합니다.</b> 주어진 요소에 적용할 CSS를 찾기 위해, 애플리케이션 전체를 뒤져야 할 필요는 없어야 합니다!

이것이 Tailwind의 강력한 점 중 하나입니다. 모든 스타일이 요소 자체에 함께 위치해 있습니다. 다른 컴포넌트가 끼어들어 한 요소에 스타일을 적용하는 것에 대해 걱정할 필요가 없습니다!

Panda CSS에서는 요소 자체가 아니라 CSS선언을 고유하게 식별합니다. 이런 점이 상관없다면, Panda CSS는 애플리케이션에 좋은 선택지가 될 수 있습니다.

### PigmentCSS

[MaterialUI](https://mui.com/material-ui/)의 대부분은 Emotion으로 작성되어 있습니다. 그들은 React Server Component의 호환성 문제들을 고심해왔고, 이를 해결하기 위해 조치를 취하기로 결정하였습니다.

그들은 새 라이브러리, [Pigment CSS](https://github.com/mui/material-ui/tree/master/packages/pigment-css-react)를 발표했습니다. 이것의 API는 아래의 코드와 같이 사용됩니다.

```jsx
import { styled } from '@pigment-css/react';
export default function Homepage() {
  return (
    <BigRedButton>
      Click me!
    </BigRedButton>
  );
}
const BigRedButton = styled.button`
  font-size: 2rem;
  color: red;
`;
```

Pigment CSS은 컴파일 시간에 동작하고, Linaria처럼 CSS 모듈로 컴파일을 합니다. Next.js와 Vite에 플러그인 또한 가지고 있습니다.

사실, 이 Pigment CSS은 저수준의 도구인 [WhW-in-JS](https://github.com/Anber/wyw-in-js)을 사용합니다. 이 도구는 Linaria의 코드로부터 발전되었으며, CSS 모듈로 컴파일하는 로직을 분리하고, 일반화하여, Pigment CSS와 같은 라이브러리가 그 위에 자체 API를 구축하게 만들었습니다.

솔직하게, 이것은 저에게 완벽한 해답같습니다. CSS 모듈은 이미 충분히 검증되고 최적화되어 있습니다. Pigment CSS은 성능과 DX측면에서 매우 훌륭합니다.

Material UI의 다음 주요 버전은 Pigment CSS를 지원할 예정이며, Emotion에 대한 지원을 완전히 중단할 예정입니다. 그 결과 Pigment CSS는 아마도 가장 널리 사용되는 CSS-in-JS 라이브러리 중 하나가 될 것입니다.

### 앞으로

우리는 여러 옵션에 대해 살펴보았습니다.그러나 물음표는 아직 존재합니다. 우리가 만약 "과거의" CSS-in-JS라이브러리를 사용하면, 우리는 무엇을 해야 할까요?

조금 직관에 반하는 이야기일지 몰라도, 많은 경우 실제로 아무것도 하지 않아도 된다고 생각합니다.😅 온라인에서 많은 논의는 마치 현대적인 React/Next.js 애플리케이션에서 마치 styled-components를 사용할 수 없거나, 성능 상 끔찍한 저하가 발생하는 것처럼 들리게 하지만, 실제로 그렇지 않습니다.

많은 사람들이 React Server Component와 SSR을 혼동하고 있습니다. SSR은 여전히 항상 그래왔던 것처럼 정확히 동일하게 동작하며, 이 모든 것들에 의해 영향을 받지 않습니다. Next의 App Router나 React Server Component로 마이그레이션 해도, 여러분의 애플리케이션은 아마, 조금 더 빨라질 것입니다!

성능적인 측면에서, React Server Componen와 제로 런타임의 CSS 라이브러리들의 가장 큰 이점은 TTI(Time To Interactive)입니다. TTI는 사용자에게 보여지는 UI와 UI가 완전히 상호작용할 준비가 되는 간격입니다. 이 부분을 간과하면, 사용자가 나쁜 경험을 하게 될 수 있습니다. 사람들이 무언가 클릭하면 작동할 것으로 기댇하지만, 애플리케이션에서는 하이드레이션 중이기 때문에, 아무일도 일어나지 않습니다.

만약 당신의 애플리케이션이 hydrate과정이 오래 걸린다면, 제로-런타임 CSS라이브러리로 마이그레이션 하는 것은 사용자 관점에서 긍정적 영향을 줄 수 있습니다. 그러나, 이미 당신의 애플리케이션이 좋은 TTI를 갖고 있다면, 이 마이그레이션의 장점은 없을 수 있습니다.

개발자로서, 우리는 최신, 좋은 도구들을 사용하길 원합니다. 여러 개의 'use client'지시문을 추가하는 것이 새로운 최적화로부터 큰 의미를 얻지 못하는 걸 알면서도, 재미있지 않다면, 이것이 큰 마이그레이션을 진행할 이유가 될까요?

이 글은 [원본 글](https://www.joshwcomeau.com/react/css-in-rsc/)을 번역한 글입니다. 불필요한 부분, 틀린 부분이 존재할 수 있습니다.😅





