'use client';
import { ComponentPropsWithoutRef } from 'react';

import styled from 'styled-components';

import { Slide } from '@/Component/Common/Skeleton/Image';
interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'circular' | 'rectangular' | 'rounded' | 'text';
  width?: number;
  height?: number;
  fontSize?: number;
}

const StyledSkeleton = styled.div<SkeletonProps>`
  animation: ${Slide} 2s infinite;

  ${({ variant, fontSize }) => {
    switch (variant) {
      case 'circular':
        return 'border-radius: 50%;';
      case 'rectangular':
        return '';
      case 'rounded':
        return 'border-radius: 10px;';
      case 'text':
        return `border-radius: 5px; font-size: ${fontSize}px`;
      default:
        return '';
    }
  }}
`;

export const SkeletonText = ({ variant = 'text', ...rest }: SkeletonProps) => {
  return (
    <StyledSkeleton
      variant={variant}
      style={{
        ...rest.style,
        margin: rest?.style?.margin ?? '10px',
        width: rest.width ?? 100,
        height: rest.height ?? 10,
        fontSize: rest.fontSize,
      }}
    />
  );
};
