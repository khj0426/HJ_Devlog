---
title: 'GA를 블로그에 녹여보자'
excerpt: 'GA를 붙이고 여러 지표를 확인해보자!'
date: '2024-07-27'
author: '김효중'
category: '기타'
image: '/images/postImg/0727.png'
---

![](/images/postImg/0727.png)

### GA란!

서비스 유입 경로나 트래픽 분석을 위해 Google에서 제공하는 도구이다.

GA의 이벤트는 자동으로 내가 만들건지, 분석기가 수동으로 생성할지에 따라 <b>자동,수동</b>이벤트로 분류할 수 있다.

자동 이벤트 안에서도, 일반 이벤트인지, 향상된 측정 이벤트인지 나눌 수도 있고, 수동이벤트는 GA가 미리 정한 방식으로 만들건지? 내가 내 자신만의 방식으로 만들건지? 에 따라 <b>추천, 맞춤 이벤트</b>로 나뉘게 된다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFchwW%2FbtsnoDBO2Qk%2FeCrOUus7RGoRTDkAwADj2k%2Fimg.png)

나는 아래와 같은 정보를을 분석하고, 통계화하고 싶었다.

- 😃사용자가 어디서 내 블로그에 오는지?에 대한 참조 경로
- 😃특정 블로그 글의 조회 수
- 😃한 세션당 몇 페이지를 방문하는지
- 😃한국에서의 평균 참여 시간
- 😃총 방문자 수   

### 세팅

먼저 세팅부터 하자!  구글 애널리틱스에서 제공하는 G-로 시작하는 값을 통해 우리의 사이트를 GA와 연결할 수 있다.

```bash
NEXT_PUBLIC_MEASUREMENT_ID=G-123213213123
```

Next 13 App Route 기준으로 다음과 같은 GA 컴포넌트를 만들었다. 나는 배포 환경에서만 GA를 동작시키고 싶어서, 개발 환경단 일때는, 그냥 빈 태그를 반환한다.

```tsx
import Script from 'next/script';

import isProductionMode from '@/utils/isProductMode';

const GoogleAnalytics = () => {
  if (isProductionMode()) {
    return (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
          `,
          }}
        />
      </>
    );
  }

  return <></>;
};
export default GoogleAnalytics;
```

이제 만든 컴포넌트를 layout.tsx에 적어주기만 하면 된다.

### GA_DATA_API

이렇게만 하면 단순히 GA를 이식하는 것이 끝나지만, 좀 더 데이터를 가공하고 싶다거나? 특정 주소에서 방문하는 사용자 등, 아니면 특정 기간 동안 지표를 분석하고 싶었다.

예를 들어, 7일동안 총 몇 명이 방문했는지를 그래프로 볼 수 없을까?, 30일동안 평균 참여 시간이 얼마였는지를 보고 싶은데..?와 하는 고민을 하였고, 어떻게 하면 이런 기능을 쉽게 구현할 수 있을까 고민을 하였다.

GA의 <a href = "https://developers.google.com/analytics/devguides/reporting/data/v1/rest?hl=ko" target = "_blank" style = "color:rgb(0, 131, 120)">DATA API</a>를 사용하여 GA의 보고서 데이터에 프로그래밍 언어로 접근할 수 있다.

DATA API로 이런 통계 자료에 대한 정보를 JSON형태로 받아 올 수 있다.

![](/images/postImg/0727-2.png)

딱 내가 원하던 방법이다. 

### DATA_API설정

먼저 API 사용 설정을 해야 한다.

<a href = "https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries?hl=ko" target = "_blank" style = "color:rgb(0, 131, 120)">Google Analytics QuickStart</a>

(그전에 프로젝트 생성을 위해 Google Cloud Platform계정이 있어야 하고, 결제 정보도 있어야 한다.)

위의 링크에 파란색 버튼을 클릭하면 이후 단계를 거치게되는데, credentials.json이 다운로드 되어진다.

```json
//credentials.json
{
  "type": "service_account",
  "project_id": "quickstart-1722067633581",
  "private_key_id": ,
  "private_key":"",
  "client_email":"",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": "googleapis.com"
}
//
```

이제 @google-analytics/data라이브러리를 설치한다.

```bash
npm install @google-analytics/data
```

이제 이 패키지에서 제공하는 BetaAnalyticsDataClient를 써야 하는데, axios 인스턴스를 사용하는 유틸처럼 쓰기 위해 , bigQueryClient.ts이라는 파일을 만들었다.

이제 위의 json을 아래의 credentials에 순서대로 입력해주면 된다. 나는 환경변수에 하나씩 client_id, 등을 넣어주고 환경변수를 가져와 하나씩 주입해줬다.

```ts
//@utils/bigQueryClient.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY?.split(
      String.raw`\n`
    ).join('\n'),
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
    universe_domain: 'googleapis.com',
    forceRefreshOnFailure: false,
  },
});

export default analyticsDataClient;
```

이제 만든 저 analyticsDataClient로 runReport를 만들 수 있다. 말그대로 지금 사이트의 GA정보를 바탕으로 특정 기간, 특정 도시, 특정 지표에 대한 데이터를 만들고 JSON형태로 내려준다.

물론 노드에서 돌아가야 하기 떄문에, Next의 API Route를 사용했고, 가장 간단히 블로그의 총 방문자를 가져오는 보고서를 만들어보자.


```tsx
//api/all-users/route.tsx
import { NextRequest, NextResponse } from 'next/server';

import analyticsDataClient from '@/utils/bigQueryClient';
import { formatDateToString } from '@/utils/formatDateToString';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');
  const startDate = req.nextUrl.searchParams.get('startDate');
  const endDate = req.nextUrl.searchParams.get('endDate');

  const now = new Date();

  const report = async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/401292897`,
      dimensions: [
        {
          name: 'country',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'country',
          stringFilter: {
            value: 'South Korea',
          },
        },
      },
      // 시작 일자가 있으면 해당 시작일자로 고정, 그렇지 않으면 전체 기간
      dateRanges: [
        {
          startDate:
            startDate: '2020-03-11',
          endDate: endDate ?? formatDateToString(new Date()),
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    const results =
      response?.rows?.map((row) => ({
        activeUsers: row,
      })) || [];

    return results;
  };

  const reportResults = await report();

  if (reportResults) {
    return NextResponse.json(
      {
        data: 'Report finished',
        datalist: reportResults[0]?.activeUsers?.metricValues || [],
      },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json(
    {
      data: 'Report failed',
    },
    {
      status: 502,
    }
  );
}

```

이런식으로 totalUsers등과 같은 지표를 Next의 API Route로 만들고 useQuery와 1대1 대응 되도록 만들었다.

블로그 조회 수 기능도 pageLocation과 totalUser데이터를 이용해서 만들 수 있었고, recharts와 이 지표를 연결해 다음과 같은 통계 자료도 간단하게 만들어 볼 수 있었다.

![](/images/postImg/0727-3.png)

이런 특정 시에서 평균 몇 페이지를 방문했는지와 같은 지표와 7일간 평균 참여시간, 30일간 평균 참여 시간 등도 쉽게 만들수 있었다..!

![](/imags/postImg/0727-4.png)

더 활용해보면 특정 그룹(모바일인지 웹인지? refer를 직접 방문했는지? 한번 참조를 거쳤는지?)을 나눠서 실험을 만들어서 수행할 수도 있을 것 같고, 활용할 수 있는 범위가 무궁무진 한 것 같다.!!





