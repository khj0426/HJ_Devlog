import { NextRequest, NextResponse } from 'next/server';

import analyticsDataClient from '@/utils/bigQueryClient';
import { formatDateToString } from '@/utils/formatDateToString';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');
  const startDate = req.nextUrl.searchParams.get('startDate');
  const endDate = req.nextUrl.searchParams.get('endDate');

  const now = new Date();

  const queryStringToDate = new Map([
    ['오늘', formatDateToString(new Date())],
    ['어제', formatDateToString(new Date(now.getTime() - 24 * 60 * 60 * 1000))],
    [
      '7일',
      formatDateToString(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
    ],
    [
      '30일',
      formatDateToString(new Date(new Date().setMonth(now.getMonth() - 1))),
    ],
    [
      '90일',
      formatDateToString(new Date(new Date().setMonth(now.getMonth() - 3))),
    ],
    [
      '1년',
      formatDateToString(
        new Date(new Date().setFullYear(now.getFullYear() - 1))
      ),
    ],
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
      // 시작 일자가 있으면 해당 시작일자로 고정, 그렇지 않으면 전체 기간
      dateRanges: [
        {
          startDate:
            startDate || (date && queryStringToDate.get(date)) || '2020-03-11',
          endDate: endDate ?? formatDateToString(new Date()),
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
        datalist: reportResults[0]?.activeUsers?.metricValues || [],
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
