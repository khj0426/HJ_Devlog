'use client';

import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-weight: 600;
  text-align: center;
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
