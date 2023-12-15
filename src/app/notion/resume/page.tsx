import { getBlocks, getParsedPages } from 'notion-on-next';

import { NotionPage } from '@/app/notion/[pageId]/page';
import ResumeClient from '@/Component/Notion/NotionresumeClient';

export default async function ResumePage() {
  const pages: NotionPage[] = await getParsedPages(
    `${process.env.NOTION_DATABASE_ID}`
  );

  const page = pages.find(
    (page) => page.id.replaceAll(/-/g, '') === `${process.env.NOTION_RESUME_ID}`
  );
  const blocks = await getBlocks(page?.id as string);

  return <ResumeClient pageId={page?.id as string} blocks={blocks} />;
}
