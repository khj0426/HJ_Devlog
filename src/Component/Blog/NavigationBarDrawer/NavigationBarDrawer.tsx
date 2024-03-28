import { useState } from 'react';

import styled from 'styled-components';

import RssButton from '@/Component/Blog/RssButton/RssButton';
import SearchPostButton from '@/Component/Blog/SearchPost/SearchPost';
import Drawer from '@/Component/Common/Drawer/Drawer';
import DrawerImage from '@/Component/Common/Drawer/DrawerImage';
import ToggleDarkModeButton from '@/Component/DarkMode/ToggoeButton';

const ButtonListStyle = styled.li`
  display: flex;
  height: 32px;
  font-size: 16px;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.currentTheme.text};
`;

export default function NavigationBarDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <DrawerImage
        width={32}
        onClick={() => setDrawerOpen(!isDrawerOpen)}
        height={32}
      />
      <Drawer
        direction="right"
        handleOpen={setDrawerOpen}
        isOpen={isDrawerOpen}
      >
        <ul
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
        >
          <ButtonListStyle tabIndex={0}>
            <RssButton>
              <span>RSS피드</span>
            </RssButton>
          </ButtonListStyle>
          <ButtonListStyle tabIndex={1}>
            <SearchPostButton>
              <span>검색하기</span>
            </SearchPostButton>
          </ButtonListStyle>
          <ButtonListStyle tabIndex={2}>
            <ToggleDarkModeButton>
              <span>모드변경</span>
            </ToggleDarkModeButton>
          </ButtonListStyle>
        </ul>
      </Drawer>
    </div>
  );
}
