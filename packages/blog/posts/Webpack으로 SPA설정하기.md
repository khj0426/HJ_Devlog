---
title: 'Webpack으로 SPA설정하기'
excerpt: '겪었던 문제와 해결한 방법'
date: '2023-12-14'
author: '김효중'
category: 'Js'
image: '/images/postImg/Js.png'
---

기존 노션클로닝 과제를 뜯어고치던 와중.. 나는 npx serve - s을 이용해 개발환경을 띄우고 있었다.

그럼 npx serve -s는 뭐고 어떻게 동작했었지..?를 묻게 된다. (언젠가 배웠던 것 같은데 까먹은 거 같기도)

바로 npm에 들어가 해당 패키지가 뭔지 살펴봤다.

npx-server는 Node.js기반의 정적인 웹 서버 도구이다. -s를 이용해 SPA환경에서 지원도 해준다.

문제는 기존 코드의 props가 흩뿌러져 있는 문제 문에 이를 redux로 이용해 마이그레이션하는 과정에서 발생했다.

redux를 설치하고 다음의 코드를 적었을 때 이런 오류가 발생했다.

```
import { legacy_createStore } from 'redux';
import editorChild from './editorChildStore';
const store = legacy_createStore(editorChild);

export default store;
```

96920:1 Uncaught TypeError: Failed to resolve module specifier "redux". Relative references must start with either "/", 

이 문제를 찾아보니 자바스크립트에서 모듈을 import할 때 발생하는 문제였다.

모듈을 절대경로와 상대경로를 제외한 'redux'와 같이 사용하면 이는 유효한 코드가 아니다.

유효한 코드가 아니라는 말은 완전히 자격이 부여된 경로(절대경로 / 나 상대경로 ./ )로 가져와야 하는데 위와 같은 코드는 유효하지 않은 코드가 된다.

만약 이렇게 유효하지 않은 코드가 된다면 현재 패키지의 node\_modules폴더에서 이를 찾아본다.

나는 npx serve라는 정적인 웹 서버로 내 프로젝트를 띄우고 있었고, 브라우저에서 바로 JavaScript 모듈을 로드하려고 한다.

npx serve는 정적 파일 서버이므로, JavaScript 모듈을 번들링하지 않는다.

따라서 'redux'와 같이 모듈을 참조하려고 하면, 브라우저는 이를 현재 페이지의 URL에 상대적인 경로로 해석하려고 시도하게 된다. 결국 'redux'를 찾을 수 없었고 나는 **그럼 번들링을 해줘야 겠네**라는 필요성을 느꼈다.

여러 폴더구조의 자바스크립트 , CSS 파일을 하나로 묶고, node\_modules 폴더 안의 파일도 올바르게 참조하기 위해

나는 모듈 번들러를 프로젝트에 씌우기로 했다.

모듈 번들러의 선택은 여러 방향이 있었다.

rollup,Webpack,...Percel...등등...많았지만, Webpack을 제일 많이 들어봤고, 제일 자료가 많기에 이를 내 프로젝트에 엮어서 쓰기로 해보았다.

### 그래서 번들링은 왜 필요해?

앞서 문제를 겪다보니, 번들링이 필요한 이유를 한번에 와닿았던 것 같다.

node\_modules안의 폴더를 완전히 참조하기 위해, 여러 자바스크립트 파일을 한번에 불러오기 위해 필요하다.

웹팩은 이런 번들링을 해주는 하나의 도구이다!!

### 바벨?

바벨은 ES6 이상의 자바스크립트 소스 코드를 트랜스파일링하여

그보다 낮은 사양의 소스 코드만 해석 가능한 (예를 들어 IE라던가) 브라우저에서도 돌아가게 한다.

### 그럼 웹팩에서 어떤식으로 파일을 불러와서 읽지?

리졸버(resolver)는 절대 경로로 모듈을 찾는데 도움을 주는 라이브러리이다.예를들어 모듈이 아래의 코드처럼 다른 모듈종속적으로 엮일 수 있다.

```
import foo from 'path/to/another_module'
```

이런 종속적인 모듈은 다른 라이브러리이나 애플리케이션 코드 단에서 충분히 많이 발생가능하다.

(당장 redux의 경우도..!)

