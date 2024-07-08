import type { Meta, StoryObj } from '@storybook/react';

import ModalHeader from '@/Component/Common/Modal/ModalHeader';
const meta: Meta<typeof ModalHeader> = {
  title: 'Component/ModalHeader',
  component: ModalHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ModalHeader>;

export const Modal_H1_Header: Story = {
  args: {
    as: 'h1',
    children: '모달 헤더',
  },
};

export const Modal_H2_HEADER: Story = {
  args: {
    as: 'h2',
    children: '모달 헤더',
  },
};

export const Modal_H3_HEADER: Story = {
  args: {
    as: 'h3',
    children: '모달 헤더',
  },
};
