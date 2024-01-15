import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '@/Component/Common/NavigationBar/Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Navbar 컴포넌트',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const DefaultNavbar: Story = {};
