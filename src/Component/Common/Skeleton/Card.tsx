'use client';

import styled from 'styled-components';

import { SkeletonText } from '@/Component/Common/Skeleton/Text';

const PostCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: 350px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  background: ${({ theme }) => theme.backgroundPost};
`;

export const SkeletonCard = () => {
  return (
    <PostCard>
      <SkeletonText variant="rectangular" width={300} height={200} />

      <SkeletonText width={300} height={20} fontSize={15} />
      <SkeletonText width={150} height={20} />
    </PostCard>
  );
};
