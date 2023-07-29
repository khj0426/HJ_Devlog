---
title: 'Next js app route로 블로그 만들기'
excerpt: '블로그를 구축하면서 했던 삽질,기록들'
date: '2023-07-29'
author: '김효중'
category: 'Next.js'
image: '/images/postImg/NextjsBlog.webp'
---

![](/images/postImg/NextjsBlog.webp)

## 블로그를 만들고자 했던 이유

정말 많은 개발 블로그 플랫폼이 존재합니다. 저 역시도 과거에 티스토리, velog를 자주 사용했고, 이런 블로그 플랫폼은 간편하게 통계 시스템이나 디자인을 바꿀수도 있는 등의 여러 기능을 제공해 줍니다.

![](https://blog.kakaocdn.net/dn/9WfWp/btqv94L24D2/KRvYtFAxVq9KjvN9yfGX3k/img.png)

## 그럼 왜 만드는데?

저만의 블로그를 만들고 싶었습니다. 여러 기능을 직접 만들 수도 있고, 프론트엔드 개발자가 되고 싶은 사람으로서 블로그를 직접 제 손으로 구축하는 경험은 정말 재밌을 것 같았습니다. 

SEO를 어떻게 최적화할지, TOC를 어떻게 만들지, 다크모드는 어떻게 만들지... 고민하고 개발하는 과정이 어렵지만 재밌을 거 같았어요.!

프론트엔드 개발자 분들이 만든 여러 블로그 템플릿들을 보면서 '블로그를 직접 내 손으로 만들고 싶다' 라는 마음이 생기기도 했고, 기술적으로는 최근에 나온 Next js의 여러 기능을 블로그에 녹여보고도 싶었습니다.


## 블로그에 어떤게 필요하지??

제 생각에 블로그에 꼭 필요한 여러 가지는 다음과 같습니다.

- 반응형 디자인
- 다크모드
- 댓글 시스템
- Google Search Console
- 사이트맵
- Open Graph
- 글 포스팅
- TOC
- 아름다운 디자인..?
- 통계 시스템 구축

위 리스트들을 하나씩 블로그에 입혀가는 것 만으로 많은 것을 배울 수 있고 경험할 수 있다고 생각했습니다.

## App 디렉토리

최근나온 Next js의 App 디렉토리를 사용해보았는데요, App 디렉토리 아래 모든 컴포넌트는 기본적으로 <mark>서버 컴포넌트</mark>가 됩니다.

일반적으로 사용하는 컴포넌트를 <mark>클라이언트 컴포넌트</mark>로 분리를 명확히 하게 됩니다.
그래서 <mark>use client</mark>이라는 명령 없이 일반적으로 클라이언트 컴포넌트를 app에서 사용하면 에러를 볼 수 있습니다.

![](/images/postImg/clientComponentError.png)

따라서 파일 최상단에 use client 명령어를 명시적으로 적어줘야 클라이언트 컴포넌트로 작동하게 됩니다.

```js
'use client';
export default function ClientComponent() {
  return <div>{children}</div>;
}
```

![](https://miro.medium.com/v2/resize:fit:1400/1*Ez-tFvQl1O5yM4k3bU4qpw.png)

## Layout

매 화면마다 공통되게 보여주게 될 요소들을 이 layout 컴포넌트에 작성하고 children으로 하위 컴포넌트에 내려줍니다. 

보통 _app.js에서 사용하는 역할을 layout가 대신하게 됩니다.

layout은 컴포넌트를 담지만 <mark>리랜더링 되지는 않습니다.</mark>
공통되게 보여지는 meta요소들, Footer, 전역 스타일 요소들,,등등이 layout에 위치하고 하위 요소들은 모두 
```js
<div className="body"/> 
``` 
에 들어가게 됩니다.

이 레이아웃은 2가지의 타입으로 분리됩니다.
- Root Layout : 모든 라우트에 적용되는 레이아웃
- Regular Layout : 특정 라우트에서 적용되는 레이아웃

```js
//src/app/layout.tsx
import './globals.css';
import Recoil from './Recoil';
import GlobalStyle from '@/style/globalStyle';
import { ThemeWrapper } from './themeWrapper';
import Navbar from '@/Component/Common/Navbar';
import Footer from '@/Component/Common/Footer';
import localFont from 'next/font/local';
import { Metadata } from 'next';

const baseFont = localFont({
  src: './fonts/KyoboHandwriting2022khn.ttf',
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'HJ`s Blog',
  description: '개발관련 여러 지식을 기록하는 공간',
  icons: {
    icon: '/images/favicon.webp',
  },
  metadataBase: new URL('https://hj-devlog.vercel.app/'),
  openGraph: {
    url: 'https://hj-devlog.vercel.app',
    title: 'HJ`s Blog',
    description: '개발 관련 여러 지식을 기록하고, 정리하는 공간입니다',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/59411107?v=4',
        width: 800,
        height: 600,
      },
      {
        url: 'https://avatars.githubusercontent.com/u/59411107?v=4',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: 'g3Daim29whdK1ZzL1CE6pvkYyvSgM5-6C898-TVjiz0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={baseFont.className}>
      <body className="App">
        <Recoil>
          <ThemeWrapper>
            <GlobalStyle />
            <Navbar />
            {children}
          </ThemeWrapper>
          <Footer />
        </Recoil>
      </body>
    </html>
  );
}
```

## 동적 라우팅

Next13버전도 12버전처럼 브래킷 []을 사용합니다.

예를 들어 app디렉토리 안에 blogs폴더를 만들고 그안에 [slug]라는 폴더를 만들고 그 안에 page.jsx를 만듭니다.

```js
//app/blogs/[slug]/page.jsx

export default function BlogPage({params} : {params:{
    slug : string
}}){
    return <></>
}
```

해당 경우 폴더 구조가 app/blogs/[slug]이기 때문에 해당 params는 slug이 되고 이 slug에 string값이 저장됩니다. 이와 같은 동적 라우팅으로 글별로 동적인 라우팅을 적용할 수 있습니다.

## 글 포스팅

마크다운을 이용해 글을 포스팅하고 있습니다.
프로젝트 내의 posts폴더에서 마크다운으로 파일을 만들고, 이 마크다운을 읽어와서 랜더링해주는 방식으로 진행됩니다.

Next js의 <a href = "https://github.com/vercel/next.js/tree/canary/examples/blog-starter" target = "_blank" style = "color:rgb(0, 131, 120)">blog-starter</a>에서 마크다운을 읽어오는 코드를 볼 수 있었습니다.

```js
//마크다운 글을 읽어오는 과정

import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

//현재 작업경로와 _posts폴더를 연결함.
const postsDirectory = join(process.cwd(), '_posts')

//post디렉토리의 모든 파일을 긁어옴.
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

//slug에 해당하는 마크다운 파일을 읽어서 필드의 데이터를 꺼냄
export function getPostBySlug(slug: string, fields: string[] = []) {
  //md확장자 제거용
  const realSlug = slug.replace(/\.md$/, '')

  //파일의 내용을 utf8형식으로 가져옴
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  //파일 내용을 data,content로 분류함.
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
```

위 코드는 루트의 _posts폴더의 모든 파일을 읽어 해당 파일을 gray-matter라이브러리로 배열화해서 불러오는 방식입니다.

예를 들어 루트의 _posts폴더에 다음의 마크다운 글이 있습니다.

```js
//_posts/example.md

---
title: '제목입니다.'
date: '2023-07-30'
image: '/images/postImg/Js.png'
---

<h2>안녕하세요</h2>
```
그럼 이 gray-matter는 다음과 같이 객체를 만들어 반환해줍니다.
```js
{
    content:`<h2>안녕하세요<h2>`,
    title : '제목입니다',
    date : '2023-07-30',
    image : '/images/postImg/Js.png'
}
```

최종적으로 모든 _posts의 모든 마크다운 글을 읽어오는 getPostSlugs를 거치면

```js
[
  'ImperativeandDeclarative.md',
  'JSAstTree.md',
  'jstepp.md',
  'modernJS.md',
  'module.md',
  'Nextblog.md',
  'NodejsEventLoop.md',
  'NotionClone.md',
  'reflectionfirstof2023.md'
]
```
이런식으로 데이터가 불러와지고, 이 md파일의 이름을 갖고 getPostBySlug(slug,fields)함수를 호출하면 
<mark>data</mark>와 <mark>content</mark>로 분리가 이루어집니다.

최종적으로 
```js
[
  {
    title: 'Next js app route로 블로그 만들기',
    slug: 'Nextblog',
    category: 'Next.js',
    excerpt: '블로그를 구축하면서 했던 삽질,기록들',
    date: '2023-07-29',
    image: '/images/postImg/NextjsBlog.webp',
    content: '블로그 글 내용 ##제목```js코드코드```'
  },
  {
    title: '노션 클로닝 회고',
    slug: 'NotionClone',
    category: '회고',
    excerpt: '자바스크립트와 더 친해진 것 같다..!',
    date: '2023-07-18',
    image: '/images/postImg/notion.png',
    content: '블로그 글 내용 ##제목```js코드코드```'
  },
  {
    title: '2023 상반기를 돌아보며',
    slug: 'reflectionfirstof2023',
    category: '회고',
    excerpt: '나는 무엇을 했나!',
    date: '2023-07-05',
    image: '/images/postImg/blogbundleSize.png',
    content: '블로그 글 내용 ##제목```js코드코드```'
  },
]
```
모든 파일에 대해 getPostBySlug를 한 후 이런식의 객체 배열형식이 되고 이 객체 배열을 반환해줍니다. 이제 <mark>content</mark> 부분을 HTML구조로 랜더링을 해줘야 합니다.

## 마크다운 글 파싱해주기

문자열의 글을 HTML구조로 파싱해주는 라이브러리는 React-MarkDown 라이브러리를 사용했습니다. children에 받은 글의 content부분을 넣어주면 잘 파싱이 동작합니다.

```jsx
    <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            img: ({ node, ...props }) => (
              <img
                src={props.src || ''}
                alt="마크다운 이미지"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            ),
            code: ({ node, inline, children, ...props }) => (
              <CodeBlock>{children as string}</CodeBlock>
            ),
          }}
        >
          {post.content}
    </ReactMarkdown>
