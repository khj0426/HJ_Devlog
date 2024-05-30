import { NextRequest, NextResponse } from 'next/server';

import analyticsDataClient from '@/utils/bigQueryClient';
import { formatDateToString } from '@/utils/formatDateToString';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const startDate = req.nextUrl.searchParams.get('date');

  const now = new Date();

  const queryStringToDate = new Map([
    ['오늘', formatDateToString(now)],
    ['어제', formatDateToString(new Date(now.setDate(now.getDate() - 1)))],
    ['7일', formatDateToString(new Date(now.setDate(now.getDate() - 7)))],
    ['30일', formatDateToString(new Date(now.setMonth(now.getMonth() - 1)))],
    ['90일', formatDateToString(new Date(now.setMonth(now.getMonth() - 3)))],
    ['1년', formatDateToString(new Date(now.setMonth(now.getMonth() - 12)))],
  ]);

  const report = async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/401292897`,
      dimensions: [
        {
          name: 'country',
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
          startDate: startDate
            ? queryStringToDate.get(startDate)
            : '2020-03-11',
          //현재 시간으로 설정
          endDate: formatDateToString(new Date()),
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    const results =
      response?.rows?.map((row) => ({
        activeUsers: row,
      })) || [];

    return results;
  };

  const reportResults = await report();

  if (reportResults) {
    return NextResponse.json(
      {
        data: 'Report finished',
        datalist: reportResults[0].activeUsers.metricValues,
      },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json(
    {
      data: 'Report failed',
    },
    {
      status: 502,
    }
  );
}
