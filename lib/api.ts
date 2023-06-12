import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const PostDirectory = join(process.cwd(), 'posts');

export function getPostSlugs() {
  return fs.readdirSync(PostDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx/, '');
  const fullPath = join(PostDirectory, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContent);

  type Item = {
    [key: string]: string;
  };
  const items: Item = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order

    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
