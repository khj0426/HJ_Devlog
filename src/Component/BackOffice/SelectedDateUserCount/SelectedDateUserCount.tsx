'use client';
import React from 'react';

import { SelectDateOptionsProps } from '@/@types/BackOfficeProps';
import { StyledUserCountText } from '@/Component/Blog/UserCountInfo/UserCountInfo';
import Spinner from '@/Component/Common/Spinner/Spinner';
import useGetUsersCountByDateQuery from '@/hooks/queries/useGetUsersByDateQuery';

export default function SelectedDateUserCountInfo({
  date,
}: {
  readonly date: SelectDateOptionsProps;
}) {
  const { data: countData, isLoading } = useGetUsersCountByDateQuery(date);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <StyledUserCountText>
      어제까지 총 {countData?.datalist[0]?.value}명이 방문했어요🧡
    </StyledUserCountText>
  );
}
