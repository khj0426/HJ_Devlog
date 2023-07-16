'use client';
import React from 'react';
import styled from 'styled-components';

const StyledPostLayOut = styled.article`
  max-width: 100%;
  display: flex;
  min-width: 60%;
  margin: 20px auto;
  flex-direction: column;
  margin-bottom: 50px;

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 20px;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 20px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 13px;
  }
`;

export default function BlogLayOut({
  children,
}: {
  children: React.ReactNode[];
}) {
  return <StyledPostLayOut>{children}</StyledPostLayOut>;
}
