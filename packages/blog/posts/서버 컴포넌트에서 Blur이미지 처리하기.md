---
title: '서버 컴포넌트에서 Blur이미지 처리하기'
excerpt: 'plaiceholder라이브러리와 삽질기'
date: '2024-02-01'
author: '김효중'
category: 'Next.js'
image: '/images/postImg/next13.png'
---

### 서버 컴포넌트에서 Blur 이미지 처리하기

Next의 Image컴포넌트는 이미지가 로딩되기 전에 보여줄 placeholder속성을 기본적으로 제공해줍니다. 이 속성의 기본값은 empty지만 blur라는 속성을 갖을 수 있습니다. 

이 속성은 <mark>layout shifts</mark>를 방지하기 위해 사용할 수 있습니다. 이미지를 불러오기 전까지 아무 화면에 반응이 없다가 이미지가 갑자기 나타나버리면 사용자 입장에서는 불편할 수 밖에 없습니다.

<video controls >
  <source src="https://blog.olivierlarose.com/medias/articles/placeholder-next-image/layoutshift.mov" type="video/mp4">
  브라우저가 비디오를 지원하지 않습니다.
</video>

이 blur를 쓸 때는 blurDataURL이 필요합니다. 먼저 공식문서에서는 placeholder속성에 대해 다음과 같이 설명하고 있습니다.

'blur'를 선택하면, 'blurDataURL' 속성이 플레이스홀더로 사용됩니다. 만약 'src'가 정적으로 가져온 이미지(.jpg, .png, .webp, .avif)의 객체라면, 그 이미지가 애니메이션으로 감지되지 않는 한 'blurDataURL'이 자동으로 채워집니다.

