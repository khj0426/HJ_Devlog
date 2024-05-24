---
title: 'recoil로 URL에 State저장하기'
excerpt: 'URL에 recoil로 상태를 저장하고 관리하자!'
date: '2024-05-24'
author: '김효중'
category: 'React'
image: '/images/postImg/05_24.png'
---

모달에서 검색을 할 때, URL과 렌더링 된 화면의 State가 동일하게 만들어주고 싶었다.

이렇게 현재 검색하고 있는 URL과 화면의 State가 동기화되는 방식은 여러 사이트(?)에서 발견할 수 있었는데, 블로그 글 검색 모달에서도 동일하게 적용하고 싶었다.

즉 아래의 사진처럼 동작시키고 싶었다.

![](/images/postImg/05_24_2.png)

여러 방법이 있겠지만, 현재 recoil을 쓰고 있었고, recoil로 해당 기능을 구현해 보았다.

전반적인 흐름인 아래의 그림과 같다.

![](/images/postImg/05_24.png)

- 🌐 최초 State는 URL을 기반으로 한다.
- 🌐 State가 바뀔 때, AtomEffect를 통해 , queryString이 바뀔때마다, replaceState를 사용해 URL이 State를 따라 바뀐다.
- 🌐 queryString과 State를 업데이트 하는 useQueryString으로 컴포넌트에 상태와 업데이트 로직을 제공해준다.

해당 방법외에도 Recoil에서 Recoil/Sync 라이브러리를 사용할 수도 있다.

(URL을 읽으려면 클라이언트 컴포넌트 내에서 읽어야 한다! 서버 컴포넌트 일때는 동작하지 않는다!)

[공식문서 Recoil URL-Persistence](https://recoiljs.org/docs/recoil-sync/url-persistence/)


먼저 주소창 URL의 State를 관리하는 가장 작은 단위인 atom부터 만들어보자. Key와 Default값을 선언해주고, AtomEffect를 연결해 줄 것이다.

그리고 URL로부터 초기값을 가져올 것이다.

```ts
export const queryObjectAtom = atom({
  key: 'QUERY_STRING_STATE',
  default: initQueryObject(),
  effects: [QueryStringEffect('QUERY_STRING_STATE')],
});

```

다음으로 해당 atom을 읽기만 해주는 selector를 만들었다.

```ts
export const queryObjectSelector = selector({
  key: 'QUERY_STRING_SELECTOR',
  get: ({ get }) => {
    const queryObject = get(queryObjectAtom);
    const stringifyQueryObject = queryString.stringify(queryObject);
    return stringifyQueryObject;
  },
});
```

먼저 recoil의 상태가 바뀌면 자동으로 URL이 바뀌게 만들어주는 QueryStringEffect을 만들었다.

```ts
export const QueryStringEffect =
  (_key: string): AtomEffect<any> =>
  //atom의 상태가 바뀔떄마다 이 콜백이 실행
  ({ onSet }) => {
    if (typeof window !== 'undefined') {
      onSet((newValue) => {
        const location = window?.location;
        const newUrl = queryString.stringify(newValue);
        //쿼리 스트링 업데이트
        window.history.replaceState(
          null,
          '',
          `${location.pathname}${newUrl ? '?' : ''}${newUrl}`
        );
      });
    }
};
```

그리고 이어서 현재 URL로부터 초기값을 가져오는 initQueryObject를 만들고 atom의 초기값으로 넣어주었다.

```ts
export const initQueryObject = () => {
  //클라이언트 사이드 환경일때만
  if (typeof window !== 'undefined') {
    const search = window.location.search;
    const parsed = queryString.parse(search);
    return Array.isArray(parsed.keywords) ? parsed.keywords : [];
  }
};
```

window.location.search라는 함수는 URL에서 쿼리스트링을 받아오는 함수이다. 요 함수를 쓰면 쿼리스트링을 잘 꺼내올 수 있다.

이제 만든 기능들을 편하게 쓰도록 커스텀 훅 형태로 제공하자!

useQueryString이라는 훅을 만들고 다음과 같이 정의해주었다.

```ts
//useQueryString.ts

import { useRecoilState, useRecoilValue } from 'recoil';

import {
  queryObjectAtom,
  queryObjectSelector,
} from '@/app/Providers/Recoil/globalAtom';

export const useQueryString = () => {
  const [queryObject, setQueryObject] = useRecoilState(queryObjectAtom);
  const queryString = useRecoilValue(queryObjectSelector);

  return {
    queryObject,
    setQueryObject,
    queryString,
  };
};
```

이제 이 훅을 블로그 글을 검색하는 모달에서 다음과 같이 사용하였다.

```tsx
'use client';

import styled from 'styled-components';

import './index.css';

import { Modal } from '@/Component/Common/Modal';
import { Input, InputBox } from '@/Component/Input';
import PostList from '@/Component/Post/PostList';
import useSearchPostQuery from '@/hooks/queries/useSearchPostQuery';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';
import { useQueryString } from '@/hooks/useQueryString';

function PostSearchModal() {
  const { onChange, error } = useInput('', (e) => e.target.value.length <= 150);
  const { modal, closeModal } = useModal('POST_SEARCH_MODAL_STATE');
  const { setQueryObject, queryObject } = useQueryString();

  //현재 URL의 쿼리스트링에서 keyword의 값을 꺼내온다.
  const { data: posts } = useSearchPostQuery(queryObject['keyword']);

  return (
    <Modal.ModalContainer id={modal.id}>
      <Modal.ModalContent
        width={'350px'}
        height={'500px'}
        closeOutSideClick={closeModal}
        backgroundColor="rgb(38,41,43)"
      >
        <StyledPostSearchModal>
          <Modal.ModalCloseButton onClick={closeModal} />
          <InputBox color="rgb(38, 41, 43)">
            <Input
              autoFocus
              onChange={(e) => {
                onChange(e);
                setQueryObject({ keyword: e.target.value });
              }}
            />
          </InputBox>
          {error && (
            <p style={{ color: '#db4455' }}>최대 150자까지 입력 가능합니다!</p>
          )}
          <PostList posts={posts} />
        </StyledPostSearchModal>
      </Modal.ModalContent>
    </Modal.ModalContainer>
  );
}

export default PostSearchModal;
```

URL과 recoil을 이용해 쿼리스트링을 atom으로 관리하도록 만들어보았는데, 쿼리스트링은 사용할 수 있는 범위가 무궁무진한 것 같다. URL의 queryString을 하나의 상태로 볼 수 있을 것 같다.

추가로 공식문서에 있는 Recoil URL-Persistence도 recoil을 사용한다면 복잡한 URL을 쉽게 제어할 수 있을 것 같다.



