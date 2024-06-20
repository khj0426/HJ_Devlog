'use client';

import { useState } from 'react';

import { Activity, AddCircle, CalendarSearch } from 'iconic-react';

import ReportButton from '@/Component/Blog/ReportButton/ReportButton';
import RssButton from '@/Component/Blog/RssButton/RssButton';
import SearchPostButton from '@/Component/Blog/SearchPost/SearchPost';
import Drawer from '@/Component/Common/Drawer/Drawer';
import DrawerImage from '@/Component/Common/Drawer/DrawerImage';
import IconButton from '@/Component/Common/IconButton/IconButton';
import ToggleDarkModeButton from '@/Component/DarkMode/ToggoeButton';

export default function BackOfficeDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  return (
    <div>
      <Activity
        cursor={'pointer'}
        size={50}
        onClick={() => setDrawerOpen(!isDrawerOpen)}
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
            icon={
              <AddCircle
                size="32"
                color="#FF8A65"
                variant="Bold"
                style={{
                  cursor: 'pointer',
                }}
              />
            }
            style={{
              border: 'none',
            }}
          />

          <IconButton
            icon={
              <CalendarSearch
                size="32"
                color="#FF8A65"
                variant="Bold"
                style={{
                  cursor: 'pointer',
                }}
              />
            }
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
