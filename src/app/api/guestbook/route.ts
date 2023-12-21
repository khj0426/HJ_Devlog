import { ref, get } from 'firebase/database';
import { NextResponse } from 'next/server';

import { DB } from '../../firebase';

export async function GET() {
  const guestbookRef = ref(DB, '/guestbook');
  const snapShot = await get(guestbookRef);

  if (snapShot.exists()) {
    return NextResponse.json(
      {
        guestbook: await snapShot.val().comments,
      },
      {
        status: 200,
      }
    );
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
