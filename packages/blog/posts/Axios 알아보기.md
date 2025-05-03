---
title: 'Axios 알아보기'
excerpt: 'axios를 알아보자!'
date: '2023-08-26'
author: '김효중'
category: 'axios'
image: '/images/postImg/axiosIntroduce.avif'
---

Axios를 사용하다보니, 너무 Axios를 모르고 사용하지 않았나..하는 반성과 함께, Axios를 더 알아보고 싶어서 쓰는 글입니다.

![axiosIntroduce](/images/postImg/axiosIntroduce.avif)

Axios는 개발자들이 쉽게 서버로부터 데이터를 가져오는 요청을 할 수 있는 promise기반의 HTTP 라이브러리입니다. axios는 GET,POST,PUT,DELETE 등의 요청을 쉽게 만들 수 있습니다.

# fetchAPi와 Axios

Axios사용 시 요청에 쉽게 timeout세팅을 넣어줄 수 있습니다. 요청이 일정 시간 지나도 오지 않을시의 처리를 axios를 사용할떄 단순히 timeout 프로퍼티를 사용하면 쉽게 처리 가능합니다.

```js
axios({
    method:'post',
    url:'/login',
    timeout:4000 //4초 후 
    data:{
        firstName:'Kim'
    }
}).then(res => {}).catch(e => console.error(e))
```
fetch Api를 사용할떄는 AboutController 인터페이스로 요청을 취소할 수 있습니다.

timeout을 위해 새로운 AbortController를 만들고 signal 읽기전용 프로퍼티로 요청을 취소할 수 있게 신호를 만듭니다.

그 후 setTimeout을 통해 4초가 지난 시점에 취소를 합니다. 제 개인적인 생각에는,, 단순 코드의 양만 보았을떄, axios의 timeout프로퍼티 옵션이 더 양이 적고 간결하다고 생각했습니다.

```js
const controller = new AbortController();
const options = {
    method:'POST',
    signal:controller.signal,
    body:JSON.stringify({
        firstName:'Kim'
    })
}

const promise = fetch('/login',options);
const timeoutId = setTimeout(() => {
    controller.abort()
},4000);

promise.then(res => {}).catch(e => console.error(e))
```

axios의 가장 주요한 기능은 HTTP Request를 가로챌 수 있다는 점입니다. 이를 통해 로깅, 인증, 실패한 요청을 다시 보낼수 있는 등의 액션을 수행할 수 있습니다.

인터셉터로 각각의 HTTP 요청에 대한 코드를 작성할 필요가 없고, 요청과 응답에 대한 공통적인 전략을 적용할 수 있습니다.

요청을 전송할떄, fetch APi에서는 JSON을f 문자열화하는 과정이 필요합니다. 컨텐츠 타입을 application/json으로 명시해줘야합니다.

반면 axios는 설정 옵션 객체의 data를 보내면 자동적으로 application/json이 자동으로 들어갑니다.

```js
axios.post(url,{
    data:data
})
```

```js
fetch(url,{
    method:"POST",
    headers:{
        'Content-Type':'application/json',
        body:JSON.stringify(data)
    }
})
```

# Axios는 어떻게 동작할까요?

Axios는 브라우저에서는 XMLHttpRequest를 통해 , Node.js환경에서는 Node JS의 HTTP Request를 통해 쉽게 HTTP Request를 만들 수 있습니다.
만약 요청이 성공적이라면 요청한 response를 받을 수 있고, 요청이 실패한다면 에러를 받게 될 것입니다.

request와 response를 바꾸거나 가공하기 위해 인터셉터를 사용할 수도 있습니다.

기본적인 axios의 다이어그램은 다음의 사진과 같습니다.

Axios Request를 사용하면 Request 인터셉터를 거쳐, Request를 변환합니다. 브라우저에서는 XMLHttpRequest를 통해 응답을 보냅니다. Node JS의 경우 HTTP Request를 통해 응답을 보냅니다. 그 후 Response 인터셉터를 거쳐 실제 응답이 됩니다.

![axios다이어그램](/images/postImg/axiosDiagram.webp)

# Axios의 요청과 응답 설정

Axios의 url 옵션을 통해 쉽게 Base URL을 만들 수 있습니다. 또한 만들고자 하는 여러 요청을 axios의 옵션을 통해 쉽게 만들 수 있습니다.

