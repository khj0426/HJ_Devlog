import type { Meta, StoryObj } from '@storybook/react';

import CloseButton from '@/Component/Common/CloseButton/CloseButton';

const meta: Meta<typeof CloseButton> = {
  title: 'Component/CloseButton',
  component: CloseButton,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const DefaultCloseButton: Story = {};

export const LargeSizeCloseButton: Story = {
  args: {
    size: 150,
  },
};

export const DisabledCloseButton: Story = {
  args: {
    isDisabled: true,
  },
};