![](https://blog.olivierlarose.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fjzzgtonmw9s6%2F4N2zUG5Z5Rm5U2y7eZAhkB%2Fc8e7b86c9662ccb83d79ef090ace841e%2FArtboard-1-copy-8.jpg&w=1080&q=75)

동적 이미지의 경우, 'blurDataURL' 속성을 제공해야 합니다. 이러한 base64 생성에는 Plaiceholder와 같은 솔루션이 도움이 될 수 있습니다.

'data:image/...'를 선택하면, Data URL이 이미지가 로딩되는 동안 플레이스홀더로 사용됩니다.

'empty'를 선택하면, 이미지가 로딩되는 동안 플레이스홀더는 없으며 공간만 비워둡니다.

```ts
//정적인 이미지를 불러온 경우

import Image from 'next/image'
import ViewSource from '../components/view-source'
import mountains from '../public/mountains.jpg'

const PlaceholderBlur = () => (
  <div>
    <ViewSource pathname="pages/placeholder.tsx" />
    <h1>Image Component With Placeholder Blur</h1>
    <Image
      alt="Mountains"
      src={mountains}
      placeholder="blur"
      width={700}
      height={475}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  </div>
)

export default PlaceholderBlur
```

public폴더나 외부에서 이미지를 가져오는 경우 <mark>blurDataURL</mark>을 필수로 채워줘야 합니다. 이때 공식문서에서는 <mark>Plaiceholder</mark> 라이브러리를 추천하고 있습니다.

먼저 sharp와 plaiceholder, @plaiceholder/next 라이브러리가 필요합니다. plaiceholder는 ESM모듈로서만 제공하기 때문에 CommonJS의 require,module.exports를 사용할 수 없는데요, 따라서 next.config을 ESM모듈을 사용하도록 바꿀 필요가 있었습니다.(.mjs파일은 정석대로 ESM사양을 준수하는 자바스크립트 파일에 사용되는 확장자입니다.) 

그 후 next config을 다음과 같이 수정하면 기본적인 사용준비를 마치게 됩니다!

```ts
// @ts-check
import withPlaiceholder from "@plaiceholder/next";
 
/**
 * @type {import('next').NextConfig}
 */
const config = {
  // your Next.js config
};
 
export default withPlaiceholder(config);
```

이제 base64의 이미지를 만드는 유틸 함수를 만들어 보겠습니다. 이 함수는 plaiceholder의 getPlaiceholder를 사용하는데 다음과 같이 사용할 수 있습니다.

이 함수는 원본 이미지를 낮은 품질의 이미지 플레이스홀더(Low Quality Image Placeholder, LQIP)로 변환하는 역할을 합니다.

```ts
getPlaiceholder(input,options)

input:원본 이미지의 raw Buffer 소스
옵션으로는 다음의 속성이 들어갈 수 있습니다.

sizes : 반환되는 플레이스홀더 크기 4~64사이의 정수

brightness: 밝기를 조정하는 배수. 기본값은 1!

format: 출력을 강제로 지정된 형식으로 변경(기본값은 png)

saturation: 채도를 조정하는 배수입니다. 기본값은 1.2입니다.
```

다만 plaiceholder가 브라우저에서 동작하지 않기 떄문에 서버 컴포넌트 내부에서만 사용해야 합니다.(클라이언트 컴포넌트에서는 사용할 수 없습니다.) 이제 base64의 이미지를 만드는 유틸을 작성해보겠습니다.

```ts
//util/getBase64BlurImage.ts

import { readFile } from 'fs/promises';
import path from 'node:path';

import { getPlaiceholder } from 'plaiceholder';
export default async function getBase64BlurImage({
  src,
  width,
  height,
  blurSize,
}: {
  src: string;
  width?: number;
  height?: number;
  blurSize?: number;
}) {
  const buffer = await readFile(
    path.join(process.cwd(), path.join('/public', src))
  );

  const blurImage = await getPlaiceholder(buffer, {
    size: blurSize ?? 10,
  });

  return {
    ...blurImage,
    img: {
      src,
      width,
      height,
    },
  };
}
```
그리고 컴포넌트에서는 다음과 같이 가져와 사용합니다. async는 서버 컴포넌트에서만 동작하기 떄문에 위의 유틸을 클라이언트 컴포넌트에서 사용하는 것은 불가능합니다.

![](https://global.discourse-cdn.com/business5/uploads/apollographql/original/2X/2/29eb31147371d9e9bf793508b4531accb468d0f1.png)

```ts
import Image from 'next/image';

import getBase64BlurImage from '@/utils/getBase64BlurImage';
export default async function ProfileImageWrapper({
  imgurl,
}: {
  imgurl: string;
}) {
  const { base64 } = await getBase64BlurImage({
    src: imgurl,
  });
  return (
    <Image
      placeholder="blur"
      src={imgurl}
      alt="About 페이지 프로필 이미지"
      width={300}
      height={300}
      blurDataURL={base64}
      priority
    />
  );
}
```
<video width="80%" height="auto" controls>
  <source src="/images/postImg/이미지.webm" type="video/webm">
</video>

### 했던 고민

무조건 서버 컴포넌트에서만 사용한다는 제약이 존재해서, 결국 쓰고 있는 styled-components과 서버 컴포넌트에 대해 고민하게 된다. 서버컴포넌트를 잘 쓰기 위해서는 결국 tailwind나 CSS Module방식을 써야할 것 같은데 이미 많은 양의 코드를 styled-components로 적용해놓아서, 이를 바꾸는 것이 맞는지 고민이 된다...

vercel로 배포할 때 계속 빌드 에러가 떠서 많은 삽질을 했다.

```ts
Creating an optimized production build ...
09:36:50.357 | corrupted size vs. prev_size
09:38:44.307 | Error: Command "npm run build" exited with SIGABRT
```
찾아보니 sharp 0.33버전의 문제가 이슈로 등록되어 있었고 ([관련 이슈](https://github.com/lovell/sharp/issues/3870)), 버전을 0.31.3로 낮춰 해결했다.




