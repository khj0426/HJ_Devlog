import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextRequest, NextResponse } from 'next/server';

import { formatDateToString } from '@/utils/formatDateToString';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const getQueryStringDate = req.nextUrl.searchParams.get('page');
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email:
        'starting-account-12slh5qsy7a9@quickstart-1713370216424.iam.gserviceaccount.com',
      client_id: '101588829196386335755',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQComGlcWP3idK73\n2dvRzp3AvYydbJMVCee0aH2Y0Fja3jpqfUN0pcwSMPkX96UfTjmeJ8wtHVwRqoE5\ninIMKCWB7ssMkUAW7ZKDM7hzcY1oZbPpwE8u7GPxJBHYijIWtCD+KR07NsVO+p73\nO8CCnvsUPFNuvtV0PmRdkiYalwQ57wR6X6VvsYePH4kRrZccrRfVtRnloOqskDUV\np05mIKQ5qTZbzkBcbhvT+H/+UW8GS6zcIjMFY76Ps3Xxm5fBzjXZNSyzoCm1uHmF\nC6Ykb+gdm0NirV4+dYqtWDiyslwfOahV1ceWW21LgfyRGLM3T39qFgoW57yXzsSZ\nwVYopeGxAgMBAAECggEAAaXPrcve21Y5mYmDCPdkekw/8g/sFhINNimpRJOQsr7m\nQkEsJhkyt+DLpmzQq9AnZwDLkYtOaYvJjIbqW20PBMiRKnPG9RJoUqjwPgyXjbQk\nwH2VKIe96E7qb7vWBnvHMMS1GO2Nmxp+8DqgxIYKPSXjyNrLmkG72GBDyBG+xFQq\nGoIqTqTEBJQrmxfziZf3uTMvPbcSsS39pGWMPWOfN68x0YBSRWqNaLkEw3QI/dRH\n1l3jxOkUoF5mH+bygLbeVXajbGCkTQ7hb7vrnGlCNkMLDCQB4noiglM29ZECQc0D\nLd6hGzmHySGLuKV+UNugh2J2T20FVdoiGqCWLST4AQKBgQDj60sgSlDNuNaReOBh\nJ17ozPlKFaCX/tDVYO5ZYinMIxVRI/xFczVdot+p3c3DptmMA3/vQ3oM83L1wemN\ntgO0nu6dsJUqHhIimqGvd1daJ16BgsujuyfpZU8uPe7HSwDtYcdFYbDHuHBC1iga\nR7b6IPTW+oKHPEkYY90iDLTdAQKBgQC9XgLOw9MsApM8PNm/offsnnQXZY8Mbrk/\n+crjdFTtjIVOQfTYCxDYD8CCzajcydqUfzZ+l2f6+StR5uxugMBLIxrWjLWX/kwD\nIqCVOD1GzypyqbPBHSzcc4MIJT0oMKRBGIE6hSYlaPg0W4dLdLbxMlngnsLUrxHH\n4nr23VUUsQKBgQDASG+XDFtjU79h9zKFhGujx9nA0MItuUKB4kbzjcdpe2eujsdz\n6CBroM9FReUkXQ1H/GPgfXLonjKsdy4M6jPyG+t/icwuPjRakU469Fnzqycl6CzZ\nMzoWw+urPYDHDdX4bvdo52P2+vlqybYHhd0u5MLq42lfolKgiw+yfDnSAQKBgD6H\nNFYhwzDdCNDzJtNoH/05tQuktT9dsD23tY61cvWdWMcmcDqGLOGrEd4fGosM++fc\nuZnDVMpCTFOW9KroSJaG2O3POIcfqOnAHVYoY9NlxJZoArrZb167paCi6zbCGPqF\npOY14QqpRovDTUFVILMz9Ql+Ysbnp+9gkUnCe72BAoGAbTjnkTHjQQHxYO30/16D\n9FAjmdIK4IJath+/ph20Pm8mmtAe4rZQ9DEqTvtgJCRkd4eRPGTQ2JkH/9BWcjOa\n7wsgJpSiOrZSvnnZdecsxEZ6XWYDgVHRrUyd8OXTf+XoPGcSK8AGNaw+ieZ2atjA\nYiuKUTQXCCB2PeQHgeUO+WE=\n-----END PRIVATE KEY-----\n',
      project_id: 'quickstart-1713370216424',
      private_key_id: 'fece05c370269798717c1096e90c0d73a24e36b6',
    },
  });

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
          startDate: `${getQueryStringDate}daysAgo`,
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
    return response;
  };

  try {
    const res = await report();
    console.log(res);
    return NextResponse.json(res, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(e, {
      status: 502,
    });
  }
}
