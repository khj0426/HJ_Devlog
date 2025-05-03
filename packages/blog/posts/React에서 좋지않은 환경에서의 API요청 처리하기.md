---
title: 'React에서 좋지않은 환경에서의 API요청 처리하기'
excerpt: '어떻게 처리할 수 있을까?'
date: '2024-04-15'
author: '김효중'
category: 'React'
image: '/images/postImg/0415.webp'
---

![](/images/postImg/0415.webp)

많은 블로그 글들은 리액트 앱에서 api/async 데이터를 처리하는 것을 이야기합니다.(componentDidMound,useEffect 훅,redux 등을 사용하면서요)

그러나 이러한 글들은 일반적으로 낙관적인 상태에 대해서를 가정합니다. 절대 중요하게 고려할 만한 것에 대해 언급을 하지 않습니다.

경쟁상태가 일어날 수도 있고, UI는 일관적이지 않은 상태에 처할 수도 있습니다.

아마 다음 이미지가 위의 상황에 적절할 것 같습니다.

![](https://sebastienlorber.com/static/14ad380d2d7549d8527781650c272e77/5771b/trump-macron.png)

당신은 <b>Macron</b>을 검색했고, 마음을 바꿔 <b>Trump</b>를 검쟁하기로 결정했습니다. 그러나 당신은 당신이 원하는 것(Trump)의 검색결과와 당신이 검색한 결과(Macron)의 불일치를 갖게 되었습니다.

### 왜 이런 상황이 일어날까요?

가끔, 여러 요청들은 병렬적으로 일어납니다, 그리고 우리는 마지막 요청이 나중에 resolve될것이라고 추정합니다. 실제로는, 마지막 요청이 처음으로 resolve될 수 있고, 그냥 요청에 실패할 수도 있고, 처음의 요청이 마지막에 resolve될 수도 있습니다.

![](data:image/png;base64,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)

이런 상황은 당신이 생각한 것보다 훨씬 자주 일어납니다. 몇가지 애플리케이션에서, 이것은 굉장히 심각한 문제를 일으킬 수 있습니다. (유저가 잘못된 상품을 구매하는 것과 같은 행동 등)

이런 이유로는 크게 다음의 것들이 있을 수 있습니다.

- 🤐 네트워크가 느리거나,나쁘거나,예측할 수 없고 다양한 대기 시간을 갖습니다.
- 🥲 단순히 운이 없었습니다.
- 🥲 백엔드가 과부하 상태에 있으며, 상황에 따라 일부 요청을 제한하고 있을 수 있으며, 사비스 거부 공격 등을 받고 있을 지도 모릅니다.

개발자들은 이런 것들을 개발단계에서 확인할 수 없고, 일반적으로 네트워크 상황이 좋은 것을 가정합니다. 때로는 자신의 컴퓨터에서 백엔드 API를 실행하면서 지연 시간을 거의 0ms에 가깝게 만듭니다.

이 글에서, 현실적인 네트워크 상황과 데모를 통해서, 이 문제들을 확인해볼 것입니다. 또한 어떻게 이 문제들을 개선할 수 있는지도 살펴볼 것입니다.

당신은 아마 예제나 다른 배경 속에서 아래와 같은 코드를 읽어보았을 것입니다.

```tsx
const StarWarsHero = ({id}) => {
    const [data,setData] = useState(null)

    useEffect(() => {
        setData(null)

        fetchStarwarsHeroData(id).then((res) => {
            setData(res)
        }).catch((e) => {
            console.error(e)
        })
    },[id])

    return <div>{data ? data.name : <Spinner />}</div>
}
```

```tsx
class StarwarsHero extends React.Component {
  state = { data: null };

  fetchData = id => {
    fetchStarwarsHeroData(id).then(
      result => setState({ data: result }),
      e => console.warn('fetch failure', e),
    );
  };

  componentDidMount() {
    this.fetchData(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }

  render() {
    const { data } = this.state;
    return <div>{data ? data.name : <Spinner />}</div>;
  }
}

```

만약 스타워즈 히어로들의 슬라이더가 있다고 생각해봅시다. 위의 2가지의 버전의 코드 모두 같은 결과를 이끌 것입니다.

양옆으로 이동하는 화살표가 있고, 화살표를 누를 떄마다 id가 바뀝니다. 만약 매우 빠르게 화살표를 누르면,아무리 좋은 네트워크와 빠른 API의 응답속도를 갖고 있더라도, 무언가 잘못되었다는 것을 느끼게 될 것입니다. 디바운싱이 여러분을 보호한다고 생각하지 마세요. 그것은 단지 나쁜 확률을 줄여주는 것 뿐입니다.

### 나쁜 네트워크 상황을 가정해봅시다.

나쁜 네트워크 조건을 만드는 몇가지 유틸을 만들어보겠습니다.

```ts
import {sample} from 'lodash'

//랜덤한 값만큼 지연된 promise를 반환합니다.
const delayRandomly = () => {
    const timeout = sample([0,200,500,700,1000,3000])
    return new Promise((resolve) => setTimeout(resolve,timeout))
}

const throwRandomly = () => {
    const shouldThrow = sample([true,false,false,false])
    if(shouldThrow) {
        throw new Error('async failed')
    }
}
```
이제 만든 유틸함수를 이융해 데이터 패칭을 해보겠습니다.

```tsx
useEffect(() => {
    setData(null)

    fetchStarwarsHeroData(id).then(async data => {
        await delayRandomly()
        return data
    }).then((result) => {
        setData(result)
    }).catch((e) => {
        console.error('fetch failed',e)
    })
},[id])
```

이제 네트워크 요청들이 랜덤하게 지연되고, 그 중 일부는 실패하는 상황을 만들어 보겠습니다.

```tsx
useEffect(() => {
  setData(null);

  fetchStarwarsHeroData(id)
    .then(async data => {
      await delayRandomly();
      throwRandomly();
      return data;
    })
    .then(
      result => setData(result),
      e => console.warn('fetch failure', e),
    );
}, [id]);
```

당신은 이제, 이 코드는 쉽게 이상하고 일관되지 않은 UI로 결과를 이끈다는 것을 확인할 수 있습니다.

### 어떻게 이 문제를 방지합니까?

3개의 요청이 있다고 가정해봅시다. R1,R2,R3의 요청이 순서대로 발생하고 아직 처리되지 않은 pending상태라고 가정합시다. 해결책은 마지막에 요청된 R3만 처리하는 것입니다.

이렇게 R3만 처리하려면 다음의 방법이 존재합니다.

- 🤔이전 API 호출의 응답을 무시합니다.
- 🤔이전 API 호출을 취소합니다.
- 🤔취소하고 무시합니다.

첫번째 경우부터 살펴보겠습니다. 

```tsx
//ref로 마지막에 발행된 pending요청을 저장합니다.

const lastPromise = useRef()

useEffect(() => {
    setData(null)

    const currentPromise = fetchStarwarsHeroData(id).then(async data => {
        await delayRandomly()
        throwRandomly()

        return data
    })

    //마지막 Promise를 ref에 저장합니다.
    lastPromise.current = currentPromise

    currentPromise.then(result => {
        if(currentPromise === lastPromise.current){
            setData(result)
        }
    }).catch((e) => {
        if(currentPromise === lastPromise.current) {
            console.error('failed fetch',e)
        }
    },[id])
})
```

일부는 위와 같은 Promise의 필터링에 대해 ID를 사용할 수도 있다고 이야기하지만, 좋은 생각은 아닙니다. 만약 사용자가 다음 슬라이드 버튼을 누르고, 다시 이전 슬라이드 버튼을 누른다면, <b>같은 영웅에 대해 2개의 다른 요청</b>이 발생합니다. 일반적으로 이것은 문제가 되지 않지만, promise의 정체성을 사용하는 것이 더 일반적인 해결책입니다.

이전 API를 취소하는 것도 방법이 될 수 있습니다. 브라우저는 응답 파싱을 피하고 일부 불필요한 네트워크 사용을 막을 수 있습니다. fetch는 <b>AbortSignal</b>로 취소를 지원합니다.

```ts
const abortController = new AbortController()

//요청을 abort signal과함께 시작합니다.
//이 신호는 abortController에 의해 취소 가능합니다.
fetch(`https://swapi.co/api/people/${id}`,{
    signal:abortController.signal
})

