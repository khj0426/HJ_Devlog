import { NextRequest, NextResponse } from 'next/server';

import analyticsDataClient from '@/utils/bigQueryClient';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest) {
  const report = async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/401292897`,
      dimensions: [
        {
          name: 'city',
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
      dateRanges: [
        {
          startDate: `365daysAgo`,
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'screenPageViewsPerSession',
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
