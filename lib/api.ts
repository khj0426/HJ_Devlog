import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const PostDirectory = join(process.cwd(), 'posts');
const ImageDirectory = join(process.cwd(), 'public/images');

export function getPostSlugs() {
  return fs.readdirSync(PostDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md/, '');
  const fullPath = join(PostDirectory, `${realSlug}.md`);
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
    if (field === 'image') {
      const imagePath = join(ImageDirectory, data[field]);
      items[field] = imagePath;
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
