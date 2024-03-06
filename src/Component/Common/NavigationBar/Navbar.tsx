'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';

import RssButton from '@/Component/Blog/RssButton/RssButton';
import SearchPostButton from '@/Component/Blog/SearchPost/SearchPost';
import Drawer from '@/Component/Common/Drawer/Drawer';
import DrawerImage from '@/Component/Common/Drawer/DrawerImage';
import Flex from '@/Component/Common/Flex/Flex';
import ToggleDarkModeButton from '@/Component/DarkMode/ToggoeButton';
import useDevice from '@/hooks/useDevice';

const StyledNavBarLayout = styled.nav`
  position: sticky;
  top: 0;
  cursor: pointer;
  left: 0;
  width: 100%;
  display: flex;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  gap: 15px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.body};
  align-items: center;
  justify-content: space-around;
  z-index: 999;
`;

const StyledNavBarTitle = styled(Link)`
  @media ${({ theme }) => theme?.device?.mobile} {
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

const StyledButtonArea = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default function Navbar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <StyledNavBarLayout>
      <Flex gap={'10px'}>
        <StyledNavBarTitle href="/">Blog</StyledNavBarTitle>
        <StyledNavBarTitle href="/about">About</StyledNavBarTitle>
        <StyledNavBarTitle href="/guestbook">GuestBook</StyledNavBarTitle>
        <StyledNavBarTitle href="/notion/resume">Resume</StyledNavBarTitle>
      </Flex>
      <div>
        <DrawerImage
          width={32}
          onClick={() => setDrawerOpen(true)}
          height={32}
        />
        <Drawer
          direction="top"
          handleOpen={setDrawerOpen}
          isOpen={isDrawerOpen}
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            height={'150px'}
            margin={'40px auto'}
            style={{
              background: 'white',
            }}
          >
            <StyledButtonArea>
              <RssButton />
              <SearchPostButton />
              <ToggleDarkModeButton />
            </StyledButtonArea>
          </Flex>
        </Drawer>
      </div>
    </StyledNavBarLayout>
  );
}
