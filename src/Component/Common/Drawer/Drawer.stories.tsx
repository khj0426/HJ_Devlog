import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import Drawer from '@/Component/Common/Drawer/Drawer';
import Flex from '@/Component/Common/Flex/Flex';

export const RightDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        direction="right"
        isOpen={open}
        contentHeight={500}
        handleOpen={setOpen}
      >
        <Flex
          height={'100vh'}
          alignItems="center"
          gap={'5px'}
          margin={'50px auto'}
          style={{
            background: 'white',
          }}
          flexDirection="column"
        >
          Content
        </Flex>
      </Drawer>
      <button onClick={() => setOpen(!open)}>Toggle</button>
    </>
  );
};
export const BottomDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        direction="bottom"
        isOpen={open}
        contentHeight={500}
        handleOpen={setOpen}
      >
        <Flex
          height={'500px'}
          alignItems="center"
          gap={'5px'}
          margin={'50px auto'}
          style={{
            background: 'white',
          }}
          flexDirection="column"
        >
          Content
        </Flex>
      </Drawer>
      <button onClick={() => setOpen(!open)}>Toggle</button>
    </>
  );
};
export const TopDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        direction="top"
        isOpen={open}
        contentHeight={500}
        handleOpen={setOpen}
      >
        <Flex
          height={'500px'}
          gap={'5px'}
          margin={'50px auto'}
          style={{
            background: 'white',
          }}
          flexDirection="column"
        >
          Content
        </Flex>
      </Drawer>
      <button onClick={() => setOpen(!open)}>Toggle</button>
    </>
  );
};

const meta: Meta<typeof Drawer> = {
  title: 'Drawer 컴포넌트',
  component: TopDrawer,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
