'use client';

import styled from 'styled-components';

const StyledTitle = styled.h3`
  font-weight: 700;
  display: flex;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 16px;
  }
`;

export default function Title({ title }: { title: string }) {
  return <StyledTitle>{title}</StyledTitle>;
}
