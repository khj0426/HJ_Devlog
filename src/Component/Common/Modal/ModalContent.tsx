import { CSSProperties, ReactNode } from 'react';

import styled from 'styled-components';

const StyledModalContent = styled.div<{
  backgroundColor?: CSSProperties['backgroundColor'];
}>`
  border: 0;
  height: 100vh;
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
}: {
  children: ReactNode;
  backgroundColor?: CSSProperties['backgroundColor'];
}) {
  return (
    <StyledModalContent backgroundColor={backgroundColor}>
      {children}
    </StyledModalContent>
  );
}
