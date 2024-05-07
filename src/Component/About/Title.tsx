'use client';
import { ComponentPropsWithoutRef } from 'react';

import styled from 'styled-components';

interface TitleProps extends ComponentPropsWithoutRef<'h3'> {
  title?: string;
}
const StyledTitle = styled.h3`
  font-weight: 700;
  font-size: 15px;
`;

export default function Title({ title, ...rest }: TitleProps) {
  return <StyledTitle {...rest}>{title}</StyledTitle>;
}
