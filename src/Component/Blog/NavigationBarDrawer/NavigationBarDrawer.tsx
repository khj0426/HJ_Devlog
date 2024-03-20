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
      <Drawer
        direction="right"
        handleOpen={setDrawerOpen}
        isOpen={isDrawerOpen}
      >
        <Flex
          gap={'5px'}
          margin={'50px auto'}
          flexDirection="column"
          height={'100vh'}
        >
          <RssButton />
          <SearchPostButton />
          <ToggleDarkModeButton />
        </Flex>
      </Drawer>
    </div>
  );
}
