import React from 'react';

import { NotionPageBody, getBlocks } from 'notion-on-next';

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
