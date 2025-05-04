"use client";

import useGetPostDetailPageView from "~/src/hooks/queries/useGetPostDetailPageViewQuery";

import ViewCountButton from "../ViewCountButton/ViewCountButton";

const PageView = ({ slug }: { slug: string }) => {
  const { data } = useGetPostDetailPageView(slug);

  return <ViewCountButton viewCount={data?.pageViewCount ?? 0} />;
};

export default PageView;
