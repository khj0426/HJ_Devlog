---
title: '#자바스크립트의 빌드과정'
excerpt: '자바스크립트의 AST 트리 생성과정'
date: '2023-06-29'
author: '김효중'
category: 'Js'
---

## 프로그래밍 언어가 어떻게 동작할까요?

어떤 프로그래밍 언어든지 소스코드를 컴퓨터가 이해가능하게 만드는 작업이 필요합니다. 
화면에 <mark>console.log</marK>를 출력하는 프로그램이 있다면, 컴퓨터가 어떻게 이걸 알고 화면에 출력해주는 것일까요?

이를 위해 컴파일러, 인터프리터가 필요합니다.
컴파일러, 인터프리터는 인간이 쓴 코드를 컴퓨터가 알아들을 수 있는 기계어로 번역하고, 실행하는 역할을 합니다.

![컴파일러와 인터프리터](https://blog.kakaocdn.net/dn/cbuQ2l/btrNkCdZRhx/lQKdM8hORIAyJeFqMkk3Y0/img.png)

컴파일러와 인터프리터를 구분해보면 컴파일러는 소스 코드 전체를 한번에 읽고 실행하는 반면, 인터프리터는 한 라인씩 읽어들어 수행합니다.

<br />

컴파일러와 , 인터프리터 둘 중 어느 걸 사용하더라도 <mark>소스코드를 파싱해 추상구문트리라는 자료구조로 만드는 과정은 동일합니다.</br>

![트리](https://s3.amazonaws.com/assets.fullstack.io/n/20211002181937846_tree.png)

추상구문트리는 소스코드를 구조화된 방법으로 나타낼 뿐만 아니라, 컴파일러가 코드를 분석하고 실행 가능한 형태로 변환하기 위한 중요한 단계 중 하나입니다.

## 추상구문트리 (Abstract Syntax Tree,AST)




## 자바스크립트, AST 파싱


다음과 같은 자바스크립트 함수가 있습니다.
```js
function foo(x){
    if(x > 10){
        var a = 2;
        return a*x;
    }

    return x+10;
}
```
이걸 AST 트리형식으로 변환한다면 다음의 AST트리가 탄생합니다. 실제로 AST 구문을 만드려면 <a href = "https://astexplorer.net/" target = "_blank">여기</a>에서 확인 가능합니다!

![](https://miro.medium.com/v2/resize:fit:1100/0*mSOIiWpkctkD0Gfg.)

## V8엔진은 자바스크립트를 어떻게 처리할까?

먼저 V8은 Google Chrome 및 Node Js에서 사용하는 자바스크립트 엔진입니다.

V8엔진이 코드를 처리하기 위해 크게 3단계의 과정을 거칩니다.

- 코드 파싱
- 코드 컴파일
- 코드 실행

### 파싱단계

이 과정에서 코드가 각각의 <mark>토큰</mark>으로 분해됩니다. (Lexical analysis 또는 Tokenizer라고 부릅니다.)
```js
const sum = 5 + 7;
```

이 코드는 const토큰,sum토큰,5토큰,7토큰,+토큰으로 분해되고, 코드를 AST로 변환하고 스코프를 생성합니다.

V8엔진은 코드를 파싱해 AST를 만들면서 <mark>스코프체인</mark>이라는 방법을 사용합니다. 
스코프 체인은 중첩된 함수, 블록 스코프에서 변수와 함수에 접근하기 위한 
리스트라고 할 수 있습니다.

각 스코프는 해당 스코프에 정의된 변수,함수에 대한 정보를 저장하고 이러한 스코프들은 체인 형태로 관리됩니다.


![](https://miro.medium.com/v2/resize:fit:828/format:webp/1*-oSl-3h7qQQWfnRN2gYJ5A.jpeg)


### 컴파일 단계

컴파일은 사람이 읽을 수 있는 코드를 기계어로 만드는 프로세스입니다.
이 과정에서 앞서 말한 인터프리터, 컴파일러를 쓸 수 있는데 V8엔진은 <mark>JLT(Just-In-Time)</mark>을 사용합니다.


#### JIT(Just in Time 컴파일) 

Just in TIme은 동적 번역이라고 불리고, 이름만 살펴보면 <mark>그떄그떄</mark>라고 할 수 있습니다. 이름에 맞게 프로그램을 실제 실행하는 시점에 바이트 코드를 기계어로 번역하는 기법입니다.

![](https://image.toast.com/aaaadh/real/2016/techblog/jit%281%29.png)

JIT 컴파일러는 처음에 코드를 파싱해 <b>중간언어(IR)인 바이트</b>단위로 먼저 변환합니다. 그 후 생성된 <b>바이트코드</b>를 기반으로 네이티브 코드로 컴파일을 합니다.

### JIT와 자바스크립트

자바스크립트는 꽤 동적인 언어입니다. 따라서 자바스크립트 엔진의 JIT는 컴파일 시 동적 타입의 <mark>모든 예외 케이스</mark>를 고려해야 합니다.

(정말 유명한 짤이 있습니다!)

![](https://hanamon.kr/javascript-vs-meme-1%ED%83%84/thanks-for-js/)

예를 들어 다음의 함수가 존재합니다.
```js
function sum(a,b){
    return a+b;
}

sum(a,b);
```

이떄 다양한 변수의 타입 조합이 존재할 수 있습니다. int+int , int+string, string+string 등에 대응하는 네이티브 코드를 모두 만들어야 합니다.

사실 이러한 경우 모든 경우에 대응하는 코드를 만들기보단 slow case로 코드를 넘깁니다.

Slow case는 JIT 컴파일러가 최적화를 수행하지 못하거나 최적화된 코드를 사용할 수 없는 경우를 나타냅니다. 

이러한 자바스크립트의 특성 떄문에 다양한 시도가 등장했고, 결국 현재 대부분의 브라우저는 <mark>AJITC</mark>방식을 채택합니다.

### Adaptive JIT Compilation (AJITC) 방식

Adaptive compilation은 모든 코드를 일괄적으로 같은 수준의 최적화를 하는 것이 아닌, <b>반복수행되는 정도</b>에 따라 유동적으로 다른 최적화를 적용하는 기법입니다.


과정은 다음과 같습니다.

- 모든 코드가 처음에 인터프리터로 순차적으로 실행합니다.
- 자주 반복되는 부분(hotspot)이 보이면 그 부분만 JIT를 이용해 네이티브 코드로 바꿉니다.
- 더 많이, 자주 반복되는 코드는 더 많은 최적화를 적용합니다.

![AJITC](https://velog.velcdn.com/images%2Fkich555%2Fpost%2F846f4121-a65a-4ace-ae0e-e859c90d0af7%2F1*d_dbumf-8AJKcVrUYgc9-A.png)

최종적으로 V8의 단계는 다음과 같아집니다.

- V8이 스크립트를 토큰으로 분리해 AST로 만들고 Ignition에 보내집니다.
- Ignition은 AST를 바이트 단위로 컴파일 합니다.
- V8은 자주 사용되는 기계어 코드를 감지하고 hotspot으로 표시합니다.
- 이떄 또 다른 Turbofan 컴파일러가 hospot로 표시된 코드를 최적화합니다.

![](https://miro.medium.com/v2/resize:fit:828/format:webp/1*ZIH_wjqDfZn6NRKsDi9mvA.png)













