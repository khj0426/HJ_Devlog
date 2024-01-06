import { NextRequest } from 'next/server';

import { getAllPosts } from '../../../../lib/api';

export async function GET(req: NextRequest) {
  const sourceURL = new URL(req.url);

  const allPosts = getAllPosts();

  const startPostNumber = Number(sourceURL.searchParams.get('start')) || 0;
  const endPostNumber =
    Number(sourceURL.searchParams.get('end')) || startPostNumber + 5;

  return new Response(
    JSON.stringify({
      posts: allPosts.slice(startPostNumber, endPostNumber),
      page: Math.floor(startPostNumber / 5),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
