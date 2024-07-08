import type { Meta, StoryObj } from '@storybook/react';

import Footer from '@/Component/Common/Footer/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Component/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const BasicFooter: Story = {
  args: {},
};
