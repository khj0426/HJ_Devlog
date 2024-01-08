import { getAllPosts } from '../../../../../lib/api';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const allfilteredPost = getAllPosts().filter((post) =>
    post?.title
      ?.trim()
      ?.toLowerCase()
      ?.includes(params.id?.trim()?.toLowerCase())
  );
  return new Response(JSON.stringify(allfilteredPost), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
