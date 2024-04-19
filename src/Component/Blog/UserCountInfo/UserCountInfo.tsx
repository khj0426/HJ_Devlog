'use client';
import React from 'react';

import styled from 'styled-components';

import useGetUsersCountQuery from '@/hooks/queries/useGetUsersCountQuery';

const UserCountText = styled.p`
  display: flex;
  width: 68%;
  margin: 15px auto;
  padding: 0;
`;
export default function UserCountInfo() {
  const { data: countData, isLoading } = useGetUsersCountQuery();
  if (isLoading) {
    return;
  }
  return (
    <UserCountText>
      총 {countData?.datalist[0]?.value}명이 방문했어요🧡
    </UserCountText>
  );
}
