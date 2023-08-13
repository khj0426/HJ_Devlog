---
title: 'Vue.js의 비동기요청은 언제하면 좋을까'
excerpt: 'Vue.js의 라이프사이클과 비동기'
date: '2023-08-14'
author: '김효중'
category: 'Vue.js'
image: '/images/postImg/vuelifecycle.png'
---

## Vue.js의 라이프 사이클

Vue.js의 라이프 사이클은 정말 많습니다.

![](/images/postImg/vuelifecycle.png)

그리고 beforeCreate,created 등의 라이프사이클은 동기적으로 동작합니다.

그럼 이 수많은 라이프 사이클에서 언제 비동기 로직을 넣어줘야 할까 궁금했습니다.. 만약 beforeCreate,created 등의 라이프사이클에 async을 넣어주면 과연 비동기로 동작할까 ?? 라는 궁금증이 있었어요!

비동기로 동작하길 원해 async을 걸더라도, vue의 라이프사이클은 동기적으로 동작합니다.

beforeCreate,created,beforeMounted 어디에서 호출되더라도, 결국 <mark>mounted</mark> 
이후에 실제 비동기 요청이 처리됩니다.

```js
<script>
new Vue({
  el: '#app',
  beforeCreate() {
    setTimeout(() => {
      console.log('fastest asynchronous code ever')
      }, 0);

    console.log('beforeCreate hook done');
  },
  created() {
    console.log('created hook done');
  },
  beforeMount() {
    console.log('beforeMount hook done');
  },
  mounted() {
    console.log('mounted hook done');
  }
})
</script>
```

위의 코드 결과는

```js
beforeCreate hook done
created hook done
beforeMount hook done
mounted hook done
fastest asynchronous code ever
```

순으로 로그에 남게됩니다.

결국 어떤 비동기 호출을 걸어도, API응답속도가 어마어마하게 빠르더라도 호출한 값을 받아오는 시점은 mounted()이후라는 것을 알 수 있습니다.

## 그럼 왜 라이프사이클이 동기적이지?

그럼 왜 이런 라이프사이클 흐름이 동기적인지가 궁금했습니다.

<a href = "https://github.com/vuejs/vue/issues/7209" target = "_blank" style = "color:#98c379;">(이 글)</a>

에 나와있듯이, 일단 비동기 함수는 네트워크요청이나 긴 시간이 걸리는 작업 등에 종종 사용됩니다.

만약 이런 요청들을 기다리도록 강제해버린다면 다른 라이프 사이클들이 줄줄이 지연될 것이고 이는 사용자에게 악영향을 줄 수 있습니다. (화면이 띄워지기 까지 오랜 시간을 기다려야 한다는 등등..)

따라서 라이프사이클 키워드에 async를 붙이는 건 무리가 있습니다. 밑의 글에서도 설명이 잘 되어있어요.

<a href = "https://stackoverflow.com/questions/65753212/async-vue-lifecycles" target = "_blank" style = "color:#98c379">관련 글</a>


## 결론

Vue의 라이프 사이클은 결국 async를 붙이면 await의 함수를 기다리지 않고 그냥 동기적으로 다음 훅으로 넘어갑니다.!

아래와 같이 사용하는게 바람직합니다!

```js
<template>
  <div>
    <button @click="fetchData">데이터 가져오기</button>
    <p>{{ data }}</p>
    <p>{{ initData }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      initData = null;
    };
  },
  mounted(){
    this.initData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetchDataFunction();
        this.data = response;
      } catch (error) {
        console.error(error);
      }
    },

    async initData(){
       try {
        const response = await fetchDataFunction();
        this.initData = response;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
```


