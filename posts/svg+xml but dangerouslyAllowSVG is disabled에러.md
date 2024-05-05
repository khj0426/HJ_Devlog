---
title: 'svg+xml but dangerouslyAllowSVG is disabled에러'
excerpt: 'Next에서 SVG처리하기'
date: '2024-05-05'
author: '김효중'
category: 'Next.js'
image: '/images/postImg/0505.png'
---

![](/images/postImg/0505.png)

## 비트맵(Bitmap) VS 벡터 이미지

기존 JPG,PNG기반의 픽셀 기반 이미지 형식과 다르게 벡터 기반 이미지인 SVG형식은 이미지 확대, 축소 시 깨지지 않는다는 장점이 있다. 

![](https://cdn.imweb.me/upload/56ddef026a42e.png)

그럼 픽셀 기반과 벡터 기반은 어떻게 차이가 있을까?

픽셀 기반 이미지는, 말 그대로 픽셀(비트맵)을 채워서 만든 이미지이다. 대표적인 형식으로는 jpg,png가 있다. 그리고 png는 <b>투명한 배경색</b>을 지원하지만 jpg는 <b>투명한 배경색을 지원하지 않는다</b>.

벡터 형식은 점,선,면의 형태로 데이터가 저장됩니다. 점을 이용해 직선, 곡선, 면까지 만들 수 있는데, 이런 데이터를 갖고 위치나 형태를 계산해 렌더링하는 형식이다.

![](https://velog.velcdn.com/images/doeunnkimm_/post/c55b0b04-c9e8-4e43-a3a0-3f1213b7b833/image.gif)

<b>이미지 사이즈에 상관없이 항상 깨지지 않는 이미지</b>의 경우 svg를 사용하는 것이 바람직하다!!

## svg+xml but dangerouslyAllowSVG is disabled에러

먼저 아래와 같은 주소로 리소스를 요청했을 때 다음의 에러가 발생했다.

```bash
The requested resource 
"https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Garfield" has type "image/svg+xml" but dangerouslyAllowSVG is disabled
```

그리고 공식문서에서는 다음과 같은 내용이 나온다.

기본 로더가 SVG이미지를 최적화하지 않습니다.
SVG는 벡터 형식이고 손실 없이 크기를 조정할 수 있고,
적절한 컨텐츠 보안 정책 헤더(CSP)없이는 보안적인 취약점을 초래할 수 있습니다.

따라서 src속성이 SVG임이 알려진 경우, unoptimized속성을 사용하는 것이 좋습니다. 이는 src가 .svg로 끝날 때 자동으로 발생합니다.

하지만, 기본 이미지 최적화로 SVG이미지를 제공하는 경우 
next.config.js의 dangerouslyAllowSVG를 설정할 수 있습니다.

결국 HTTP로 요청하는 리소스가 SVG인 경우 <b>next config의 dangerouslyAllowSVG</b>를 넣어주는 방법으로 해결했다.

```json
 images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
```

또한 contentSecurityPolicy도 같이 넣어주었는데, 브라우저가 이미지를 다운로드하도록 <b>contentDispositionType</b>을 설정하고, 스크립트 방지를 위해 <b>contentSecurityPolicy</b>을 설정하는 것이 바람직하다.

```json
contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
```


