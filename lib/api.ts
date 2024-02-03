import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

type PostItem = {
  [key: string]: string;
};

const postDirectory = join(process.cwd(), 'posts');

export function getPostSlug() {
  return fs.readdirSync(postDirectory);
}

export function getPostBySlug(slug: string, fields: string[]) {
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

export function getFilteredCategory(category: string) {
  return getAllPosts().filter((post) => post.category === category);
}
