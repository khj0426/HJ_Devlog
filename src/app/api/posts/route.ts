import { NextRequest } from 'next/server';
import { getAllPosts } from '../../../../lib/api';

export async function GET(req: NextRequest) {
  const sourceURL = new URL(req.url);

  const allPosts = getAllPosts([
    'title',
    'data',
    'slug',
    'category',
    'excerpt',
    'date',
    'image',
  ]);

  const lengthPostNUmber = allPosts.length;
  const startPostNumber = Number(sourceURL.searchParams.get('start')) || 0;
  const endPostNumber =
    Number(sourceURL.searchParams.get('end')) || lengthPostNUmber;

  return new Response(
    JSON.stringify(allPosts.slice(startPostNumber, endPostNumber)),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
