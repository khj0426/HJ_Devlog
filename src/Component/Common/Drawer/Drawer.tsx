'use client';

import { ComponentProps } from 'react';

import styled from 'styled-components';

import useClickAway from '@/hooks/useClickAway';

interface DrawerProps extends ComponentProps<'div'> {
  isOpen: boolean;
  direction: 'top' | 'bottom' | 'left' | 'right';
  handleOpen?: (_isOpen: boolean) => void;
}

const Container = styled.div<{ direction: string; isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ direction }) =>
    direction === 'bottom' ? 'flex-end' : 'flex-start'};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Dimmer = styled.div<{ direction: string; isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background-color: ${({ isOpen }) => `rgba(0, 0, 0, ${isOpen ? 0.8 : 0});`};
  height: 100%;
  transition: all 0.25s linear;
`;

const Contents = styled.div`
  z-index: 3;
  width: 100%;
  max-width: 100vw;
  justify-content: center;
`;

export default function Drawer({
  isOpen,
  direction,
  handleOpen,
  ...rest
}: DrawerProps) {
  const { ref } = useClickAway(() => handleOpen && handleOpen(false));
  return (
    <Dimmer direction={direction} isOpen={isOpen}>
      <Container direction={direction} isOpen={isOpen} {...rest} ref={null}>
        <Contents ref={ref}>{rest.children}</Contents>
      </Container>
    </Dimmer>
  );
}
