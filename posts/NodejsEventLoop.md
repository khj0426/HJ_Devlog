---
title: '# Node환경에서의 이벤트 루프'
excerpt: '이벤트 루프, 노드에서는 어떻게 작동할까?'
date: '2022-06-30'
author: '김효중'
category: 'Js'
---

## 이벤트 루프

<mark>이벤트루프</mark>는 프로그래밍 패턴을 지칭하는 용어입니다. 프로그래밍의 메시지, 이벤트를 처리하는 어떤 구조체 라고 볼 수 있습니다.

이벤트 루프는 메시지와 이벤트를 <b>보내는 시점</b>과 <b>처리하는 시점</b>을 다르게 하는 것을 목표로 합니다. 
일반적으로 이벤트 큐를 통해 들어오는 이벤트를 처리하고, 해당 이벤트의 콜백을 실행하는 역할을 합니다.

### 자바스크립트에서 이벤트 루프는 왜 필요할까요 ?

만약 프로그램이 여러 작업을 수행하면서 다른 유저가 발생하는 이벤트에 잘 응답하지 않는다면 유저 입장에서는 프로그램이 잘 동작하지 않고, 매끄럽지 않는다는 느낌을 받을 것 입니다.

![](https://pbs.twimg.com/media/EXgofvKU8AAnjjG.jpg)

한 프로그램에서 여러 작업을 동시에 실행하는 <mark>동시성</mark>은 프로그램에 중요한 요소 중 하나입니다.

이러한 동시성을 구현하기 위해 가장 대표적인 전략은 <mark>멀티 쓰레딩</mark>입니다.

멀티 쓰레딩은 프로그램이 여러 연산을 쉽게 처리하기 위해 더 많은 쓰레드를 도입하는 것입니다.
그러나 자바스크립트는 <b>브라우저에서 실행되는 간단한 언어</b>로 처음 탄생했기에, 어렵고 복잡한 멀티 쓰레딩 대신 <b>싱글 스레드</b>로서 동작하도록 하였습니다.

동시성을 보장하고 , 싱글 스레드의 일관성을 유지하기 위해 <mark>비동기 프로그래밍 방식</mark>을 자바스크립트는 선택하게 됩니다.
비동기 프로그래밍은 특정 코드의 처리가 처리가 끝나거나, 처리되는 도중에도 아래로 쭉 내려가며 작업을 하는 것입니다.

### 그럼 자바스크립트는 어떻게 비동기를 구현하였나요?

자바스크립트의 비동기적인 동작을 관리하기 위해 이벤트루프라는 개념이 사용됩니다. 그럼 Node에서의 이벤트 루프에 대해 알아볼까요??

## Node.js의 구조

Node.js의 구조를 뜯어보면 아래와 같은 구조입니다.

- v8엔진
- 내장 라이브러리들
- libuv

라는 크게 3가지의 구조로 나뉘는 것을 볼 수 있는데 Node.js에서 동작하는 이벤트 루프는 <mark>libuv</mark>에 구현되어 있습니다.

![](https://miro.medium.com/v2/resize:fit:1400/1*yEW6321eqBd_-C0D7LsBQw.png)

### libuv?

libuv는 C++로 작성된, Node.js가 사용하는 <b>비동기 I/O</b>라이브러리입니다. 파일시스템이나 네트워크 같은 비동기 작업을 처리하는 역할을 담당하고 V8엔진과 커널 사이 인터페이스를 제공해줍니다.

![libuv](/images/postImg/libuv.jpg)

V8엔진은 자바스크립트 코드를 읽다가 비동기로 처리해야 할 작업이 있다면 libuv로 넘겨버립니다.
작업을 넘겨받은 libuv는 커널이 넘겨받은 작업을 수행할 수 있는지 판단합니다.

만약 지원한다면, 앞서 그림처럼 커널에게 비동기적으로 요청 후 응답이 오면 응답을 전달해줍니다.
커널이 작업을 지원하지 않는다면 어떻게 할까요?

이 경우 libuv 안에있는 스레드 풀에 작업을 요청하게 됩니다.

- 비동기로 처리해야 하는 작업은 libuv에 위임합니다.
- libuv가 커널에 받은 작업을 수행할 수 있는지 판단합니다.
- 커널이 해당 작업을 지원한다면 비동기적으로 요청 후 응답을 전달합니다.
- 그렇지 않다면 libuv내부의 스레드 풀을 사용합니다.

![](https://miro.medium.com/v2/resize:fit:828/format:webp/1*v2QSJRO5cmWGoLMvfAWfiQ.png)

## Node.js에서의 이벤트 루프

![](https://miro.medium.com/v2/resize:fit:828/format:webp/1*A29uBxiS_ZtjfnyHHUD98g.png)

위 그림을 보면 libuv안에 이벤트 루프 + 이벤트 큐 + 스레드 풀이 있는 걸 볼 수 있습니다.
NodeJs에서의 콜백함수들은 libuv내에 위치한 이벤트 루프에서 관리되고 처리됩니다.

libuv에서 들어온 비동기 요청을 판별하고, 작업이 완료되면 콜백을 각 페이즈나 nextTickQueue 또는 microTaskQueue에 이를 넣어둡니다.

libuv는 <mark>라운드 로빈방식</mark>으로 각 페이즈를 순회하면서 들어온 콜백이 있는지 확인합니다. 그리고 각 페이즈들은 선입선출 방식으로 콜백을 처리합니다.

Node js의 이벤트 루프는 

- Timer Phase 
- Pending Callbacks Phase 
- Idle,Prepare Phase
- Poll Phase
- Check Phase
- Close Callbacks Phase

로 구성되어있습니다. 페이즈 전환은 위의 순서처럼

<p>Timer Phase -> Pending Callbacks Phase -> Idle,Prepare Phase -> Poll Phase -> Check Phase -> Close Callbacks Phase -> Timer Phase 순으로 순회합니다.</p>

![](https://velog.velcdn.com/images%2Fadam2%2Fpost%2F76a6cf8c-7ed1-4150-bc00-79514799d3c5%2Fimage.png)

각 페이즈는 자신의 큐를 하나씩 갖고 있는데, 이 큐에 <mark>이벤트 루프</mark>가 처리해야 하는 콜백들이 순서대로 담겨있습니다.

Node.js가 페이즈에 진입을 하면 이 큐에서 자바스크립트 코드를 꺼내서 실행합니다. 만약 큐의 작업을 다 실행하면 다음 페이즈로 이동합니다.

![](https://www.korecmblog.com/static/25d681b08ad96da67c87b2900454cad0/e5c51/Node.js-Event-Loop-Execute-Basic.webp)

그럼 위의 출력 결과는 어떻게 될까요?

```js
1
2
3
4
```
순으로 로그가 찍힐 것입니다.

그럼 각각의 페이즈에 대해 더 알아보겠습니다.

#### Timer Phase 

<p>setTimeout(), setInterval()과 같은 타이머 함수에 의해 예약된 콜백이 실행됩니다.</p>
<p>이 과정에서 타이머의 콜백을 직접 큐에 넣지 않고, 콜백을 언제 호출할 지 정보가 담긴 타이머를 <mark>최소 힙</mark>의 형태로 저장합니다. 그 후 타이머를 실행할 준비가 되면 이벤트 큐로 콜백을 이동시킵니다.</p>

Node.js가 Timer Phase에 진입해야 <mark>타이머를 실행할 기회</mark>를 얻습니다.
따라서 다른 Phase에서 setTimout(callback,1)을 호출해도, 정확히 1ms뒤에 콜백이 실행되지 않습니다.

#### Pending Callbacks Phase

이전 이벤트 루프 반복에서 수행되지 않은 콜백들을 관리합니다.

#### Idle,Prepare Phase

이벤트 루프가 순회할떄마다 4번쨰 Pool을 위한 준비 작업을 하는 단계입니다. 타이머가 걸려있는 콜백들을 제외한 대부분이 이 페이즈에서 처리됩니다!

#### Poll Phase

먼저 I/O와 관련된 콜백을 실행합니다.

이 단계에서 2가지의 기능을 거칩니다.

- I/O를 얼마나 오래 블록하고 있는지 계산합니다.
- poll phase의 큐의 이벤트를 처리합니다.


#### Check phase

이 페이즈는 setImmediate()의 콜백을 위한 페이즈입니다. setTimeout,setInterval과는 다르게 check phase에서 관리합니다.

#### Close phase

close 타입의 이벤트들이 처리되는 페이즈입니다.



## MicroTaskQueue와 nextTickQueue

- 먼저 MicroTaskQueue는 프로미스나 async/await 등의 비동기 호출을 넘겨받습니다.
- 그리고 이 우선순위는 일반적은 작업들보다 더 높습니다.

```js
// 1. 실행
console.log('script start')

// 2. task queue로 전달
setTimeout(function() {
  // 8. task 실행
  console.log('setTimeout')
}, 0)

// 3. microtask queue로 전달
Promise.resolve()
  .then(function() {
    // 5. microtask 실행
    console.log('promise1')
    // 6. microtask queue로 전달
  })
  .then(function() {
    // 7. microtask 실행
    console.log('promise2')
  })

// 4. 실행
console.log('script end')
```

해당 코드를 순서대로 설명하자면,

- console.log('script start')가 콜스택에 쌓이고 실행됩니다.
- setTimeout의 콜백이 테스크 큐에 전달됩니다.
- Promise.resolve의 콜백이 마이크로테스크 큐에 쌓입니다.
- console.log('script end')가 콜스택에 쌀이고 실행됩니다.

```js
script start
script end

// 테스크큐와 마이크로 테스트큐에 콜백이 있는 상태

```

그 후, 마이크로 테스트 큐의 콜백을 일반적인 테스크 큐보다 우선순위를 높여 처리하게 되는데,
콜백을 실행하면

```js
promise1
promise2


//마이크로테스크 큐의 콜백 실행, 테스크 큐에는 아직 콜백이 있음
```
가 찍히고 그 후 테스크 큐의 콜백 을 실행해서 결과적으로

```js
script start
script end
promise1
promise2
setTimeout
```
가 찍히게 됩니다!


## nextTickQueue는 대체..뭘까요?

nextTickQueue는 process.nextTick()의 콜백을 관리하는 특수한 큐입니다.

주어진 이벤트 루프 단계에서 어느때든지 process.nextTick()을 호출하면 process.nextTick()에 넘긴 모든 콜백들은 이벤트 루프가 다음 단계로 진행되기 전에 처리됩니다.