//fetch요청을 취소합니다.
abortController.abort()
```

abort signal은 작은 이벤트 emitter와 같은 역할을 합니다. 당신은 그저 AbortController로 요청을 취소할 수 있고, 이 신호와 함께 시작되는 모든 요청은 취소될 수 있습니다.

이제 이 기능을 통해 경쟁상태를 해결해봅시다.

```tsx
//마지막으로 발행된 요청을 취소하는 abort Controller를 저장합니다.

const lastAbortController = useRef()

useEffect(() => {
    setData(null)

    //새로운 요청이 일어날 떄마다
    //처음 해야 할 것은 이전 요청을 취소하는 것입니다.

    if(lastAbortController.current){
        lastAbortController.current.abort()
    }

    //새로운 AbortController를 만들고 ref에 저장합니다.
    const currentAbortController = new AbortController()
    lastAbortController.current = currentAbortController

    const currentPromise = fetchStarwarsHeroData(id,{
        signal:currentAbortController.signal
    }).then(async data => {
        await delayRandomly()
        throwRandomly()
        return data
    }).catch((e) => {
        console.error(e)
    })
},[id])
```

이 코드는 처음에는 좋아 보일지 몰라도, 실제 안전하지는 않습니다. 아래와 같은 코드가 있다고 가정해봅시다.

```ts
const abortController = new AbortController()

