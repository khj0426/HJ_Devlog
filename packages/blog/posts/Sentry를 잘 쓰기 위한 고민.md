---
title: 'Sentry를 잘 쓰기 위한 고민'
excerpt: '어떤 에러를 잡고, 어떻게 로깅을 해야 할까?'
date: '2024-05-11'
author: '김효중'
category: '기타'
image: '/images/postImg/0511.png'
---

![](/images/postImg/0511.png)

에러 로깅을 위해 Sentry를 도입해 사용하고 있었다. 사용하면서 내가 예상하지 못한 프로덕션 모드에서 발생하는 에러를 잡기도 하고, 해당 스냅샷을 알려줘서 좋았지만, 한편으로는 <b>너무 과한 로깅</b>이 잡히기도 했다. 

단순하게 sentry config로만 앱을 감싸 놓기만 하면, 모든 에러가 <b>어디서 발생했는지, 무슨 에러인지</b> 알기 쉽지 않았다.

게다가 무료 계정의 경우, 특정 에러 개수가 넘어가면 더 에러를 안잡아줘서, Sentry를 효율적으로 쓰기 위한 고민을 계속 해오고 있었다.

또한, 에러가 찍힐 때마다, 메일이 오는데, 모든 에러에 대해 메일이 와서, 무수한 메일을 받기도 하였다..

![](/images/postImg/0511_1.png)

(무수한 메일들..)

프론트엔드에서 에러를 분류하면 아래의 사진과 같을 것이다.

![](https://velog.velcdn.com/images%2Fwhddnjs1715%2Fpost%2F62884aba-b22e-4f1a-a7cf-2ff1f30ed658%2F1.PNG)

Sentry를 통해 에러를 잡는 것은 <b>예측 불가능한 에러</b>를 위함이다.

브라우저에서 서버와의 통신을 실패한다는 상황이나, 서비스를 이용할 수 있는 500에러(next에서는 하얀 화면이 나오는 경우)가 대표적인 예측 불가능한 에러일 것이다.

![](https://i.stack.imgur.com/9liGb.jpg)

내가 Sentry를 통해 잡고자 하는 오류는 크게 다음과 같다.

- 서버와의 통신 에러
- Next를 사용했을 때 빈 하얀 화면이 나오는 경우(applicationError)

첫번째 경우는 axios 인터셉터를 활용할 것이고 두번째의 경우 global-error 파일을 사용해서 관리해보려고 한다!

### Axios인터셉터

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_GEJACWaS9P6-6UL1xLmjMsNoSNKAunxAZzKBvYPP&s)

Axios인터셉터는 API 요청이나 응답시, 반복적으로 필요한 작업을 처리하는 데 용이하다. 요청 시 인증 토큰을 실어 보낸다던가, 헤더를 추가한다던가 등의 작업을 할 수 있다.

인터셉터로 Axios에러에 대해 Sentry에 기록하도록 하였다.

### CaptureErrorAPI

Sentry는 captureException과 captureMessage 두 이벤트 전송 API를 갖고있다.

captureException은 error객체, 문자열을 전송한다.

```ts
//captureException
import * as Sentry from '@Sentry/next'

try{

}catch(e){
    Sentry.captureException(e)
}

//captureMessage는 문자열을 전송함
Sentry.captureMessage("에러가 발생했어요!")
```

captureException함수의 첫번째 인수로는 에러 객체를 넣고, 두번째 인수로는 선택적으로 CaptureContext를 넣을 수 있다.

```ts
export declare function captureException(exception: any, captureContext?: CaptureContext)
: ReturnType<Hub['captureException']>;
/**
 * Captures a message event and sends it to Sentry.
 *
``` 

### Scope,Context

본격적으로 에러를 로깅하기 전에 Sentry의 Scope와 Context에 대해 알아보자.

Sentry에 이벤트가 캡쳐되면, SDK가 자동으로 이벤트를 <mark>현재 scope의 추가 정보</mark>와 결합한다. SDK가 자동으로 스코프를 관리해 주기 때문에 신경쓰지 않아도 되지만, 
각 이벤트마다 추가적인 정보를 전송할 수 있다.

공식문서에서는 Scope는 결국 <b>이벤트와 함께 전송되는 유용한 정보를 보유</b>한다. 이 유용한 정보에는 Context,브레드크럼 등이 포함될 수 있다.

이 scope는 withScope로 설정할 수 있다. 여러 오류 상황에 대해 withScope로 데이터를 추가적으로 던질 수 있게 된다. 

그럼 인터셉터와 captureException함수를 이용해서, <b>Axios에러의 경우,추가적인 정보</b>를 Sentry에 전송하게 해주었다.

Context는 이벤트에 임의의 데이터를 연결하는 기능이다.

Axios 오류의 경우, 요청의 경우 어떻게 갔는지? 응답은 어떻게 왔는지? 확인할 때, context로 추가적인 정보를 전송해 준다.

그럼 이제 인터셉터 + Scope를 이용해 API오류를 로깅해보자!

```ts
const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_PRODUCT_URL
      : process.env.NEXT_PUBLIC_LOCAL_URL,
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error: AxiosError) => {
    if (error.response) {
      const errorConfig = error.config;
      const { data, status } = error.response;

      setContext('API 응답 에러', {
        status,
        data,
      });

      withScope((scope) => {
        scope.setTag('type', 'api');
        scope.setTag('api-status', status || 'no-value');
        scope.setTag('api-data', data ? JSON.stringify(data) : 'no-value');

        captureException(error, {
          level: 'error',
          extra: {
            header: error?.config?.headers,
            response: error.response?.data,
            request: error.request,
            type: '네트워크 에러',
          },
        });
      }); 
    }
    return Promise.reject(error);
  }
);
```

먼저 scope의 tag를 걸었다.type,api-data,api-state에 대해 태그를 걸었는데, 실제 Axios오류가 발생하면 다음과 같이 태그 목록에 내가 설정한 태그가 쭉 나오게 된다.

![](/images/postImg/0511_2.png)

그리고 captureException에서 Axios에러객체, 추가적인 헤더, 요청 정보, 응답 정보를 넘겨주었는데 실제 오류가 발생한다면 다음과 같이 로그기 남는다.

![](/images/postImg/0511_3.png)

### 더 개선할 점

![](/images/postImg/0511_4.png)

오류를 추적하는데 굉장히 좋지만, 번들링을 통해 난독화가 들어갈 경우, 어느 위치에서 오류가 났는지 파악하기 힘들다.

source Map을 Sentry에 제공하면 해결할 수 있다고 하는데 배포 환경에서 소스맵을 제공하면 원본 코드의 유출로 이어질 수 있다고 한다.Sentry 문서에서 webpack-plugin인 sentry/webpack-plugin을 통해 설정할 수 있다고 하여서 이걸 이용해 볼 생각이다.

API 에러가 아닌 global-error파일에서 잡는 오류는 Sentry에 넘기는게 바람직한가..?에 대한 생각이 든다. 애초에 서비스가 죽어버리는 경우에 대해 더 깊이 생각해봐야 겠다..!













