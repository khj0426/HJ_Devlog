import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: '토스트 컴포넌트',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const ToastInfo: Story = {
  args: {
    toastTitle: 'baseInfo Title',
    message: 'basicInfo',
    type: 'info',
  },
};

export const ToastWarning: Story = {
  args: {
    toastTitle: 'baseWarning Title',
    message: 'baseWarn',
    type: 'warning',
  },
};

export const ToastError: Story = {
  args: {
    toastTitle: 'baseError Title',
    message: 'baseError',
    type: 'error',
  },
};
