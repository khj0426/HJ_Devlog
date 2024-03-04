'use client';

import { ComponentProps, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styled, { css } from 'styled-components';

import useClickAway from '@/hooks/useClickAway';

interface DrawerProps extends ComponentProps<'div'> {
  isOpen: boolean;
  direction: 'top' | 'bottom' | 'left' | 'right';
  handleOpen?: (_isOpen: boolean) => void;
  contentHeight?: number;
}

const TopDrawerStyle = css`
  top: 0;
  left: 0;
  right: 0;
  transform: translate3d(0, -100%, 0);
`;

const BottomDrawerStyle = css`
  bottom: 0;
  left: 0;
  right: 0;
  transform: translate3d(0, 100%, 0);
`;

const RightDrawerStyle = css`
  top: 0;
  left: 0;
  transform: translate3d(100%, 0, 0);
`;

const LeftDrawerStyle = css`
  top: 0;
  right: 0;
  transform: translate3d(-100%, 0, 0);
`;

const Container = styled.div<{ direction: string; isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ direction }) =>
    direction === 'bottom' ? 'flex-end' : 'flex-start'};
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.25s ease-in-out;
  ${({ direction, isOpen }) => {
    switch (direction) {
      case 'top':
        return css`
          ${TopDrawerStyle};
          transform: ${isOpen
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, -100%, 0)'};
        `;
      case 'bottom':
        return css`
          ${BottomDrawerStyle};
          transform: ${isOpen
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, 100%, 0)'};
        `;
      case 'left':
        return css`
          ${LeftDrawerStyle};
          transform: ${isOpen
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(-100%, 0, 0)'};
        `;
      case 'right':
        return css`
          ${RightDrawerStyle};
          transform: ${isOpen
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(100%, 0, 0)'};
        `;
      default:
        return null;
    }
  }}
`;

const Dimmer = styled.div<{
  direction: string;
  isOpen: boolean;
}>`
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ isOpen }) => `rgba(0, 0, 0, ${isOpen ? 0.8 : 0});`};
  z-index: 0;
  transition: all 0.25s linear;
`;

const Contents = styled.div`
  z-index: 0;
  width: 100%;
  max-width: 100vw;
`;

export default function Drawer({
  isOpen,
  direction,
  handleOpen,
  contentHeight,
  ...rest
}: DrawerProps) {
  const drawerContainer = useRef(null);
  const drawerRoot = useRef<null | HTMLElement>(null);

  useEffect(() => {
    const drawerElement = document.getElementById('drawer');
    drawerRoot.current = drawerElement;
  }, []);

  useClickAway(drawerContainer, () => handleOpen && handleOpen(false));

  if (drawerRoot && drawerRoot.current) {
    return createPortal(
      <Dimmer direction={direction} isOpen={isOpen}>
        <Container
          direction={direction}
          isOpen={isOpen}
          className={`${rest.className} ${isOpen && open}`}
        >
          <Contents ref={drawerContainer}>{rest.children}</Contents>
        </Container>
      </Dimmer>,
      drawerRoot.current
    );
  }
}
