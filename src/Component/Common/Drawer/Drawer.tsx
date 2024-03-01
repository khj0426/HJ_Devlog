'use client';

import { ComponentProps, useRef } from 'react';

import styled from 'styled-components';

import useClickAway from '@/hooks/useClickAway';

interface DrawerProps extends ComponentProps<'div'> {
  isOpen: boolean;
  direction: 'top' | 'bottom' | 'left' | 'right';
  handleOpen?: (_isOpen: boolean) => void;
  contentHeight: number;
}

const Container = styled.div<{ direction: string; isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ direction }) =>
    direction === 'bottom' ? 'flex-end' : 'flex-start'};
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Dimmer = styled.div<{
  direction: string;
  isOpen: boolean;
  height: number;
}>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ isOpen }) => `rgba(0, 0, 0, ${isOpen ? 0.8 : 0});`};
  height: ${({ height }) => `${height}px` ?? 'auto'};
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
  contentHeight,
  ...rest
}: DrawerProps) {
  const drawerContainer = useRef(null);
  useClickAway(drawerContainer, () => handleOpen && handleOpen(false));
  return (
    <Dimmer direction={direction} isOpen={isOpen} height={contentHeight}>
      <Container direction={direction} isOpen={isOpen} {...rest} ref={null}>
        <Contents ref={drawerContainer}>{rest.children}</Contents>
      </Container>
    </Dimmer>
  );
}
