import type { Meta, StoryObj } from '@storybook/react';

import NavigationButton from '@/Component/Common/NavigationButton/NavigationButton';
const meta: Meta<typeof NavigationButton> = {
  title: '페이지 이동가능한 버튼',
  component: NavigationButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof NavigationButton>;

export const NextNavigationButton: Story = {
  args: {
    type: 'next',
    children: '반갑습니다',
    link: 'https://github.com/khj0426/HJ_Devlog',
  },
};

export const PrevNavigationButton: Story = {
  args: {
    type: 'prev',
    children: '반갑습니다.',
    link: 'https://github.com/khj0426/HJ_Devlog',
  },
};
