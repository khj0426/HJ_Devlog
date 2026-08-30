'use client';
import React from 'react';

import styled from 'styled-components';

import useGetUsersCountQuery from '@/hooks/queries/useGetUsersCountQuery';

export const StyledUserCountText = styled.p`
  display: flex;
  margin: 0 0 16px;
  padding: 0;
  color: var(--seed-color-fg-neutral-subtle);
  font-size: 13px;
`;
export default function UserCountInfo() {
  const { data: countData, isLoading } = useGetUsersCountQuery();
  if (isLoading) {
    return;
  }
  return (
    <StyledUserCountText>
      어제까지 총 {countData?.datalist[0]?.value}명이 이 기록을 다녀갔어요.
    </StyledUserCountText>
  );
}
