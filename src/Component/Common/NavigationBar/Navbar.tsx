'use client';
import { memo } from 'react';

import Link from 'next/link';
import styled, { css } from 'styled-components';

import NavigationBarDrawer from '@/Component/Blog/NavigationBarDrawer/NavigationBarDrawer';
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

function Navbar() {
  return (
    <StyledNavBarLayout>
      <Flex gap={'10px'}>
        <StyledNavBarTitle href="/">Blog</StyledNavBarTitle>
        <StyledNavBarTitle href="/about">About</StyledNavBarTitle>
        <StyledNavBarTitle href="/guestbook">GuestBook</StyledNavBarTitle>
        <StyledNavBarTitle href="/notion/resume">Resume</StyledNavBarTitle>
      </Flex>
      <NavigationBarDrawer />
    </StyledNavBarLayout>
  );
}

export default memo(Navbar);
