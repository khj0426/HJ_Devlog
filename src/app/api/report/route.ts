import { NextRequest, NextResponse } from 'next/server';

import { get } from '@/utils/axiosClient';
import { formatDateToString } from '@/utils/formatDateToString';

export async function POST(req: NextRequest) {
  const { type, startDate, endDate } = await req.json();
  console.log(startDate, endDate);
  switch (type) {
    case '총 사용자 수':
      return (
        await get(
          `/api/active-users?startDate=${formatDateToString(
            new Date(startDate)
          )}&endDate=${formatDateToString(new Date(endDate))}`
        )
      ).data;
      return {};
    case '참여 시간':
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
