'use client';

import styled from 'styled-components';

import ViewCountButton from '@/Component/Blog/ViewCountButton/ViewCountButton';
import useGetPostDetailPageView from '@/hooks/queries/useGetPostDetailPageViewQuery';

const PageView = ({ slug }: { slug: string }) => {
  const { data } = useGetPostDetailPageView(slug);

  return <ViewCountButton viewCount={data?.pageViewCount ?? 0} />;
};

export default PageView;
