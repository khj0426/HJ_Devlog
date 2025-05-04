"use client";
import { useEffect } from "react";

import Flex from "@hj-devlog/shared/src/components/Flex/Flex";
import Pagination from "@hj-devlog/shared/src/components/Pagination/Pagination";
import usePageNation from "@hj-devlog/shared/src/hooks/usePagenation";
import { useRouter } from "next/navigation";

import PostItem from "~/src/Component/Post/PostItem";
import useCategoryPostQuery from "~/src/hooks/queries/useCategoryPostQuery";

export default function Home({
  params,
}: {
  params: {
    categoryId: string;
    pageId: number;
  };
}) {
  const route = useRouter();

  params.categoryId = decodeURIComponent(params.categoryId);

  const { data } = useCategoryPostQuery({
    category: params.categoryId,
  });

  const { pageCount, changePage, pageData } = usePageNation({
    limit: 4,
    item: data?.posts ?? [],
  });

  useEffect(() => {
    changePage(params.pageId);
  }, [params.pageId]);

  return (
    <>
      <h2>{params.categoryId}</h2>
      <main>
        <Flex
          justifyContent="center"
          flexWrap="wrap"
          width={"80%"}
          margin={"0 auto"}
        >
          {pageData().map((post) => (
            <PostItem key={post.title} post={post} />
          ))}
        </Flex>
      </main>
      <Pagination
        numPages={pageCount}
        handleOnClickPage={(page) =>
          route.push(`/category/${params.categoryId}/${page}`)
        }
      />
    </>
  );
}
