"use client";
import React from "react";

import styled from "styled-components";

import useGetUsersCountQuery from "~/src/hooks/queries/useGetUsersCountQuery";

const StyledUserCountText = styled.p`
  display: flex;
  width: 80%;
  margin: 15px auto;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;
export default function UserCountInfo() {
  const { data: countData, isLoading } = useGetUsersCountQuery();
  if (isLoading) {
    return;
  }
  return (
    <StyledUserCountText>
      어제까지 총 {countData?.datalist[0]?.value}명이 방문했어요🧡
    </StyledUserCountText>
  );
}
