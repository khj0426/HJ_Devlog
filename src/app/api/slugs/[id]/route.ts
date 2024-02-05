import { getAllPosts } from '~/lib/api';

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

  if (allfilteredPost) {
    return new Response(JSON.stringify(allfilteredPost), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(
    JSON.stringify({
      error: 'firebase 설정 에러',
    }),
    {
      status: 502,
    }
  );
}