fetch('/',{signal:abortController.signal}).then(async res => {
    await delayRandomly()
    throwRandomly()
    return res.json()
})
```

만약 우리가 요청중인 것을 취소한다면, 브라우저는 취소한 것에 대해 아무런 행동도 취하지 않습니다. 그러나 만약 중단이 then콜백을 실행할 때 발생한다면, 이 코드에서 중단된 부분을 처리할 곳이 없어집니다. 우리가 추가한 가짜 지연 동안 중단이 발생한다면, 그 지연을 취소하거나 흐름을 멈추지 않을 것입니다.

```ts
fetch('/', { signal: abortController.signal }).then(
  async response => {
    await delayRandomly();
    throwRandomly();
    const data = await response.json();
    //중단이 발생하면 흐름을 멈추지 않거나 취소합니다.
    if (abortController.signal.aborted) {
      return new Promise(() => {});
    }

    return data;
  },
);
```

이제 다시 문제로 돌아와 봅시다. 이제 요청을 취소할 때의 최종적인 안전한 버전이 등장합니다. 그러나 이 부분에서도 결과를 필터링할 때 abortController가 필요합니다. 또한 클린업-함수도 적용해봅시다. 이 버전은 앞서 버전보다 더 간단합니다.

```tsx
useEffect(() => {
  setData(null);

  //현재 요청에 대해 AbortController를 만듭니다.
  const abortController = new AbortController();

  fetchStarwarsHeroData(id, {
    signal: abortController.signal,
  })
    //네트워크 실패나 랜덤 지연을 시킵니다.
    .then(async data => {
      await delayRandomly();
      throwRandomly();
      return data;
    })
    .then(
      result => {
        if (abortController.signal.aborted) {
          return;
        }
        setData(result);
      },
      e => console.warn('fetch failure', e),
    );

  //컴포넌트의 언마운트, id값이 변경될 떄 진행중인 요청을 취소합니다.
  return () => {
    abortController.abort();
  };
}, [id]);
```

### 라이브러리 사용하기

이런 모든 것을 하기에는 복잡하고, 개발하는 과정이 버거울 수 있습니다. 다행히도 이런 문제를 해결하는 것에 도움이 되는 몇가지 라이브러리가 존재합니다.

👨‍💻Redux-saga: Redux-saga에는 여러 take 메소드가 있지만, 일반적으로 takeLatest를 사용하는 많은 예시를 볼 수 있습니다. takeLatest는 이런 경쟁상태로부터 보호합니다.

```bash
Store에 전달된 액션을 패턴과 일치시킵니다.
특정 패턴이나 액션 타입과 일치하는 액션이 발생할 떄마다 새로운 사가를 실행합니다.
이전에 시작된 사가 작업이 실행중이라면, 해당 작업을 취소합니다.
```

```ts
function* loadStarwarsHeroSaga(){
    yield* takeLatest('LOAD_STATWARS_HERO',
        function* loadStarwarsHero({payload}) {
            try{
                const hero = yield call(fetchStarwarshero,[
                    payload.id
                ])
                yield put({
                    type:'LOAD_STARWARS_HERO_SUCCESS',
                    hero
                })
            }
            catch(e){
                yield put({
                    type:'LOAD_STARWARS_HERO_FAIL',
                    e
                })
            }
           
        }
    )
}
```

이전 <b>loadStarwarsHero</b>의 제너레이터 실행은 취소될 것입니다. 불행히도, 기본적인 API요청은 실제 취소되지 않습니다. 하지만 Redux-saga는 <b>성공,오류 액션이 마지막에 요청된 데이터만 Redux로 저장되는 것을 보장합니다.</b>

또한, 이러한 보호 기능에서 벗어나고 싶다면 take나 takeEvery를 사용할 수도 있습니다.

👨‍💻Apollo: Apollo는 GraphQL 쿼리 변수를 전달할 수 있습니다. 스타워즈 영웅의 ID가 바뀔때마다, 새로운 요청이 발생하고, 적절한 데이터를 불러옵니다.

Apollo는 여러분이 id: 2를 요청할 경우, 사용자 인터페이스(UI)가 다른 스타워즈 영웅의 데이터를 반환하지 않도록 항상 보장합니다.

```ts
const data = useQuery(GET_STARWARS_HEROm,{
    variables:{id}
})

