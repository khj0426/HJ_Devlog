import { useState } from 'react';

import RssButton from '@/Component/Blog/RssButton/RssButton';
import SearchPostButton from '@/Component/Blog/SearchPost/SearchPost';
import Drawer from '@/Component/Common/Drawer/Drawer';
import DrawerImage from '@/Component/Common/Drawer/DrawerImage';
import Flex from '@/Component/Common/Flex/Flex';
import ToggleDarkModeButton from '@/Component/DarkMode/ToggoeButton';

export default function NavigationBarDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <DrawerImage
        width={32}
        onClick={() => setDrawerOpen(!isDrawerOpen)}
        height={32}
      />
      <Drawer direction="top" handleOpen={setDrawerOpen} isOpen={isDrawerOpen}>
        <Flex
          height={'150px'}
          margin={'40px auto'}
          style={{
            background: 'white',
          }}
        >
          <Flex width={'100%'} gap={'5px'} justifyContent="center">
            <RssButton />
            <SearchPostButton />
            <ToggleDarkModeButton />
          </Flex>
        </Flex>
      </Drawer>
    </div>
  );
}
