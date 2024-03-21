import type { Meta, StoryObj } from '@storybook/react';

import ModalContent from '@/Component/Common/Modal/ModalContent';
import ModalOverlay from '@/Component/Common/Modal/ModalOverlay';
const meta: Meta<typeof ModalOverlay> = {
  title: '모달 컴포넌트 오버레이 예시',
  component: ModalOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ModalOverlay>;

export const ExampleModalOverlayOpen: Story = {
  args: {
    id: 'ExampleModal',
    isOpen: true,
    children: <ModalContent backgroundColor="#cdcdcd">Content</ModalContent>,
  },
};

export const ExampleModalOverlayClose: Story = {
  args: {
    id: 'ExampleModal',
    isOpen: false,
    children: '모달 오버레이',
  },
};
