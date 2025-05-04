"use server";

import { get } from "@hj-devlog/shared/src/api/blogaxiosClient";

import { Item } from "~/@types/postItem";

type Post = {
  title: string;
  date: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
};

type PostsResponse = {
  posts: Post[];
  page: number;
};
export const getSearchQueryPostList = async (searchQuery: string) => {
  return (await get<Item[]>(`/api/slugs/${searchQuery}`)).data;
};

export const getPosts = async ({ pageParams }: { pageParams: number }) => {
  const start = pageParams * 6;
  const end = start + 6;
  return (await get<PostsResponse>(`/api/posts?start=${start}&end=${end}`))
    .data;
};

export const getCategoryPosts = async ({ category }: { category: string }) => {
  return (await get<PostsResponse>(`/api/posts?category=${category}`)).data;
};
