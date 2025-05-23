import { SelectDateOptionsProps } from "~/@types/BackOfficeProps";
import {
  getActiveUserCount,
  getActiveUserCountByDate,
  getPostDetailViewsCount,
  getPlatformUserCount,
  getUserSessionInfo,
} from "~/src/services/BigQuery";
import { getGuestBook } from "~/src/services/GuestBook";
import {
  getPosts,
  getCategoryPosts,
  getSearchQueryPostList,
} from "~/src/services/Post";

const postQueryKey = {
  all: ["allPosts"] as const,
  filteredCategoryPost: (category: string) =>
    [...postQueryKey.all, category] as const,
  searchInputPost: (input: string) => [...postQueryKey.all, input] as const,
};

const guestBookQueryKey = {
  all: ["guestBook"] as const,
};

const postQueryOptions = {
  all: () => ({
    suspense: true,
    queryKey: postQueryKey.all,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getPosts({ pageParams: pageParam }),
    getNextPageParam: (lastPage: { page: number; posts: string[] }) => {
      const nextPage = Math.floor(lastPage.page);
      if (lastPage.posts.length === 0) {
        return null;
      }
      return nextPage + 1;
    },
  }),
  filteredCategoryPost: (category: string) => ({
    queryKey: postQueryKey.filteredCategoryPost(category),
    queryFn: () => getCategoryPosts({ category }),
  }),
  searchInputPost: (keyword: string) => ({
    queryKey: postQueryKey.searchInputPost(keyword),
    queryFn: () => getSearchQueryPostList(keyword),
    enabled: !!keyword,
    staleTime: 60 * 10 * 1000,
    cacheTime: 60 * 10 * 1000,
  }),
} as const;

const guestBookQueryOptions = {
  all: () => ({
    queryFn: getGuestBook,
    queryKey: guestBookQueryKey.all,
  }),
};

const gaQueryKey = {
  user: ["user"] as const,
  userFilteredByPlatFormCategory: () => [
    ...gaQueryKey.user,
    "platformCategory",
  ],
  visitedUserByDate: (date: SelectDateOptionsProps) => [
    ...gaQueryKey.user,
    date,
  ],
  visitedViewsByDetailPost: (slug: string) => [...gaQueryKey.user, slug],
  visitedUserSession: () => [...gaQueryKey.user, "session"],
};

const gaQueryOptions = {
  user: () => ({
    queryFn: getActiveUserCount,
    queryKey: gaQueryKey.user,
  }),
  visitedUserByDate: (date: SelectDateOptionsProps) => ({
    queryFn: () => getActiveUserCountByDate({ start: date }),
    queryKey: gaQueryKey.visitedUserByDate(date),
    suspense: true,
  }),
  visitedViewsByDetailPost: (slug: string) => ({
    queryFn: () =>
      getPostDetailViewsCount({
        slug,
      }),
    queryKey: gaQueryKey.visitedViewsByDetailPost(slug),
  }),
  userFilteredByPlatFormCategory: () => ({
    queryKey: gaQueryKey.userFilteredByPlatFormCategory(),
    queryFn: getPlatformUserCount,
  }),
  visitedUserSession: () => ({
    queryKey: gaQueryKey.visitedUserSession(),
    queryFn: getUserSessionInfo,
  }),
};
export {
  postQueryKey,
  guestBookQueryKey,
  postQueryOptions,
  guestBookQueryOptions,
  gaQueryKey,
  gaQueryOptions,
};