Resolver는 이런 모든 가져오는 구문에 대해 포함되는 모든 모듈 코드를 찾는데 도움을 준다.

웹팩은 이 과정에서 enhanced-resolver를 사용한다!

[https://www.npmjs.com/package/enhanced-resolve](https://www.npmjs.com/package/enhanced-resolve)

 [enhanced-resolve
Offers a async require.resolve function. It's highly configurable.. Latest version: 5.15.0, last published: 6 months ago. Start using enhanced-resolve in your project by running \`npm i enhanced-resolve\`. There are 1174 other projects in the npm registry us www.npmjs.com](https://www.npmjs.com/package/enhanced-resolve)

### 모듈 경로

```
import * from 'redux';
```

이 경우 웹팩은 resolver를 통해 'redux'이름의 모듈을 찾는다. 

이때 node\_modules안에 있는 redux폴더를 찾고 해당 폴더의 package.json파일을 찾아 'main'필드에 정의된 파일을 최종적으로 불러온다. ( 이 경우 lib/redux.js를 불러오게 된다)!

```
{
  "name": "redux",
  "version": "4.2.1",
  "description": "Predictable state container for JavaScript apps",
  "license": "MIT",
  "homepage": "http://redux.js.org",
  "repository": "github:reduxjs/redux",
  "bugs": "https://github.com/reduxjs/redux/issues",
  "keywords": [
    "redux",
    "reducer",
    "state",
    "predictable",
    "functional",
    "immutable",
    "hot",
    "live",
    "replay",
    "flux",
    "elm"
  ],
  "authors": [
    "Dan Abramov <dan.abramov@me.com> (https://github.com/gaearon)",
    "Andrew Clark <acdlite@me.com> (https://github.com/acdlite)"
  ],
  "main": "lib/redux.js",
  "unpkg": "dist/redux.js",
  "module": "es/redux.js",
  "typings": "./index.d.ts",
  "files": [
    "dist",
    "lib",
    "es",
    "src",
    "index.d.ts"
  ],
  "scripts": {
    "clean": "rimraf lib dist es coverage",
    "format": "prettier --write \"{src,test}/**/*.{js,ts}\" index.d.ts \"**/*.md\"",
    "format:check": "prettier --list-different \"{src,test}/**/*.{js,ts}\" index.d.ts \"**/*.md\"",
    "lint": "eslint src test",
    "test": "jest",
    "test:watch": "npm test -- --watch",
    "test:cov": "npm test -- --coverage",
    "build": "rollup -c",
    "pretest": "npm run build",
    "prepublishOnly": "npm run clean && npm run format:check && npm run lint && npm test",
    "examples:lint": "eslint examples",
    "examples:test": "cross-env CI=true babel-node examples/testAll.js"
  },
  "dependencies": {
    "@babel/runtime": "^7.9.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.0",
    "@babel/node": "^7.8.7",
    "@babel/plugin-external-helpers": "^7.8.3",
    "@babel/plugin-proposal-object-rest-spread": "^7.9.5",
    "@babel/plugin-transform-runtime": "^7.9.0",
    "@babel/preset-env": "^7.9.5",
    "@babel/preset-flow": "^7.9.0",
    "@babel/preset-typescript": "^7.9.0",
    "@babel/register": "^7.9.0",
    "@rollup/plugin-babel": "^5.3.0",
    "@rollup/plugin-node-resolve": "^7.1.3",
    "@rollup/plugin-replace": "^2.3.2",
    "@types/jest": "^25.2.1",
    "@types/node": "^13.13.4",
    "@typescript-eslint/eslint-plugin": "^2.29.0",
    "@typescript-eslint/parser": "^2.29.0",
    "babel-eslint": "^10.1.0",
    "babel-jest": "^25.4.0",
    "cross-env": "^7.0.2",
    "eslint": "^6.8.0",
    "eslint-config-react-app": "^5.2.1",
    "eslint-import-resolver-typescript": "^2.0.0",
    "eslint-plugin-flowtype": "^4.7.0",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-react": "^7.19.0",
    "eslint-plugin-react-hooks": "^2.0.0",
    "glob": "^7.1.6",
    "jest": "^25.4.0",
    "prettier": "^2.0.5",
    "rimraf": "^3.0.2",
    "rollup": "^2.7.2",
    "rollup-plugin-terser": "^5.3.0",
    "rollup-plugin-typescript2": "^0.27.0",
    "rxjs": "^6.5.5",
    "typescript": "^3.8.3",
    "typings-tester": "^0.3.2"
  },
  "npmName": "redux",
  "npmFileMap": [
    {
      "basePath": "/dist/",
      "files": [
        "*.js"
      ]
    }
  ],
  "jest": {
    "testRegex": "(/test/.*\\.spec\\.[tj]s)$",
    "coverageProvider": "v8"
  },
  "sideEffects": false
}
```

---

그럼 하나씩 세팅해보자!! 아래의 패키지를 설치한다.

```
# Webpack
npm install -D webpack webpack-cli  
# webpack-cli는 커맨드라인에서 webpack을 실행할 수 있게 해준다.

npm install -D webpack-dev-server 
# webpack-dev-server는 개발 서버를 제공하며, 
# 파일이 변경될 때마다 자동으로 브라우저를 새로 고침한다.

npm install -D style-loader css-loader 
# style-loader와 css-loader는 webpack이 CSS 파일을 
# JavaScript 모듈로 변환하는 데 사용되는 로더입니다.

npm install -D html-webpack-plugin 
# html-webpack-plugin은 HTML 파일을 생성하며
# 생성된 JavaScript 번들을 HTML에 자동으로 주입한다.

npm install -D clean-webpack-plugin 
# clean-webpack-plugin은 빌드 전에 output 경로를 자동으로 정리한다.

# Babel
npm install -D @babel/core @babel/preset-env babel-loader 
# @babel/core는 Babel의 핵심 모듈로, JavaScript 코드를 변환하는 데 사용된다.
# @babel/preset-env는 최신 JavaScript 문법을
# 호환성이 높은 이전 버전의 JavaScript로 변환해주는 Babel 프리셋
# babel-loader는 webpack이 Babel과 통합할 수 있게 해주는 로더이다!
```

기본적인 webpack.config.js를 작성해준다.! 이 파일을 통해 웹팩을 제어하고, 웹팩을 커스텀할 수 있다!

정말 옵션도 많고 복잡하지만 가장 간단한 형태로 작성해주었다!

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 개발 서버 설정. 빌드 결과물을 제공하는 디렉토리 지정
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  // 엔트리 포인트 설정. 이 파일을 시작으로 엔트리 그래프를 만든다.
  entry: './src/main.js',

  // 출력 설정. 빌드 결과물의 파일 이름과 저장 위치를 지정
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: {
      keep: /\.git/,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

   // 플러그인 설정. 
   // CleanWebpackPlugin은 빌드 전 output.path에 있는 파일들을 제거하고, 
   // HtmlWebpackPlugin은 HTML 파일을 생성합니다.
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
```

웹팩이 잘 돌아가는 걸 볼 수 있다!

### SPA 설정 과정

웹팩 설정은 했지만 문제가 있었다. 리액트에서는 잘 처리해주던게 바닐라 자바스크립트에서는 일일이 설정해주어야 했다.

문제는 계속 자바스크립트 파일에 404가 걸린다는 것이였다..

![](https://velog.velcdn.com/images%2Fyoung_pallete%2Fpost%2Fdb5ba593-faa5-46b3-ac7d-468db68a5770%2Fimage.png)

관련해서 쭉 찾아보니 웹팩 개발서버가 새로 고침될 때 output.publicPath와 historyFallback을 동일한 경로로 맞추라고 되어있었다.

현재 webpack.config파일의 devServer의 historyApiFallback은 절대경로의 index.html으로 잘 되어있었지만,


```ts
devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
},
```
output의 publicPath는 절대경로로 되어있지 않았다. 그러다보니 상대경로의 main.js를 찾고 있었고 결과적으로 404가 뜨는 이유는 publicPath를 따로 주지 않아서 였다. 그래서 publicPath의 절대경로 / 를 줘서 해결했다.

```ts
  // 출력 설정. 빌드 결과물의 파일 이름과 저장 위치를 지정
  output: {
    //수정 후
    publicPath:'/',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: {
      keep: /\.git/,
    },
  },
```