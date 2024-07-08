import type { Meta, StoryObj } from '@storybook/react';

import Flex from '@/Component/Common/Flex/Flex';

import GuestBookLoading from './loading';

const meta: Meta<typeof GuestBookLoading> = {
  title: 'Loading/GuestBookPage',
  component: GuestBookLoading,

  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

export const GuestBookLoadingExample = () => {
  return (
    <Flex justifyContent="center">
      <GuestBookLoading />
    </Flex>
  );
};
