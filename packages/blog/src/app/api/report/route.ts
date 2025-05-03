import { NextRequest, NextResponse } from 'next/server';

import { get } from '@/utils/axiosClient';
import { formatDateToString } from '@/utils/formatDateToString';

export async function POST(req: NextRequest) {
  const { type, startDate, endDate } = await req.json();

  switch (type) {
    case '총 사용자 수':
      try {
        const response = await get('/api/all-users', {
          params: {
            startDate: formatDateToString(new Date(startDate)),
            endDate: formatDateToString(new Date(endDate)),
          },
        });
        const responseData = await response.data;
        return NextResponse.json(responseData, {
          status: 200,
        });
      } catch (e) {
        console.error(e);
        return NextResponse.json(JSON.stringify(e), {
          status: 500,
          statusText: JSON.stringify(e),
        });
      }

    case '참여 시간':
      try {
        const response = await get('/api/active-time', {
          params: {
            startDate: formatDateToString(new Date(startDate)),
            endDate: formatDateToString(new Date(endDate)),
          },
        });
        const responseData = await response.data;
        return NextResponse.json(responseData, {
          status: 200,
        });
      } catch (e) {
        return NextResponse.json(JSON.stringify(e), {
          status: 500,
          statusText: JSON.stringify(e),
        });
      }
      return {};
    case '도시별 한 페이지 당 방문 세션 수':
      return {};
    case '방문자의 기기 유형(모바일,PC)':
      return {};
  }

  return NextResponse.json(
    { type },
    {
      status: 200,
    }
  );
}
