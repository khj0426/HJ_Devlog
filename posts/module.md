---
title: '# ES6의 모듈'
excerpt: '기존의 모듈,es6의 새로운 모듈에 대해 알아보자'
date: '2023-06-19'
author: '김효중'
category: 'Js'
---

## CommonJS에서의 모듈

CommonJS는 2009년에 만들어진, 자바스크립트 모듈을 만들기 위한 일종의 규칙입니다.
이 방법은 원래 브라우저를 위한 것이 아닌, 서버사이드 애플리케이션을 위해 만들어졌습니다.

CommonJs로 모듈을 정의해, 이를 export를 하고 다른 모듈에서 import를 합니다.

```js
//math.js
function add(a,b){
    return a+b;
}

function multiply(a,b){
    return a*b;
}

module.exports = {
    add,
    multiply
}
```

```js
//main.js
const math = require('./math');

console.log(math.add(2+3));
//5

console.log(math.multiply(3,5));
//15
```

그러나, Common Js는 몇 가지 문제점이 있었습니다.
- 언어 표준이 아닌 CommonJs
    - CommonJs는 자바스크립트 언어 표준이 아니었기 떄문에, Node를 지원하고 CommonJs 모듈시스템을 지원하는 런타임에서만 사용가능합니다.

- require는 함수이기 때문에 누구나 마음대로 동작을 바꿀 수 있습니다.
    ```js
    const defaultRequire = global.require;
    const myRequire = (request:string) => {
        ...
    }

    global.require = myRequire;
    ```
    위의 코드처럼 재정의하는 것도 가능합니다. 이러한 경의 예측 가능하지 못한 동작을 야기할 수 있습니다.

## CommonJS의 번들 크기 측정

먼저 번들은 웹 애플리케이션에서 여러 <b>파일</b>을 하나로 묶는 것입니다.
이렇게 번들된 파일이 웹 페이지에서 로드되어 실행됩니다.

