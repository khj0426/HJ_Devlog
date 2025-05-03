'use client';
import { ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

export const Slide = keyframes`
  0% {
    background-color: rgba(165, 165, 165, 0.1);
  }
  50% {
    background-color: rgba(165, 165, 165, 0.3);
  }
  100% {
    background-color: rgba(165, 165, 165, 0.1);
  }
`;

const AnimatedImage = styled(Image)`
  animation: ${Slide} 2s infinite;
`;

interface SkeletonImageProps extends ComponentPropsWithoutRef<typeof Image> {
  display?: 'inline' | 'block' | 'flex';
  fit?: 'contain' | 'cover' | 'none' | 'scale-down';
}

export const SkeletonImage = ({ ...rest }: SkeletonImageProps) => {
  return (
    <AnimatedImage
      {...rest}
      width={rest.width}
      height={rest.height}
      alt={rest.alt}
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      src={rest.src}
      style={{
        display: rest.display,
        objectFit: rest.fit,
      }}
    />
  );
};
