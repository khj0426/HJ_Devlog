import type { Meta, StoryObj } from '@storybook/react';

import DropDown from '@/Component/Common/DropDown/DropDown';

const meta: Meta<typeof DropDown> = {
  title: '메뉴를 선택 가능한 드롭다운 컴포넌트',
  component: DropDown,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DropDown>;

export const DefaultDropDown: Story = {
  args: {
    items: [
      {
        id: '1',
        text: '옵션1',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?rotate=0',
        description: '옵션 1 설명',
      },
      {
        id: '2',
        text: '옵션2',
        icon: 'https://api.dicebear.com/8.x/adventurer-neutral/svg?rotate=90',
        description: '옵션2 설명',
      },
    ],
  },
};
