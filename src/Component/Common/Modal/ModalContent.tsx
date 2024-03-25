import { CSSProperties, ReactNode, useRef } from 'react';

import styled from 'styled-components';

import useClickAway from '@/hooks/useClickAway';

const StyledModalContent = styled.div<{
  backgroundColor?: CSSProperties['backgroundColor'];
}>`
  border: 0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor ?? 'white'};
  outline: none;
`;

export default function ModalContent({
  children,
  backgroundColor,
  closeOutSideClick,
}: {
  children: ReactNode;
  backgroundColor?: CSSProperties['backgroundColor'];
  closeOutSideClick?: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  useClickAway(contentRef, closeOutSideClick);
  return (
    <StyledModalContent backgroundColor={backgroundColor} ref={contentRef}>
      {children}
    </StyledModalContent>
  );
}