그리고 이렇게 여러 파일을 묶고 압축해주는 작업을 <b>모듈 번들링</b>이라고 부릅니다.
![](https://joshua1988.github.io/webpack-guide/assets/img/webpack-bundling.e79747a1.png)


먼저 다음과 같은 함수를 정의했습니다.
```js
// utils.js
const { maxBy } = require('lodash-es');
const fns = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  max: arr => maxBy(arr)
};

Object.keys(fns).forEach(fnName => module.exports[fnName] = fns[fnName]);
```

그리고 이 함수를 index.js의 파일에서 일부 또는 전체를 가져와 사용 가능합니다.
```js
const {add} = require('./utils');
console.log(add(1,2);)
```
먼저 웹펙을 이용해, 두 폴더 utils.js, index.js만 있는 상태에서 앱을 빌드했습니다.

```js
const path = require('path');
module.exports = {
  entry: './index.js',
  output: {
    filename: 'out.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};

```
먼저 Common JS를 사용했을 떄 웹팩을 이용해 번들을 하면 out.js에 다음과 같은 결과를 얻었습니다.

```js
asset out.js 87.9 KiB [compared for emit] [minimized] (name: main) 1 related asset
```

out.js의 번들된 크기가 87.9 KiB인 것을 확인할 수 있습니다. index.js에는 어떤 lodash패키지도 없지만, 엄청난 lodash관련 내용과 utils.js의 함수가 포함되어 있습니다.

```js
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { maxBy } = __webpack_require__(503);
const fns = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  max: (arr) => maxBy(arr),
};

Object.keys(fns).forEach((fnName) => (module.exports[fnName] = fns[fnName]));


/***/ }),

/***/ 503:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  add: () => (/* reexport */ lodash_es_add),
  after: () => (/* reexport */ lodash_es_after),
  ary: () => (/* reexport */ lodash_es_ary),
  assign: () => (/* reexport */ lodash_es_assign),
  assignIn: () => (/* reexport */ lodash_es_assignIn),
  assignInWith: () => (/* reexport */ lodash_es_assignInWith),
  assignWith: () => (/* reexport */ lodash_es_assignWith),
  at: () => (/* reexport */ lodash_es_at),
  attempt: () => (/* reexport */ lodash_es_attempt),
  before: () => (/* reexport */ lodash_es_before),
  bind: () => (/* reexport */ lodash_es_bind),
  bindAll: () => (/* reexport */ lodash_es_bindAll),
  bindKey: () => (/* reexport */ lodash_es_bindKey),
  camelCase: () => (/* reexport */ lodash_es_camelCase),
  capitalize: () => (/* reexport */ lodash_es_capitalize),
  castArray: () => (/* reexport */ lodash_es_castArray),
  ceil: () => (/* reexport */ lodash_es_ceil),
  chain: () => (/* reexport */ lodash_es_chain),
  chunk: () => (/* reexport */ lodash_es_chunk),
  clamp: () => (/* reexport */ lodash_es_clamp),
  clone: () => (/* reexport */ lodash_es_clone),
  cloneDeep: () => (/* reexport */ lodash_es_cloneDeep),
  cloneDeepWith: () => (/* reexport */ lodash_es_cloneDeepWith),
  cloneWith: () => (/* reexport */ lodash_es_cloneWith),
  commit: () => (/* reexport */ commit),
  compact: () => (/* reexport */ lodash_es_compact),
  concat: () => (/* reexport */ lodash_es_concat),
  cond: () => 

```


![CJS](/images/postImg/bundle.png)


## ES6의 모듈

import는 export로 내보내진 변수,함수 등등을 불러올 수 있는 키워드입니다.

```js
import defaultExport from 'module-name';
//module-name 내에 export default로 내보내진 것을 가져옵니다.
import * as allItems from 'module-name';
//module-name내에서 export된 모든 것을 가져옵니다. as 이후 이름은 중복되지 않으면
//자유롭게 정합니다.
import { loadItem } from 'module-name';
//module-name 내에서 export된 것 중에 특정 값만 가져옵니다
 
import {
    loadItem as loadSomeThing 
} from 'module-name';

//module-name 내에서 export된것 중에 특정 값만 이름을 바꿔 가져옵니다.

import defalutFunction, {
    loadItem
} from 'module-name'; 

//export default 된 것과 개별, export된 것을 한번에 가져옵니다.

import 'module-name';
//별도의 모듈 바인딩 없이 불러오기 만합니다.
//불러오는 것으로 효과가 있는 스크립트의 경우 사용됩니다.
```

## ES6 모듈의 장점들

이렇게 하면 각 JS별로 사용되는 모듈을 명시적으로 Import해오기 때문에, 스크립트를 추적하기 쉬워집니다.

또한 무분별한 전역 오염을 방지할 수 있습니다. 

웹팩을 이용해 동일한 utils.js,index.js를 ES6의 모듈시스템으로 바꿔보았습니다.

```js
//utils.js
export const add = (a, b) => a + b
export const subtract = (a, b) => a - b
export const multiply = (a, b) => a * b
export const divide = (a, b) => a / b

import { maxBy } from 'lodash-es'

export const max = (arr) => maxBy(arr)

```

```js
//index.js
import { add } from './utils';

console.log(add(1, 2));
```
그리고 웹팩을 실행하면 다음의 결과를 얻을 수 있습니다. out.js의 코드와 함께 무려 38 바이트의 크기를 갖는 것을 확인할 수 있습니다.

```
asset out.js 38 bytes [compared for emit] [minimized] (name: main)
```

```js
//out.js
(()=>{"use strict";console.log(3)})();

```
lodash도 찾아볼 수 없고 utils.js의 코드도 사라진 것을 볼 수 있습니다.

CommonJs모듈은 일반적으로 최적화를 진행하기 어렵습니다. 번들러가 더 성공적으로 애플리케이션을 최적화하게 하려면 CommonJS모듈모다 ECMA모듈을 쓰는 것이 더 좋습니다.

## CommonJS의 번들크기가 ECMA모듈모다 더 큰 이유?

먼저 웹팩의 <b>ModuleConcatenationPlugin</b>은 웹팩의 플러그인입니다.
앞서 웹펙의 설정에서 <b>production mode</b>를 켜줬는데 production mode가 활성화되면 <b>ModuleConcatenationPlugin</b>이 자동으로 활성화됩니다(3버전 이상)

이 플러그인은 연속된 모듈을 하나의 함수로 결합(concatenate)하여 중복 코드를 제거합니다.

만약 utils.js의 동일한 subtract함수를 index.js에서 정의하면 어떻게 될까요? 예를들어

```js
//utils.js
export const add = (a,b) => a+b;
export const substract = (a,b) => a-b;
```

```js
//index.js
import {add} from './utils';
const substract = (a,b) => a-b;

console.log(add(1,2));
```
위의 index.js에서는 utils.js의 substract를 그대로 정의합니다. 웹팩을 이용해 빌드하면 다음의 결과가 나옵니다.

```js
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./utils.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

;// CONCATENATED MODULE: ./index.js


const index_subtract = (a, b) => a - b;
console.log(add(1, 2));

/******/ })()
;
```

위의 출력에서 <b>모든 함수가 동일한 네임스페이스</b>안에 있습니다. 
충돌을 막기위해 index.js의 substract함수이름을 index_substract로 변경했습니다.

사용하지 않는 import를 정리하는 것을 <mark>트리쉐이킹</mark>이라고 합니다.
트리쉐이킹은 웹픽이 <b>utils.js</b>에서 import하는 것과 어떤 것을 export하는지 <mark>빌드타임</mark>에 
정적으로 이해했기 떄문에 가능합니다.

이러한 기능은 CommonJs방식과 비교했을 떄 더 명확해지는데, 같은 예제를 CommonJs방식으로 실행해보겠습니다.


```js
// utils.js
const { maxBy } = require('lodash-es')

const fns = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  max: (arr) => maxBy(arr),
}

Object.keys(fns).forEach((fnName) => (module.exports[fnName] = fns[fnName]))
```

out의 크기가 너무 커져서 다음의 코드만 살펴보겠습니다.

```js
...
(() => {

"use strict";
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(288);
const subtract = (a, b) => a - b;
console.log((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .add */ .IH)(1, 2));

})();
```

이 빌드에서는 코드 실행 시 add함수를 (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .add */ .IH)(1, 2) - _utils__WEBPACK_IMPORTED_MODULE_0__ 
모듈에서 동적으로 불러오고 있는 것을 볼 수 있습니다.

## 결론

번들러가 애플리케이션 최적화를 진행하게, ECMA모듈을 잘 쓰자..!



