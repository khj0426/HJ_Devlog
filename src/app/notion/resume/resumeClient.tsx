import { NotionPageBody, getBlocks } from 'notion-on-next';

import { NotionPage } from '@/app/notion/[pageId]/page';

type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

type BlockObject = PromiseType<ReturnType<typeof getBlocks>>;

export default function ResumeClient({
  blocks,
  pageId,
}: {
  blocks: BlockObject;
  pageId: string;
}) {
  return (
    <div>
      <main
        style={{
          width: '80%',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            maxWidth: '80%',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <NotionPageBody
            blocks={blocks}
            pageId={pageId}
            databaseId={`${process.env.NOTION_DATABASE_ID}`}
          />
        </div>
      </main>
    </div>
  );
}
