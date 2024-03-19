---
title: 'recoil을 이용해 모달을 관리해보자'
excerpt: 'recoil을 배워보자'
date: '2024-01-25'
author: '김효중'
category: 'React'
image: '/images/postImg/react.png'
---

먼저 recoil에서 쓸 수 있는 atom,selector,atomFamily,selectorFamily에 대해 알아보겠습니다.

Atom은 Recoil의 상태를 표현하는 상태 단위입니다. Atom이 업데이트 되면 해당 Atom을 구독하고 있는 모든 컴포넌트가 업데이트 된 Atom값을 참조해 다시 렌더링이 됩니다.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE5pEFgAk0f8s9_yy-TA94w7Zeie4bvB3N9Q&usqp=CAU)

atom함수의 옵션들로는 다음이 존재합니다.

- key : atom을 구분하는 자신만의 key
- value : atom이 갖고 있는 값
- effects_Unstable : atom을 의한 atom Effect 의존성 배열
- dangerouslyAllowMutablity : atom이 변경된 경우 등록된 컴포넌트에 알리지 않고 리렌더링이 되는 경우를 방지하기 위한 옵션

### atomFamily API

상태관리를 할 때 여러 객체를 배열의 형태로 관리할 수 있습니다. 

```ts
const list = atom<list[]>({
    key:'list',
    default:[]
})
```

그러나 이렇게 하면 한 개의 list가 추가되거나 한 개의 list가 제거되기만 해도 결국 list Atom에 매번 새 배열이 할당되고, 비효율적인 작업이 될 수 있습니다. 그리고 이러한 방식은 Recoil의 철학에 위배될 수 있습니다.

<b>작은 atom의 상태들을 모아 바텀-업 스타일로 상태를 관리하는</b> 리코일에서는 이와 같은 배열의 상태 관리가 어쩌면 잘 맞지 않습니다.

![](https://junglast.com/static/images/recoil-atomfamily-atom/atom.png)

그럼 어떤 방법을 사용할 수 있을까요 ? recoil에서 제공하는 <b>atomFamily API</b>에 대해 먼저 알아보겠습니다.

atomFamily는 동일한 atom을 생성해주는 api입니다. atomFamily를 통해 정해진 형식에 맞는 atom을 여러 개 만들 수 있습니다. 

여러 모달을 관리하고자 할때, 다음과 같이 모달의 id,title,isOpen필드를 갖게 만드는 atom을 제공하는 atomFamily를 먼저 만듭니다.

atomFamily는 일반적인 Atom과 동일하게, 파라미터 객체의 default 영역에 이 atomFamily로 만들어질 Atom의 초기값을 지정할 수 있습니다. 다만 atom API를 이용한 Atom 생성과의 차이점은 default 값이 특정한 파라미터를 받는 함수가 될 수 있다는 점입니다.

```ts
export const modalState = atomFamily({
  key: 'MODAL_STATE',
  default: (id: string) => ({
    id,
    title: '',
    isOpen: false,
  }),
});
```
이제 atomFamily를 이용해 atom을 계속 생성할 수 있게 됩니다. (아래의 코드 처럼!)

```ts
const [myModal, setMyModal] = useRecoilState(modalsAtomFamily("myModal"))
const [yourModal, setYourModal] = useRecoilState(modalsAtomFamily("yourModal"))
```

### selectorFamily

그러나 이렇게 여러 모달에 대한 atom을 atomFamily api를 통해 만들고 관리하는 것은 몇 가지 문제점이 존재합니다. 만약 모달을 닫고 여는 작업을 하려면 어떻게 해야 할까요? 지금의 atomFamily만으로는 수행할 수 없게 됩니다.

atomFamily와 함께 어느 모달인지 알 수 있는 key를 별도로 관리하고자 합니다.

```ts
export const modalIdAtom = atom<string[]>({
  key: 'MODAL_ID_STATE',
  default: [],
});
```

결국 모달을 생성 할 때에는 atomFamily로 모달을 만들고, 생성한 atom의 key를 별도의 배열에 넣는 작업 2가지가 필요합니다.

```ts
//atomFamily로 모달을 만들고 
export const modalState = atomFamily({
  key: 'MODAL_STATE',
  default: (id: string) => ({
    id,
    title: '',
    isOpen: false,
  }),
});

const modal = modalState('modal')

//생성한 atom의 key를 집어넣어야 합니다.
const setModalIdAtom = useRecoilState(modalIdAtom)

setModalIdAtom((prev) => [...prev,modalIdAtom])
```

Recoil의 selector는 특정한 atom을 바탕으로 파생된 상태를 만듭니다. recoil의 selector는 set값을 이용해 쓰기 가능한 상태를 정의할 수 있습니다.

이 때 selector와 selectorFamily는 atom과 atomFamily의 관계와 동일합니다.

```ts
export const modalSelectorFamily = selectorFamily({
  key: 'MODAL_STATE_FAMILY',
  get:
    (modalId: string) =>
    ({ get }) =>
      get(modalState(modalId)),

  set:
    (modalId: string) =>
    ({ set }, newModalInfo) => {
      set(modalState(modalId), newModalInfo);
      if ('id' in newModalInfo) {
        set(modalIdAtom, (prev) => Array.from([...prev, newModalInfo.id]));
      }
    },
});
```

### get과 set

useRecoilState나 useRecoilValue를 통해 modalSelectorFamily('특정 모달의 ID')의 값을 가져옵니다. 만약 특정 모달의 ID의 키를 가진 모달의 상태를 조회합니다.

modalState는 모달의 상태를 관리하는 atomFamily입니다. 

```ts
get(modalState('특정 모달의 ID'))
```
다음과 같이 호출하면 modalId에 해당하는 모달의 상태를 반환하게 됩니다. 따라서 특정 모달의 ID라는 키를 가진 atomFamily를 통해 만들어진 atom이 있다면 그 값을 읽어오게 됩니다.

그렇다면 만약 동일한 키를 가진 atom을 매번 만들면 새로 atom이 새로 만들어질까요?

```ts
const firstModal = useRecoilValue(modalState('same-key'))

const secondModal = useRecoilValue(modalState('same-key'))
```
먼저 답은 <b>새로 만들어지지 않는다</b>입니다. 이 둘은 같은 atom을 가리키게 됩니다.

set에서는 modalId와 newModalInfo를 받아서 해당 modalId의 모달 상태를 갱신하게 됩니다.

그럼 이제 커스텀 훅을 통해 selectorFamily를 사용하겠습니다.

```ts
import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

//selectorFamily
import { modalSelectorFamily } from '@/app/Providers/Recoil/globalAtom';

const useModal = (modalId: string) => {
  const [modal, setModal] = useRecoilState(modalSelectorFamily(modalId));

  const openModal = useCallback(() => {
    setModal(({ id, title }) => {
      return {
        isOpen: true,
        id,
        title,
      };
    });
  }, [setModal]);

  const closeModal = useCallback(() => {
    setModal(({ id, title }) => {
      return {
        isOpen: false,
        id,
        title,
      };
    });
  }, [setModal]);

  const toggleModal = useCallback(() => {
    if (modal.isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [closeModal, openModal, modal.isOpen]);

  return {
    modal,
    setModal,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
```




