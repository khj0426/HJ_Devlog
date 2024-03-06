'use client';
import { CSSProperties, ComponentPropsWithoutRef, ReactNode } from 'react';

import styled, { css } from 'styled-components';

interface FlexProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
}

const flex = css<FlexProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: ${({ gap }) => gap};
  width: ${({ width }) => width ?? 'auto'};
  height: ${({ height }) => height ?? 'auto'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;

const StyledFlex = styled.div<FlexProps>`
  ${flex}
`;

export default function Flex({
  children,
  flexDirection = 'row',
  justifyContent = 'flex-start',
  alignItems = 'center',
  gap = '0px',
  width,
  height,
  margin,
  padding,
  ...rest
}: FlexProps) {
  return (
    <StyledFlex
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      {...rest}
    >
      {children}
    </StyledFlex>
  );
}
