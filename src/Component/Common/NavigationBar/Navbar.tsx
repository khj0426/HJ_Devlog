'use client';

interface NavBarProps {
  to: string;
  linkName: string;
}

import { CSSProperties, ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';

import Flex from '@/Component/Common/Flex/Flex';

const StyledNavBarLayout = styled.nav`
  position: sticky;
  top: 0;
  cursor: pointer;
  left: 0;
  width: 100%;
  display: flex;
  font-size: 20px;
  color: ${({ theme }) => theme.currentTheme.text};
  gap: 15px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.currentTheme.body};
  align-items: center;
  justify-content: space-around;
  z-index: 100;
`;

const StyledNavBarColumnLayout = styled.nav`
  position: sticky;
  top: 0;
  cursor: pointer;
  display: block;
  left: 0;
  width: 350px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.currentTheme.body};
  z-index: 100;
`;

const StyledNavBarTitle = styled(Link)`
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 14px;
  }
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  ${({ href }) =>
    href === '/notion/resume' &&
    css`
      @media (max-width: 1024px) {
        opacity: 0;
      }
    `};
`;

function Navbar({
  links,
  hasDrawer,
  drawer,
  direction = 'row',
  activeStyle,
}: {
  readonly links: NavBarProps[];
  readonly hasDrawer?: boolean;
  readonly drawer?: ReactNode;
  readonly direction?: 'row' | 'column';
  readonly activeStyle?: CSSProperties;
}) {
  const currentPath = usePathname();

  const currentPathStyle = (link: string) => {
    if (link === currentPath) {
      return activeStyle;
    }
    return {};
  };
  switch (direction) {
    case 'row':
      return (
        <StyledNavBarLayout>
          <Flex gap={'10px'}>
            {links.map((link) => (
              <StyledNavBarTitle
                style={currentPathStyle(link.to)}
                href={link.to}
                key={link.linkName}
              >
                {link.linkName}
              </StyledNavBarTitle>
            ))}
          </Flex>
          {hasDrawer && drawer}
        </StyledNavBarLayout>
      );
    case 'column':
      return (
        <StyledNavBarColumnLayout>
          <Flex
            gap={'10px'}
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            {links.map((link) => (
              <StyledNavBarTitle
                style={currentPathStyle(link.to)}
                href={link.to}
                key={link.linkName}
              >
                {link.linkName}
              </StyledNavBarTitle>
            ))}
          </Flex>
          {hasDrawer && drawer}
        </StyledNavBarColumnLayout>
      );
  }
}

export default Navbar;
