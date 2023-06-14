---
title: '# 자바스크립트의 여러 코드 트릭'
excerpt: '자바스크립트의 여러 유용한 꼼수들!'
date: '2023-06-12'
author: '김효중'
category: 'Js'
---

### 구조 분해 할당을 이용한 변수 SWAP

ES6의 구조 분해 할당을 사용하면 두 변수를 쉽게 swap 할 수 있습니다.

```js
let a = 5,
  b = 10;
[a, b] = [b, a];
console.log(a, b); //10 5
```

### 범위 루프를 함수형 프로그래밍으로 사용하고 싶으면 배열을 만들어서 사용 가능합니다.

```js
const sum = Array.from(new Array(5), (_, k) => k + 5).reduce((acc, cur) => {
  acc + cur, 0;
});

// 먼저 Array.from(new Array(5),(_,k) => k+5)는 길이가 5인 새로운 배열을 만드는 코드입니다.

// 배열의 각 요소는 인덱스 k에 5를 더한 값으로 초기화됩니다.

//결과적으로 [5,6,7,8,9]의 배열이 만들어집니다.

//reduce((acc,cur) => {acc,cur ,0}) 은 reduce함수를 써서 배열의 모든 요소를 더합니다. 초기값은 0으로 설정합니다.
```

### 배열 내 중복되는 요소를 제거하려면 Set을 쓸 수 있습니다.

```
const names = ['LEE','Kim','Park','Lee','Kim'];
const uniqueNames = Array.from(new Set(names));
const uniqueNameswithSpread = [...new Set(names)];
```

### 스프레드 연산자를 활용하면 객체간 병합을 할 수 있습니다.

```
const person = {
    name:'Kim hyo jung',
    name:'Kim',
    givenName:'hyo jung'
};


const company = {
    name:'None',
    address:'Paju'
};


const kimhyojung = {...person,...company};

```

### &&와 ||을 조건문 외에도 활용합니다.

```
//Name이 0,undefined,빈 문자열,null인 경우 Guest로 할당됩니다.

const name = Name || 'Guest'

//flag가 true로 평가될떄만 TrueCOmponent를 반환합니다.
flag && <TrueComponent />

//객체간 병합에도 활용할 수 있습니다.
const makeCompany = (address) => {
    return {
        name:'KIMHJ',
        ...address && {address:'Paju'}
    }
}

```

### 구조 분해 할당 사용하기

객체에서 필요한 것만 꺼내 쓰기 적합합니다. 배열에도 적용할 수 있습니다.

```
const person = {
    name:'KIMHJ',
    address:'Paju'
};

const {name,address} = person;

// 배열 선언
const arr = [1, 2, 3, 4, 5];

// 배열의 구조 분해 할당
const [a, b, c, d, e] = arr;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
console.log(d); // 4
console.log(e); // 5
```

### 객체 생성 시 프로퍼티 키를 생략 가능합니다.

객체를 생성시 프로퍼티 키를 변수 이름으로 생략 할 수 있습니다.

```
const name = 'KIM H J';
const company = 'none';
const person = {
    name,company
}
```

### 비구조화 할당 사용하기

함수에 객체를 넘길 떄 필요한 것만 꺼내 쓸 수 있습니다.

```
const makeCompany = ({name,address}) => {
    return {
        name,address
    }
}

const company = makeCompany({name:'IC",address:'SEOUL'});
```

### 동적 속성 이름

객체의 키를 동적으로 생성 할 수 있습니다.

```
const key = 'name';
const emailKey = 'email';
const person = {
    [key]:'KIMHJ',
    [emailKey]:'706shin1728@naver.com'
}

```

### !!연산자를 사용해 Boolean값으로 바꾸기

!! 연산자를 사용해 0,빈문자열,undefined,NAN을 false로, 그 외에는 true로 바꿀 수
있습니다.

```
function check(variable) {
  if (!!variable) {
    console.log(variable);
  } else {
    console.log('잘못된 값');
  }
}
check(null); // 잘못된 값
check(3.14); // 3.14
check(undefined); // 잘못된 값
check(0); // 잘못된 값
check('Good'); // Good
check(''); // 잘못된 값
check(NaN); // 잘못된 값
check(5); // 5
```
