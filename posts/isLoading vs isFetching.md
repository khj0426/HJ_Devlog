---
title: 'isLoading vs isFetching'
excerpt: '둘의 차이점이 무엇일까'
date: '2024-03-17'
author: '김효중'
category: 'react-query'
image: '/images/postImg/react-query.png'
---

![](/images/postImg/react-query.png)

리액트 쿼리는 리액트 애플리케이션에서 데이터 패칭을 관리하는 강력한 라이브러리입니다. 리액트 쿼리는 데이터 캐싱, stale한 데이터의 처리, 낙관적 업데이트 등 많은 기능을 쉽게 제공합니다.

2가지 가장 중요한 리액트쿼리의 프로퍼티는 isLoading,isFetching입니다. 이 프로퍼티는 쿼리의 상태를 나타냅니다.

밑의 예시는 이 프로퍼티를 사용하는 단편적인 예시입니다.

그럼 isLoading과 isFetching은 어떤 차이가 있을까요?

```ts
const { data, isLoading } = useQuery('posts', fetchPosts);

if (isLoading) {
  return <div>Loading...</div>;
}

const { data, isFetching } = useQuery('posts', fetchPosts);

<button disabled={isFetching}>Get Posts</button>;

```

### isLoading

isLoading 프로퍼티는 쿼리가 처음으로 패치될 때 참으로 바뀝니다. 이것은 자동, 수동으로 패치하는 모든 것에 적용됩니다.

아무 캐시된 데이터 없이, <mark>처음 실행된 쿼리</mark>일 때 로딩 여부에 따라 true,false가 나뉩니다.

isLoading 프로퍼티는 주로 쿼리가 처음으로 데이터를 가져올 때 참이 됩니다. 반면 isFetching은 데이터를 가져오는 모든 시점이든 참이 됩니다.

```ts
// 처음 데이터를 가져옵니다.
{
    data:undefined,
    isLoading:true,
    isFetching:true
}


// 다시 패칭이 시작될 떄
{
    data:[{
        image:'',
        name:
    }],
    isLoading:false,
    isFetching:true
}
```

만약 당신이 useQuery를 처음 실행한다면, 아직 캐싱된 데이터는 존재하지 않을 것입니다. 쿼리는 데이터 패칭을 수행한 적이 단 한번도 없고, 당신은 화면에 표시할 아무 저장된 데이터가 없습니다.

우리가 포토카드 앱을 만든다고 가정해봅시다.

```ts
import {useQuery} from '@tanstack/react-query'

function Album(props) {
    const {data,isLoading,status} = useQuery({
        queryKey:['album','lakes'],
        queryFn:() => fetchAlbum('lakes')
    })

    console.log({data,isLoading,status});
    //{
        data:undefined,
        isLoading:true,
        status:'loading'
    }
}
```
쿼리의 status는 loading이고 isLoading은 참입니다.

isLoading을 사용하는 좋은 사례는 데이터를 처음 가져올 때 페이지에 로딩 스피너를 보여주는 것입니다. 이렇게 하면 사용자들이 무언가 진행 중임을 알고, 필요한 정보를 로딩 중임을 인지할 수 있습니다.

또한 처음 데이터를 가져올 떄 특정 유저와의 상호작용요소들(버튼 등)의 사용을 막는 것입니다.

![](https://assets.codemzy.com/blog/react/react-query-loading.gif)

### isFetching 

isFetching은 쿼리가 패칭될 때마다 참이 됩니다. 이것은 데이터를 처음 가져올 때 뿐만 아니라 그 이후의 패칭에도 모두 적용됩니다.(초기 데이터 패칭과 refetch 모두 적용됩니다.)

이것은 isFetching은 쿼리에 대한 캐싱된 데이터(stale하지 않은)가 있더라도 isFetching은 참이 될 수 있습니다.

우리는 이미 "lakes"의 앨범을 가져와서 사진을 살펴봤고 좋아보입니다. 만약 앨범에 새 사진이 추가되거나 업데이트 될 필요가 있다면 어떨까요?

데이터는 시간이 지나면서 오래되거나(stale) , 데이터가 무효화 될경우 다시 가져와야 할 필요가 존재합니다.

다행히도 staleTime 옵션은 우리의 애플리케이션에게 얼마나 자주 서버를 확인하여 데이터를 업데이트 해야 하는지 선택할 수 있게 합니다.

그러나 우리는 이미 보여준 이미지가 있고, 전체 페이지의 로딩 화면을 다시 표시하는 대신, 새로운 사진들을 확인하는 동안 현재의 이미지를 보여주는 게 더 좋아보입니다.

![](https://assets.codemzy.com/blog/react/react-query-refetching.gif)

isFetching은 페이지 어딘가에서 새로운 데이터가 로드되는 동안 작은 스피너를 보여주기에 용이합니다. 사용자는 여전히 오래된 데이터를 보게 됩니다.

초기의 데이터 패칭이든 , refetch이든 상관없이 쿼리가 패칭하는 동안 버튼이나 다른 요소를 막고(disabled)싶을 떄도 마찬가지로 isFetching을 사용할 수 있습니다.

### 언제 isLoading과 isFetching을 쓸까요?

우리는 isLoading이 데이터를 보여줄 것이 없을 떄 사용하고, 이미 앨범을 보여주고 있는 상태에서 데이터를 가져올 때는 isFetching을 써서 앨범 컴포넌트를 바꿔봅시다.

```ts
import { useQuery } from '@tanstack/react-query'
import Loading from './Loading';
import Photos from '/Photos';
import Alert from '/Alert';

function Album({ id }) {
  const albumQuery = useQuery({ queryKey: ["album", id], queryFn: () => fetchAlbum(id) });

  if (albumQuery.data) {
    <div>
      { albumQuery.isFetching && <Loading type="spinner" /> }
      <h1>{albumQuery.data.title}</h1>
      <Photos data={albumQuery.data.photos} />
    </div>
  }
  
  if (albumQuery.isError) {
    return <Alert message={albumQuery.error.message} />
  }

  return <Loading message="Loading Photos" />;
};
```

위의 예시에서 , 우리는 실제 isLoading을 사용하지 않는 것을 볼 수 있습니다. 대신 데이터가 있거나 오류가 있는 경우 그 정보를 보여주는 것이 중요하고, 로딩은 대체 수단으로 사용하는 패턴을 사용하고 있습니다.

![](https://assets.codemzy.com/blog/react/react-query-fetching.gif)

정리해보면 isLoading과 isFetching을 다음의 상황에서 사용할 수 있습니다.

- isLoading은 서버에 데이터 요청을 처음 할 떄
- isFetching은 캐시된 데이터가 있을 때(서버에 요청을 다시 할 때)