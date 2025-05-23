import RSS from "rss";

import { getAllPosts, getPostBySlug } from "~/lib/api";

import getCurrentBasePath from "./getCurrentBasePath";

const generateRSS = async () => {
  try {
    const posts = await getAllPosts();
    const date = new Date();

    const feed = new RSS({
      title: "HJ`s Blog",
      description: "개발 관련 여러 지식을 기록하고, 정리하는 공간입니다",
      copyright: `All rights reserved ${date.getFullYear()}, HJ`,
      feed_url: `${getCurrentBasePath()}/rss.xml`,
      site_url: getCurrentBasePath(),
      language: "ko",
      pubDate: new Date(),
    });

    for (const post of posts) {
      const rssPost = getPostBySlug(post.slug, ["content"]);
      const url = `${getCurrentBasePath()}/blog/${decodeURIComponent(
        post.title
      )}`;
      feed.item({
        title: post.title,
        description: post.description,
        url,
        date: new Date(post.date.replace("/", "-")),
        guid: url,
        author: "hj",
        custom_elements: [{ "content:encoded": rssPost.content }], // rssPost.content 추가
      });
    }

    return feed.xml();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default generateRSS;