```

## 코드 블럭 꾸미기

코드블럭도 이쁘게 꾸미고 싶었습니다. 코드블럭을 꾸며주는 라이브러리는 정말정말 많습니다.
<a href = "https://blog.logrocket.com/exploring-best-syntax-highlighting-libraries/" target = "_blank" style = "color:rgb(0, 131, 120)">Exploring the best syntax highlighting libraries</a> 이 글을 참고하고 많은 고민을 했습니다.

저는 자료가 가장 많고, 사람들이 많이 쓰고 다양한 스타일이 존재하는 react-syntax-highlighter 라이브러리를 사용했습니다.

## OpenGraph

열심히 만든 블로그를 친구에게 공유했는데 다음과 같이 나오면 굉장히 슬플 것입니다. 😭😭

![오픈그래프](/images/postImg/opgkakao.png)

오픈그래프를 사용하면


썸네일을 포함한 웹페이지 미리보기가 제공되기 때문에 대략적으로 이 페이지가 어떤 내용을 다루고 있는지 사용자가 쉽게 확인할 수 있습니다.

물론 SEO에 직접적으로 영향을 주진 않지만, 오픈그래프를 사용하면 사용자에게 더 좋은 경험을 줄 수 있습니다!🙃 내가 만든 웹 사이트의 오픈그래프를 쉽게 다음의 사이트에서 확인가능합니다!

<a href = "https://www.opengraph.xyz/url/https%3A%2F%2Fjunghyeonsu.com%2Fposts%2FAbout-design-system" target = "_blank" style = "color:rgb(0, 131, 120)">오픈그래프 보러가기</a>

정적인 meta데이터를 쉽게 만들수 있습니다.
<a href = "https://nextjs.org/docs/app/building-your-application/optimizing/metadata" style = "color:rgb(0,131,120)">MetaData</a>

```js
export const metadata: Metadata = {
  title: 'HJ`s Blog',
  description: '개발관련 여러 지식을 기록하는 공간',
  icons: {
    icon: '/images/favicon.webp',
  },
  metadataBase: new URL('https://hj-devlog.vercel.app/'),
  openGraph: {
    url: 'https://hj-devlog.vercel.app',
    title: 'HJ`s Blog',
    description: '개발 관련 여러 지식을 기록하고, 정리하는 공간입니다',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/59411107?v=4',
        width: 800,
        height: 600,
      },
      {
        url: 'https://avatars.githubusercontent.com/u/59411107?v=4',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: 'g3Daim29whdK1ZzL1CE6pvkYyvSgM5-6C898-TVjiz0',
  },
};
```

다만 블로그 글 별로 제목이나 대표하는 이미지가 달라지기떄문에 openGraph를 글마다 <mark>동적으로</mark>만들 필요가 생깁니다.
이 경우 다음과 같이 <mark>generateMetadata</mark>함수를 통해 만들 수 있습니다!.!

```js
//src/app/blog/[slugs]/page.tsx

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = getPostBySlug(params.slug, [
    'title',
    'content',
    'excerpt',
    'date',
    'author',
    'image',
  ]);

  const openGraphImage = post.image;
  const dynamicMetaTag: Metadata = {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [
        {
          url: `${post.image}`,
          width: 800,
          height: 600,
        },
      ],
    },
    keywords: post.title,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    verification: {
      google: 'g3Daim29whdK1ZzL1CE6pvkYyvSgM5-6C898-TVjiz0',
    },
  };
  return dynamicMetaTag;
}
```
## 사이트맵

사이트맵은 검색 엔진에 게시 될 자신의 웹사이트 콘텐츠의 크롤링 및 색인을 돕는 페이지 목록의 역할을 합니다.

![사이트맵](https://aioseo.com/wp-content/uploads/2020/08/submitting-sitemaps-in-google-search-console.jpg)

공식문서에 따르면 app 디렉토리 안에 sitemap.js를 만들면 쉽게 사이트맵을 생성가능합니다.

```js
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
    },
  ]
}
```
다음과 같은 코드의 결과는 아래와 같습니다.

```js
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
  </url>
</urlset>
```
이렇게 쉽게 사이트맵을 생성 가능합니다!

## 더 개선할점

- RSS 피드 만들기(기왕이면 자동으로!)
- 블로그 글에 목차 나타내기
- 노션과 연결해서 TIL띄워주기
- 뒤죽박죽인 코드정리하기