if(data){
    assert(data.id === id)
}
```

만약 리액트가 아닌 바닐라 자바스크립트의 Promise를 다룬다면, 다음의 라이브러리들을 사용하라 수 있습니다.

👨‍💻awesome-only-resolves-last-promise: 이 라이브러리는 마지막 비동기 호출의 결과만 처리하도록 보장하는 라이브러리입니다.

```js
import { onlyResolvesLast } from 'awesome-only-resolves-last-promise';

const fetchStarwarsHeroLast = onlyResolvesLast(
  fetchStarwarsHero,
);

const promise1 = fetchStarwarsHeroLast(1);
const promise2 = fetchStarwarsHeroLast(2);
const promise3 = fetchStarwarsHeroLast(3);

// promise1: won't resolve
// promise2: won't resolve
// promise3: WILL resolve
```

### 결론

다음 React 데이터 로딩 사용 사례에 대해, 경쟁 상태를 올바르게 처리하는 것을 고려하시기 바랍니다.

개발 환경에서 API 요청에 약간의 지연을 강제로 추가하는 것도 추천합니다. 잠재적인 경쟁 상태와 나쁜 로딩 경험이 더 쉽게 눈에 띌 것입니다. 개발자마다 개발 도구에서 느린 네트워크 옵션을 켜는 것을 기대하는 대신, 이 지연을 필수적으로 만드는 것이 더 안전하다고 생각합니다. 👶
