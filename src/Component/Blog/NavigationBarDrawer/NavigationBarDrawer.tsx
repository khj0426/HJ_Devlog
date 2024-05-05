import { useState } from 'react';

import styled from 'styled-components';

import ReportButton from '@/Component/Blog/ReportButton/ReportButton';
import RssButton from '@/Component/Blog/RssButton/RssButton';
import SearchPostButton from '@/Component/Blog/SearchPost/SearchPost';
import Drawer from '@/Component/Common/Drawer/Drawer';
import DrawerImage from '@/Component/Common/Drawer/DrawerImage';
import IconButton from '@/Component/Common/IconButton/IconButton';
import ToggleDarkModeButton from '@/Component/DarkMode/ToggoeButton';

const ButtonListStyle = styled.li`
  display: flex;
  height: 32px;
  font-size: 16px;
  align-items: center;
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
          <IconButton
            icon={<ReportButton />}
            tabIndex={0}
            style={{
              border: 'none',
            }}
          />
          <IconButton
            icon={<RssButton />}
            tabIndex={0}
            style={{
              border: 'none',
            }}
          />
          <IconButton
            icon={<SearchPostButton />}
            tabIndex={0}
            style={{
              border: 'none',
            }}
          />
          <IconButton
            icon={<ToggleDarkModeButton />}
            tabIndex={0}
            style={{
              border: 'none',
            }}
          />
        </ul>
      </Drawer>
    </div>
  );
}
