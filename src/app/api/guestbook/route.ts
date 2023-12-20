import { ref, child, get } from 'firebase/database';

import { DB } from '../../firebase';

export async function GET() {
  const dbRef = ref(DB);
  get(child(dbRef, '/'))
    .then((snapShot) => {
      if (snapShot.exists()) {
        return new Response(
          JSON.stringify({
            guestBooks: snapShot.val(),
          }),
          {
            status: 200,
          }
        );
      }
    })
    .catch((e) => {
      return new Response(JSON.stringify(e), {
        status: 502,
      });
    });

  return new Response(
    JSON.stringify({
      error: 'firebase 설정 에러',
    }),
    {
      status: 404,
    }
  );
}
