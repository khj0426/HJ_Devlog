import { ComponentPropsWithoutRef, ReactNode } from 'react';

import styled from 'styled-components';

interface StyledModalFooterProps extends ComponentPropsWithoutRef<'section'> {
  showKeyLine?: boolean;
}

const StyledModalFooter = styled.section`
  padding: 10px;
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default function ModalFooter({
  showKeyLine,
  children,
  ...rest
}: StyledModalFooterProps) {
  return <StyledModalFooter {...rest}>{children}</StyledModalFooter>;
}
