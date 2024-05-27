import type { Meta, StoryObj } from '@storybook/react';

import NotFoundErrorFallback from '@/Component/Common/ErrorFallback/NotFoundErrorfallback';
const meta: Meta<typeof NotFoundErrorFallback> = {
  title: '404페이지',
  component: NotFoundErrorFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof NotFoundErrorFallback>;

export const BaseNotFoundErrorFallback: Story = {
  args: {
    error: new Error(
      'Failed to execute removeChild on Node: The node to be removed is not a child of this node.'
    ),
  },
};
