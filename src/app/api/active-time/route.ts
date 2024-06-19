import { NextRequest, NextResponse } from 'next/server';

import analyticsDataClient from '@/utils/bigQueryClient';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const getStartDate = req.nextUrl.searchParams.get('startDate');
  const getEndDate = req.nextUrl.searchParams.get('endDate');
  const getQueryStringDate = req.nextUrl.searchParams.get('page');

  const report = async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/401292897`,
      dimensions: [
        {
          name: 'date',
        },
      ],
      orderBys: [
        {
          dimension: {
            dimensionName: 'date',
          },
          desc: false,
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'country',
          stringFilter: {
            value: 'South Korea',
          },
        },
      },
      //시작 일자가 있으면 해당 시작일자로 고정 그렇지 않으면 전체 기간
      dateRanges: [
        {
          startDate:
            `${getStartDate}` ?? `${getQueryStringDate}daysAgo` ?? 'today',
          //현재 시간으로 설정
          endDate: `${getEndDate}` || 'today',
        },
      ],
      metrics: [
        {
          name: 'averageSessionDuration',
        },
      ],
    });
    return response;
  };

  try {
    const res = await report();
    return NextResponse.json(res, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(e, {
      status: 502,
    });
  }
}
