import generateRSS from '@/utils/generateRSS';

export async function GET() {
  const feedXML = await generateRSS();
  if (feedXML) {
    return new Response(feedXML, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } else {
    return new Response('RSS을 생성할 수 없습니다', {
      status: 502,
    });
  }
}
