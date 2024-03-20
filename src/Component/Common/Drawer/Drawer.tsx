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
`;

const BottomDrawerStyle = css`
  bottom: 0;
`;

const RightDrawerStyle = css`
  top: 0;
  right: 0;
  width: 150px;
`;

const LeftDrawerStyle = css`
  top: 0;
  left: 0;
  width: 150px;
`;

const Container = styled.div<{ direction: string; isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ direction }) =>
    direction === 'bottom' ? 'flex-end' : 'flex-start'};
  width: 100%;
  height: 100%;
  position: absolute;

  transition: all 3s ease-in-out;
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
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: ${({ isOpen }) => `rgba(0, 0, 0, ${isOpen ? 0.8 : 0});`};
`;

const Contents = styled.div<{ direction: DrawerProps['direction'] }>`
  width: 100%;
  max-width: 100vw;
  background-color: ${({ direction }) =>
    (direction === 'left' || direction === 'right') && 'white'};
`;

export default function Drawer({
  isOpen,
  direction,
  handleOpen,
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
      <Dimmer
        direction={direction}
        isOpen={isOpen}
        onClick={() => handleOpen && handleOpen(false)}
      >
        <Container
          direction={direction}
          isOpen={isOpen}
          className={`${rest.className} ${isOpen && open}`}
        >
          <Contents ref={drawerContainer} direction={direction}>
            {rest.children}
          </Contents>
        </Container>
      </Dimmer>,
      drawerRoot.current
    );
  }
}
