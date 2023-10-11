// Next 13 - /app/blog
import { NotionPageBody, getParsedPages, getBlocks } from 'notion-on-next';

interface NotionPage {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: any; // You can define a specific type for 'cover' if you have more information.
  icon: {
    type: string;
    emoji: string;
  };
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: any; // You can define a specific type for 'properties' if you have more information.
  url: string;
  public_url: string;
  slug: string;
  title: string;
  databaseName: string;
  databaseId: string;
  coverImage: any; // You can define a specific type for 'coverImage' if you have more information.
}

export default async function Blog({
  params,
}: {
  params: {
    pageId: string;
  };
}) {
  const pages: NotionPage[] = await getParsedPages(
    `${process.env.NOTION_DATABASE_ID}`
  );

  const page = pages.find(
    (page) => page.id.replaceAll(/-/g, '') === params.pageId
  );
  const blocks = await getBlocks(page?.id as string);
  return (
    <div>
      <main
        style={{
          width: '80%',
          margin: '0 auto',
        }}
      >
        <div>
          <NotionPageBody
            blocks={blocks}
            pageId={page?.id as string}
            databaseId={`${process.env.NOTION_DATABASE_ID}`}
          />
        </div>
      </main>
    </div>
  );
}