axios의 params옵션으로 쉽게 요청 URL과 같이 전송될 매개변수를 지정할 수 있습니다.

이렇게 params옵션을 지정하면 요청 URL ? 기호 뒤에 붙어서 전송이 이루어집니다.

예를들어 다음의 요청을 axios의 params로 단순히 처리할 수 있습니다.

```js
// From
const response = await axios({
  url: `${baseURL}?apikey=${VITE_API_KEY}&s=${encodeURIComponent(title)}&page=${page}`,
  method
});

// To
const response = await MOVIE_INSTANCE.get(`?apikey=${VITE_API_KEY}`, {
  params: {
    s: title,
    page
  }
});
```

```js
const axios = require('axios');
const res = await axios.get(url,{
    //다른 옵션을 지정할 수 있습니다.
    params:{
        
    }
})

//다음의 방식으로도 사용할 수 있습니다.
const res = await axios({
    method : 'get',
    url: //APi EndPoint
    params:{

    }
})
```
Axios가 지원하는 요청의 여러 종류에는 다음과 같은 것들이 존재합니다.

- request 
- get
- delete
- head
- options
- post
- put
- patch

# Axios 응답

Axios를 통해 요청을 보내면, 응답을 받을 수 있습니다. 

```js
{
    data : {},
    status : 200,
    statusText : 'OK',
    headers: {},
    config : {},
    request : {}
}
```

# Axios의 요청과 응답 인터셉터

Axios의 가로채기는 코드 블록에서 then이나 catch블록으로 처리되기 이전에, 이루어집니다. 예를들어, 모든 요청에 대해 유효한 JWT 토큰이 있는지 확인하기 위해 , 인터셉터를 쓸 수 있습니다.

만약 해당경우, 요청에 유효한 JWT 토큰이 없다면, 다시 로그인 페이지로 보내거나, 재인증을 시도하게 할 수 있습니다. 요청을 보낼떄 로그를 남기는 단순한 예시는 다음과 같습니다. 이 로그는 URL에 대해 요청이 만들어지고, 요청이 보내질떄마다 남겨질 것입니다.

```js
axios.interceptors.request.use(
    (config) => {
        console.log(new Date().getHours(),new Dae().getMinutes() + '에 요청됨');

        return config;
    }
    (error) => {
        console.error(error);
    }
)
```

이떄 config에는 요청 메소드,요청 주소 등이 들어가게 됩니다. (정말정말 많네요..)

```js
Request from ::1: POST /.netlify/functions/movie/
{
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },
  adapter: [ 'xhr', 'http' ],
  transformRequest: [ [Function: transformRequest] ],
  transformResponse: [ [Function: transformResponse] ],
  timeout: 1000,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: [Function: FormData3] {
      LINE_BREAK: '\r\n',
      DEFAULT_CONTENT_TYPE: 'application/octet-stream'
    },
    Blob: [class Blob]
  },
  validateStatus: [Function: validateStatus],
  headers: AxiosHeaders {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  baseURL: 'https://omdbapi.com',
  params: { s: 'flex', page: undefined },
  method: 'get',
  url: '?apikey=7035c60c'
}
{
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },
  adapter: [ 'xhr', 'http' ],
  transformRequest: [ [Function: transformRequest] ],
  transformResponse: [ [Function: transformResponse] ],
  timeout: 1000,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: [Function: FormData3] {
      LINE_BREAK: '\r\n',
      DEFAULT_CONTENT_TYPE: 'application/octet-stream'
    },
    Blob: [class Blob]
  },
  validateStatus: [Function: validateStatus],
  headers: AxiosHeaders {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  baseURL: 'https://omdbapi.com',
  params: { s: 'flex', page: '5' },
  method: 'get',
  url: '?'
}
```

# 그 외

axios는 서드파티 라이브러리입니다. 그러다 보니 번들 사이즈를 신경쓰지 않을 수 없는데 번들의 크기는 아래와 같습니다. 소규모의 프로젝트의 경우 (api 호출이 별로 없거나, 기본 fetch API만으로 충분한 경우) 오히려 번들 크기로 인해 axios가 무거워 질 수 있다고 생각합니다.!.!

![번들크기](/images/postImg/axiosbundle.webp)

