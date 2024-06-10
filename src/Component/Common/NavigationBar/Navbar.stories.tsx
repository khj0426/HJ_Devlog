import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '@/Component/Common/NavigationBar/Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Navbar 컴포넌트',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    links: [
      {
        to: '/',
        linkName: 'Blog',
      },
      {
        to: '/GuestBook',
        linkName: 'GuestBook',
      },
    ],
  },
  argTypes: {
    links: {
      description:
        '링크에 해당하는 정보를 제공합니다. to속성으로 어느 곳으로 이동할지,linkName으로 이름을 줄 수 있습니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const DefaultNavbar: Story = {};
