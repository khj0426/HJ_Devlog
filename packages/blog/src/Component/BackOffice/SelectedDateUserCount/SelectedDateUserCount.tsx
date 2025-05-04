"use client";
import React from "react";

import Spinner from "@hj-devlog/shared/src/components/Spinner/Spinner";
import styled from "styled-components";

import { SelectDateOptionsProps } from "~/@types/BackOfficeProps";
import useGetUsersCountByDate from "~/src/hooks/queries/useGetUsersByDateQuery";

const StyledUserCountText = styled.p`
  display: flex;
  width: 80%;
  margin: 15px auto;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export default function SelectedDateUserCountInfo({
  date,
}: {
  readonly date: SelectDateOptionsProps;
}) {
  const { data: countData, isLoading } = useGetUsersCountByDate(date);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <StyledUserCountText>
      {date}동안 총 {countData?.datalist[0]?.value}명이 방문했어요🧡
    </StyledUserCountText>
  );
}
