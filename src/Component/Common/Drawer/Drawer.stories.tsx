import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import Drawer from '@/Component/Common/Drawer/Drawer';

export const BaseDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        direction="top"
        isOpen={open}
        contentHeight={500}
        handleOpen={setOpen}
      >
        <div>Content</div>
      </Drawer>
      <button onClick={() => setOpen(!open)}>Toggle</button>
    </>
  );
};

const meta: Meta<typeof Drawer> = {
  title: 'Drawer 컴포넌트',
  component: BaseDrawer,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
