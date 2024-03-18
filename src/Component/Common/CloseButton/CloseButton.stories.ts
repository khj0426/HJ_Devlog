import type { Meta, StoryObj } from '@storybook/react';

import CloseButton from '@/Component/Common/CloseButton/CloseButton';

const meta: Meta<typeof CloseButton> = {
  title: '모달이나 Drawer에서 사용될 닫기 버튼 컴포넌트',
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
