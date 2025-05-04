//TODO - useInfinityQueryOptions 관리 시 타입 오류 해결하기.

import { useInfiniteQuery } from "@tanstack/react-query";

import { getPosts } from "../../services/Post";

import { postQueryKey } from "./queryKey";

export default function usePostQuery() {
  return useInfiniteQuery({
    queryKey: postQueryKey.all,
    suspense: true,
    queryFn: ({ pageParam }) => getPosts({ pageParams: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = Math.floor(lastPage.page);
      if (lastPage.posts.length === 0) {
        return null;
      }
      return nextPage + 1;
    },
  });
}
