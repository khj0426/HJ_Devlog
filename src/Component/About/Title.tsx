'use client';

import styled from 'styled-components';

const StyledTitle = styled.h3`
  font-weight: 700;
  display: flex;
  flex-wrap: wrap;
  font-size: 15px;
`;

export default function Title({ title }: { title: string }) {
  return <StyledTitle>{title}</StyledTitle>;
}
