'use client';
import { ComponentPropsWithoutRef } from 'react';

import styled from 'styled-components';

interface TitleProps extends ComponentPropsWithoutRef<'h3'> {
  title?: string;
}
const StyledTitle = styled.h3`
  font-weight: 700;
  display: flex;
  flex-wrap: wrap;
  font-size: 15px;
  justify-content: center;

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    justify-content: center;
  }
`;

export default function Title({ title, ...rest }: TitleProps) {
  return <StyledTitle {...rest}>{title}</StyledTitle>;
}
