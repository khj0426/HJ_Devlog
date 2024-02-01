import dynamic from 'next/dynamic';
import { NotionAPI } from 'notion-client';

const ResumeClient = dynamic(
  () => import('@/Component/Notion/NotionresumeClient')
);

export type ReturnTypeofNotionRecord = ReturnType<typeof notion.getPage>;
const notion = new NotionAPI();
export default async function ResumePage() {
  const recordMap = await notion.getPage(
    `https://notion-api.splitbee.io/v1/page/${process.env.NEXT_PUBLIC_NOTION_PAGE_ID}`
  );

  return <ResumeClient recordMap={recordMap} />;
}
