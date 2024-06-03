import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { RANDOM_POST_RANGE } from '@/constants/POST';

type PostItem = {
  [key: string]: string;
};

const postDirectory = join(process.cwd(), 'posts');

export function getPostSlug() {
  try {
    return fs.readdirSync(postDirectory);
  } catch (e) {
    throw e;
  }
}

export function getPostBySlug(slug: string, fields: string[]) {
  try {
    const decodedSlug = decodeURIComponent(slug.replace(/\.md/, ''));
    const postPath = join(postDirectory, `${decodedSlug}.md`);
    const fileContent = fs.readFileSync(postPath, 'utf-8');
    const { data, content } = matter(fileContent);

    const postItems: PostItem = {};

    fields.forEach((field) => {
      if (field === 'slug') {
        postItems[field] = decodedSlug;
      }
      if (field === 'content') {
        postItems[field] = content;
      }
      if (typeof data[field] !== 'undefined') {
        postItems[field] = data[field];
      }
    });

    return postItems;
  } catch (e) {
    return {};
  }
}

export function getAllPosts() {
  const slugs = getPostSlug();

  return slugs
    .map((slug) =>
      getPostBySlug(slug, [
        'title',
        'data',
        'slug',
        'category',
        'excerpt',
        'date',
        'image',
      ])
    )
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function getInitPost() {
  return getAllPosts().slice(0, 6);
}

export function getAllCategories() {
  const allPost = getAllPosts();
  const allCategory = new Map<string, number>();

  allPost.map((post) => {
    const getCategory = allCategory.get(post.category);
    if (getCategory) {
      allCategory.set(post.category, getCategory + 1);
      return;
    }

    allCategory.set(post.category, 1);
  });

  return Array.from(allCategory).map(([category, categoryCount]) => {
    return {
      category: category,
      categoryCount: categoryCount + '',
    };
  });
}

export function getRandomPosts(title: string) {
  const getPosts = getAllPosts().filter((post) => post.title !== title);
  return getPosts
    .slice(Math.floor(Math.random() * (getPosts.length - 1)), getPosts.length)
    .slice(RANDOM_POST_RANGE.start, RANDOM_POST_RANGE.end);
}
