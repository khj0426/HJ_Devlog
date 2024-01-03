import type { Meta, StoryObj } from '@storybook/react';

import Footer from '@/Component/Common/Footer';

const meta: Meta<typeof Footer> = {
  title: '푸터 컴포넌트',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const BasicFooter: Story = {
  args: {},
};
