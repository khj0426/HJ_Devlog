---
title: 'npm install과 npm ci의 차이'
excerpt: '같다고만 알고 있었다..'
date: '2024-02-26'
author: '김효중'
category: '기타'
image: '/images/postImg/lighthouseCI.png'
---

두 명령어 모두 의존성을 설치한다. 의존성은 현재 프로젝트에 필요한 패키지의 목록들을 의미한다.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRviuO2xvG2y4gZpj4vUgD2ST9odSKjH53gpw&usqp=CAU)

npm install은  npm install 명령어는 우리가 알다시피 특정 파일과 밀접한 관계가 있다. 이 특정 파일은 package.json과 package.lock.json이다. package.json 은 우리가 설치하고자 하는 모듈에 대한 의존성 목록이 존재한다.

```ts
"dependencies": {
    "@giscus/react": "^2.2.8",
    "@next/bundle-analyzer": "^13.4.7",
}
```
만약 로컬에서 A라는 개발자는 18버전의 노드를 사용하고, B라는 개발자는 20버전의 노드 버전을 사용한다. 

각기 다른 노드 버전을 사용하는 A와 B 개발자가 npm install을 실행하면 @giscus/react와 @next/bundle-analyzer와 같은 패키지의 다른 버전이 설치될 수 있다. 그 이유는 npm install이 package.json에 명시된 버전을 기본으로 하되, 보다 최신 버전의 패키지가 출시된 경우 그것을 설치하기 때문이다.

예를 들어, A 개발자가 먼저 npm install을 실행하여 @giscus/react 버전 2.2.8을 설치했다. 그 후에 @giscus/react의 새로운 버전 2.2.9가 출시되었다. 이후 B 개발자가 npm install을 실행하면, @giscus/react의 새로운 버전 2.2.9가 설치될 것이다.

이러한 상황은 개발자 간에 일관되지 않은 개발 환경을 초래할 수 있다.

```ts
분명 로컬에선 문제 없이 실행되는데,
action에서만 뭔가 오류가 터지고 에러가 발생한다면?
```

액션 과정에서 npm install을 사용했다면 버전 간의 충돌을 한번쯤은 의심해볼법 하다!

이런 상황을 방지하고자 package-lock.json이 존재한다. 이 파일은 <mark>정확한 버전</mark>을 명시한다.

```ts
react@^17.0.2:
  version "17.0.2"
```

그럼 이제 npm install과 npm ci의 차이를 알아보자. 먼저 두 명령어 모두 <mark>의존성 목록</mark>을 설치하는 데서는 크게 같다고 볼 수 있다.

npm install을 하면 package.json에 의존성이 추가될 것이고 package-lock.json이 업데이트된다.

반면 npm ci를 하게 되면 무조건 package-lock.json이 존재해야 하고 없으면 에러를 낸다. 또한 이 package-lock.json을 기반으로 의존성을 설치하고 package-json 사이 버전이 매칭이 안되면 에러를 낸다.

npm ci를 실행하면 node_modules를 지우고 의존성을 설치한다.
즉, 오직 package-lock.json만을 읽어서 의존성을 설치한다.

따라서 npm ci는 일반적으로 지속적인 통합(CI) 시스템에서 종속성을 설치하는 데 사용된다. 이는 npm ci가 항상 동일한 종속성을 설치하므로, 빌드 프로세스가 일관성을 유지하게 해주기 때문이다.


