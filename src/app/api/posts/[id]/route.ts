/**
 *
 * 특정 블로그 글의 조회수 조회 API
 */

import { NextRequest, NextResponse } from 'next/server';

import { PAGE_LOCATION } from '@/app/api/posts/constants';
import analyticsDataClient from '@/utils/bigQueryClient';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const blogDetailSlugArray = req.nextUrl.pathname.split('/');
  const detailSlug = blogDetailSlugArray[blogDetailSlugArray.length - 1];
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
        fieldName: 'pageLocation',
        stringFilter: {
          value: `${PAGE_LOCATION}/${decodeURIComponent(detailSlug)}`,
        },
      },
    },
    //시작 일자가 있으면 해당 시작일자로 고정 그렇지 않으면 전체 기간
    dateRanges: [
      {
        startDate: `365daysAgo`,
        //현재 시간으로 설정
        endDate: 'today',
      },
    ],
    metrics: [
      {
        name: 'totalUsers',
      },
    ],
  });
  try {
    let pageViewCount = 0;
    response.rows?.forEach((eachRow) => {
      eachRow.metricValues?.forEach((metric) => {
        pageViewCount += Number(metric.value);
      });
    });
    return NextResponse.json(
      { pageViewCount },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(e, {
      status: 502,
    });
  }
}
