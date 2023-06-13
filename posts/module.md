---
title: '# Uncaught ReferenceError: require is not defined 오류👻'
excerpt: 'ECMA모듈, 그리고 common js에서의 모듈'
date: '2023-06-12'
author: '김효중'
---

이 주제를 글로 적는 이유는 개발 중 사소한 에러를 만나서입니다. 저는 Common JS방식을 사용하고 있었지만, 다음의 에러를 마주쳤습니다.
![Alt text](/images/postImg/module.png)

require & module.export 키워드는 Node.js문법이기 떄문에 브라우저에서는 동작하지 않습니다. 
그럼 require & module.export가 어떻게 작동하는지 먼저 살펴보겠습니다!

## Node js의 require & module.export

먼저 다음의 코드를 살펴봅시다. node.js에서는 모듈을 불러오기 위해 require()함수를 씁니다. 이 require함수는 동기로 이루어집니다.

`
const foo = require('foo')
`

