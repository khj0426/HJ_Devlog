---
title: '[짧]SVG를 리액트에서 써보자'
excerpt: 'SVG를 리액트에서 어떻게 쓸까?'
date: '2024-06-28'
author: '김효중'
category: 'React'
image: '/images/postImg/svgr.png'
---

먼저 리액트에서 SVG를 사용하는 방법은 크게 다음과 같다.

- SVG파일로 저장하고 불러와서 img태그의 src에 넣어서 사용하는 방법

```tsx
import Smile from '../assets/smile.svg';

const Item = () => {
    return <img src = {Smile} />
}
```

- SVG파일로 저장하고 불러와서 SVG를 컴포넌트처럼 사용하는 방법

```tsx
import React from 'react';
import { ReactComponent as Smile } from '../assets/smile.svg';
const SaleItem = () => {
   return (
      <div>
         <Smile fill="blue"/>
      </div>
   );
};

export default SaleItem;
```

두번쨰 방법으로 SVG를 사용하면 아무래도, SVG내부의 요소를 직접 조작할 수 있고, 유연하기 때문에 좋다. 이 떄 SVG이미지를 쉽게 조작하고 사용하기 위해 svgr이라는 라이브러리를 사용한다.

먼저 의존성 부터 설치하자

```bash
yarn add -D @svgr/webpack
```

이렇게 추가하고 리액트라면 webpack.config.js에 Next라면 next.config.js에 다음을 추가해주면 된다.

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
};

// next.config.js
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
```

Vite를 사용하는 경우 vite-plugin-svgr라이브러리를 사용한다.

```bash
yarn add -D vite-plugin-svgr
```

그 후 vite-env.d.ts를 수정한다.

```ts
///<reference types = "vite-plugin-svgr/client" />
```

```ts
//vite.config.js

import svgr from 'vite-plugin-svgr'

export default {
    //
    pulgins:[svgr(),react()]
}
```

그 후 tsconfig.json을 수정한다.

```json
{
    "complierOptions" : {
        "types":["vite-plugin-svgr/client"],
    },
    "include":["svg.d.ts"]
}
```

마지막으로 프로젝트 루트에 svg.d.ts파일을 추가하면 된다.

```ts
//svg.d.ts

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

```

이제 사용할 때는 아래와 같이 뒤에 ?react를 붙여서 사용하면 잘 동작한다!

```ts
import Logo from '../src/assets/logo.svg?react';
```