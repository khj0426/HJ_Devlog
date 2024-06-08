import type { Meta, StoryObj } from '@storybook/react';

import Divider from './Divider';

const meta: Meta<typeof Divider> = {
  title: '구분선 컴포넌트',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    orientation: {
      defaultValue: 'horizontal',
      description: '가로인지 세로인지 여부',
      control: {
        type: 'radio',
      },
      options: ['horizontal', 'vertical'],
    },
    length: {
      description: '구분선의 길이',
    },
    color: {
      description: '구분선의 색상',
      control: {
        type: 'string',
      },
    },
    thickness: {
      description: '구분선의 두께',
      control: {
        type: 'string',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const HorizontalDivider: Story = {
  args: {
    orientation: 'horizontal',
    length: '100%',
    thickness: '10px',
  },
};

export const VerticalDivider: Story = {
  args: {
    orientation: 'vertical',
    length: '100px',
    thickness: '10px',
  },
};
