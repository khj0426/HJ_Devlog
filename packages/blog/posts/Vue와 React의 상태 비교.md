---
title: 'Vue와 React의 상태 비교'
excerpt: '어떻게 상태가 다를까!!'
date: '2023-08-15'
author: '김효중'
category: 'Vue.js'
image: '/images/postImg/vue-state-1.png'
---

## 상태의 변화

상태는 프론트엔드 개발자에게 중요한 영역이라고 생각합니다. 상태에 따라 랜더링을 할 컴포넌트가 달라질 수 있고, 상태의 흐름을 추적하는 것도 중요하다고 생각합니다..!

React와 Vue는 이 상태를 인식하는 방법에 약간의 차이가 존재합니다. 왜 상태를 인식하는 방법이 다른지, 어떻게 다른지 궁금하기도 해서 정리를 해보려고 합니다..!


리액트에서 간단하게 빈 배열의 상태를 선언하고 버튼을 클릭할때마다 배열에 <mark>clicked!</mark>를 추가해 상태를 갱신해 보았습니다.

```js
import React,{useState} from 'react';

export function App(props) {
  const [arr,setArr] = useState([]);
  return (
    <>
    <button onClick = {() => setArr([...arr,'clicked!'])}>
        Click Me
    </button>
    <p style = {{color:'white'}}>
    {arr.map((eachArr) => eachArr)}
    </p>
    </>
  );
}
```

클릭할때마다 새 배열로 상태가 바뀌어서 랜더링이 발생하게 됩니다.

이번에는 배열의 push 메서드로 클릭 시 배열에 push되도록 해보겠습니다.

```js
import React,{useState} from 'react';

export function App(props) {
  const [arr,setArr] = useState([]);
  return (
    <>
    <button onClick = {() => setArr(arr.push('clicked!'))}>
        Click Me
    </button>
    <p style = {{color:'white'}}>
    {arr.map((eachArr) => eachArr)}
    </p>
    </>
  );
}
```

이번에는 랜더링이 발생하지 않습니다.

## Vue.js

이번에는 Vue.js에서 배열의 상태를 만들고 상태를 갱신해보겠습니다.
reactive를 사용해 배열의 상태를 만들고 마찬가지로 버튼을 누를때마다 배열을 갱신해 보겠습니다.

```js
<script setup>
import { reactive } from 'vue'

let arr = reactive([]);
const onClickButton = () => {
  arr = [...arr,'clicked!'];
}
</script>

<template>
  
  <button @click="onClickButton">Click Me!</button>
  <p>{{arr.join('')}}</p>
</template>
```

버튼을 눌렀음에도 아무런 반응을 하지 않습니다.

![](/images/postImg/vue-state-1.png)


 이번엔 push메소드로 배열에 클릭할때마다 새로운 문자열을 추가해 보겠습니다!

 ```js
<script setup>
import { reactive,watch } from 'vue'

let arr = reactive([]);
const onClickButton = () => {
  arr.push('clicked!');
}
</script>

<template>
  
  <button @click="onClickButton">Click Me!</button>
  <p>{{arr.join('')}}</p>
</template>
 ```

![Alt text](/images/postImg/vue-state-2.webp)

이번에는 리액트와 다르게 상태가 갱신되고 랜더링도 새로 발생한 것을 볼 수 있습니다.

## 왜 다를까?!

리액트는 상태를 불변적으로 취급합니다. 새로운상태, 이전상태를 비교해서 값이 다르면 랜더링을 발생시킵니다.

자바스크립트의 원시 타입의 경우는 값을 비교해버리고, 객체나 배열의 참조형 데이터는 참조값을 그냥 비교해버립니다.

그래서 앞서 배열에서 push메소드를 사용하면 이전의 참조값이 그대로 사용되지만, 스프레드 연산을 사용하면 아예 새 배열 자체를 만들어서 참조값 자체가 바뀌기 때문에 바뀌었다고 판단하고, 랜더링을 발생시킵니다.

공식문서에서도 해당 관련 글을 볼 수 있습니다.

<a href = "https://react.dev/learn/updating-arrays-in-state" 
target = "_blank" style = "color:#008378">출처</a>

<blockquote>
Instead, every time you want to update an array, you’ll want to pass a new array to your state setting function. To do that, you can create a new array from the original array in your state by calling its non-mutating methods like filter() and map(). Then you can set your state to the resulting new array.
</blockquote>

<br />

반면 Vue.js 3의 reactive 함수는 Proxy객체를 반환하고, Proxy의 setter가 발생하는 것을 추적해 다시 랜더링을 시킵니다.

![](https://deepgram.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F96965%2F1683914200-console_2.png&w=1080&q=75)

공식문서에서도 reactive()함수를 다음과 같이 정의합니다.

```js
Returns a reactive proxy of the object
```

<a href = "https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue" 
target = "_blank" style = "color:#008378">출처</a>

<blockquote>
반응 객체의 속성을 로컬 변수에 할당하거나 구조를 해제할 때 해당 변수에 대한 액세스 또는 할당은 더 이상 소스 객체에서 프록시 가져오기/설정 트랩을 트리거하지 않기 때문에 비반응적입니다. 이 "연결 끊기"는 변수 바인딩에만 영향을 미칩니다. 변수가 개체와 같은 기본 값이 아닌 값을 가리키는 경우 개체를 변경해도 여전히 반응적입니다.
</blockquote>

앞서 코드를 다시 살펴보겠습니다. Reactive를 사용해 배열을 프록시 객체를 통해 등록해주었고, 구조분해 할당을 사용하였습니다.

```js
<script setup>
import { reactive,watch } from 'vue'

let arr = reactive([]);

const onClickButton = () => {
  console.log(arr);
  arr = [...arr,'clicked!'];
 
}
</script>

<template>

  <button @click="onClickButton">Click Me!</button>
  <p>{{arr.join('')}}</p>

</template>
```

버튼을 한번 클릭한 후 콘솔을 보겠습니다.
구조분해 할당 전 프록시 객체가 콘솔에 찍히고 빈 배열이 target으로 설정되어 있습니다.

![](/images/postImg/vue-proxy.webp)

이제 버튼을 한번 더 누르고 콘솔을 누르겠습니다. 앞서 살펴본 것처럼, Reactive객체 속성을 구조분해 하면, 해당 프록시 객체의 get,set을 발생시키지 않고, 대신 프록시 객체 대신 배열이 덮어씌워집니다.

![](/images/postImg/vue-proxy-1.webp)

따라서 반응성을 더 유지하지 못하고 보간법으로 배열을 출력하는 것이 동작하지 않습니다.

## 그럼 Push를 쓸떄는?

Push메소드를 쓰면 프록시로 등록한 배열의 set이 잘 동작하는 것을 볼 수 있습니다.

![](/images/postImg/vue-proxy-2.webp)










