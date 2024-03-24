import type { Metadata } from 'next';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';
import { NotionAPI } from 'notion-client';

import NotionResumeLoading from './loading';
const ResumeClient = dynamic(
  () => import('@/Component/Notion/NotionresumeClient')
);

export async function generateMetadata(): Promise<Metadata> {
  const dynamicMetaTag: Metadata = {
    icons: {
      icon: '/images/favicon.webp',
    },
    metadataBase: new URL('https://hj-devlog.vercel.app/'),
    title: '프론트엔드 개발자 김효중 이력서',
    description: '프론트엔드 개발자가 되고 싶은 김효중의 이력서',
    openGraph: {
      images: [
        {
          url: 'https://avatars.githubusercontent.com/u/59411107?v=4',
          width: 800,
          height: 600,
        },
        {
          url: 'https://avatars.githubusercontent.com/u/59411107?v=4',
          width: 1800,
          height: 1600,
          alt: 'My custom alt',
        },
      ],
      type: 'website',
      siteName: 'hj-devlog',
      locale: 'ko-KR',
    },
    keywords: '프론트엔드 개발자 이력서',

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    verification: {
      google: 'g3Daim29whdK1ZzL1CE6pvkYyvSgM5-6C898-TVjiz0',
    },
  };
  return dynamicMetaTag;
}

export type ReturnTypeofNotionRecord = ReturnType<typeof notion.getPage>;
const notion = new NotionAPI();
export default async function ResumePage() {
  const recordMap = await notion.getPage(
    `https://notion-api.splitbee.io/v1/page/${process.env.NEXT_PUBLIC_NOTION_PAGE_ID}`
  );

  return (
    <Suspense fallback={<NotionResumeLoading />}>
      <ResumeClient recordMap={recordMap} />
    </Suspense>
  );
}
