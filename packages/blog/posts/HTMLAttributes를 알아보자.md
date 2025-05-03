---
title: 'HTMLAttributes를 알아보자'
excerpt: '확장가능한 컴포넌트, 어떻게 만들 수 있을까?'
date: '2023-08-24'
author: '김효중'
category: 'React'
image: '/images/postImg/DomAttribute.png'
---

강의를 듣고 실습을 하면서 props의 타입이 뭘까??라는 순간이 있었습니다.

```js
import styled from 'styled-components';

const Line = styled.hr`
  border: none;
  background-color: #aaa;
  &.vertical {
    position: relative;
    top: -1;
    display: inline-block;
    width: 1px;
    height: 13px;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1px;
  }
`;

const Divider = ({
  type,
  size = 8,
  props,
}: {
  type?: 'horizontal' | 'vertical';
  size?: number;
  props?: Object;
}) => {
  const dividerStyle = {
    margin: type === 'vertical' ? `0 ${size}px` : `${size}px 0`,
  };
  return <Line className={type} {...props} style={dividerStyle} />;
};

export default Divider;
```
이 코드에서 정확한 props의 타입이 뭔지 몰라서,단순히 타입스크립트 오류를 벗어나기 위해서, Object라는 타입으로 props를 정의했지만,, 태그에 {...props}를 전달하는 패턴을 타입스크립트에서는 어떻게 처리하지?? 라는 궁금증이 있었습니다.

보통 자주 쓰이는 컴포넌트를 만들기 위해 HTML요소들을 만들고 (버튼이나 인풋 등등) , props로 여러 인자를 넘깁니다.

이렇게 <mark>DOM Element</mark>를 Wrapping한 컴포넌트의 props의 경우 <mark>HTMLAttributes</mark>타입과 무슨무슨~~~Element를 사용할 수 있습니다.


# HTMLAttributes<T>

HTMLAttributes<T>는 제네릭을 받고 공통적인 HTML요소들의 속성이 정의된 것을 볼 수 있습니다.

![](https://velog.velcdn.com/images/centraldogma99/post/929445d8-785c-4562-8fea-f032c05147fc/image.png)

사진을 보면 기본적인 HTMl 속성들 뿐만 아니라 AriaAttributes, DomAttributes<T>를 상속받고 있습니다. 그럼 AriaAttributes의 타입과 DomAttributes<T>는 각각 무슨 타입인지도 궁금해졌습니다.

# AriaAttributes

AriaAttributes타입은 접근성을 위한 Aria속성들을 타입으로 정의한 것을 볼 수 있었습니다.

![AriaAttribute](/images/postImg/Aria.webp)

# DomAttributes<T>

DomAttributes<T>는 제네릭에 대한 여러 이벤트 핸들러가 정의되어 있는 것을 볼 수 있었습니다.

![돔 Attribute](/images/postImg/DomAttribute.png)

따라서 HTMLAttribute<T>타입은 다음의 조합들로 만들어지는 것을 볼 수 있었습니다.

- Element들이 공통적으로 갖는 속성들
- 접근성을 위한 속성들
- 다양한 이벤트 핸들러들

# ~~무슨무슨Element


Button태그의 타입을 원한다면 HTMLButtonElement를,input태그의 타입을 원하면 HTMlInputElement를 참조할 수 있습니다.

주석에도 HTMLButtonElement가 모든 HTML요소의 기본적인 속성뿐만 아니라 button을 조작하기 위해 추가적으로 사용가능한 속성들을 정의하는 것을 볼 수 있습니다.

![버튼Element](/images/postImg/HTMLButtonELement.webp)

예를들어, button이란 기본적인 태그를 Wrapping한 컴포넌트를 만들고자 한다면 다음과 같이 타입을 정의할 수 있습니다.

```js
type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export default function CustomButton(props:ButtonProps) {
  return <button {...props} />
}
```

이렇게 props를 정의해줄 수 있습니다.그럼 만약 버튼 태그에 없는 속성을 props로 전달해주면 어떻게 될까요?

예를 들어 button을 둥글게 만들 수 있게, circle? 이란 prop을 추가로 넘기고 싶습니다.

```js
type CustomProps = {
  circle?: boolean;
};

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & CustomProps;

export default function CustomButton(props: ButtonProps) {
  return (
    <button
      {...props}
      style={props.circle ? { borderRadius: '50%' } : undefined}
    />
  );
}
```
# !!그러나

그러나, 이렇게 HtmlAttributes<HTMLButtonElement>를 사용하면 문제가 발생할 수 있습니다.

```js
type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export default function CustomButton(props:ButtonProps) {
  return <button {...props} disabled= {props.disabled} />
}
```
disabled이라는 버튼에 존재하는 속성을 쓰려고 하면 에러를 볼 수 있습니다.

```js
'ButtonProps' 형식에 'disabled' 속성이 없습니다.ts(2339)
```

앞서 HTMlAttributes<T>는 제네릭을 받지만, 특정 제네릭을 사용하고 있지는 않습니다. HTMLAttributes는 제네릭이 아닌 공통적인 HTML요소의 속성을, AriaAttributes는 접근성과 관련된 속성들을 , DOMAttributes<T>는 제네릭을 사용하지만, 이벤트 관련 타입만 정의되어 있습니다.

따라서 당연하게도 버튼요소에만 들어가는 disabled속성은 위의 ButtonProps에서는 찾을 수 없습니다.

# 그럼 어떻게...?

엘리먼트를 확장하는 용도로 ComponentProps<T>라는 타입이 제공됩니다. 또한 ComponentPropsWithoutRef, ComponentWithRef의 타입도 존재합니다.

- ComponentProps
- ComponentPropsWithoutRef
- ComponentPropsWithRef

의 타입을 사용 가능합니다. 먼저 ComponentProps는 컴포넌트의 타입을 제네릭으로 받고, 해당 컴포넌트의 속성을 타입으로서 갖게 됩니다. 

사용 시 ComponentProps<HTMLInputElement> 가 아니라, ComponentProps<’input’> 과 같이 사용해야 합니다.

```js
import { ComponentProps } from "react";
type ButtonProps = ComponentProps<"button">;

export default function CustomButton(props: ButtonProps) {
  return <button {...props} disabled={props.disabled} />;
}
```
ButtonProps는 이제 button 요소의 모든 속성을 포함하고, 이제 정상적으로 props에 타입 오류가 걸리지 않는 모습을 볼 수 있습니다.


마찬가지로 자체적인 버튼 요소 속성뿐만 아니라 추가적인 props로 넘길 수 있습니다.

```js
import { ComponentProps } from "react";
type ButtonProps = ComponentProps<"button">;
type MyProps = ButtonProps & {
  customProps:string
}

export default function CustomButton(props: ButtonProps) {
  return <button {...props} disabled={props.disabled} />;
}
```

이 ComponentProps는 컴포넌트의 Props를 꺼낼때도 유용하게 쓸 수 있습니다.

```js
import type { ComponentProps } from "react";

const SubmitButton = (props: { 
  onClick: () => void,
  onChange:() => void,
  onSubmit:() => void }) 
  => {
    return 
    <button onClick={props.onClick}>
      Submit
    </button>;
  };

  type SubmitButtonProps = ComponentProps<
    typeof SubmitButton
  >;
```
SubmitButtonProps타입은 SubmitButton 컴포넌트에서 사용되는 onClick을 포함하여 SubmitButton 컴포넌트의 모든 속성이 포함됩니다.

![componentprops](/images/postImg/componentprops.webp)


























