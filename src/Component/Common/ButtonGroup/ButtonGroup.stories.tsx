import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/Component/Common/Button/Button';

import ButtonGroup from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: '버튼그룹컴포넌트',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const BaseButtonGroup: Story = {
  args: {
    children: (
      <>
        <Button label="Button"></Button>
        <Button label="Button"></Button>
        <Button label="Button"></Button>
      </>
    ),
  },
};

export const ColumnButtonGroup: Story = {
  args: {
    direction: 'column',
    children: (
      <>
        <Button label="Button"></Button>
        <Button label="Button"></Button>
        <Button label="Button"></Button>
      </>
    ),
  },
};

export const SpacingButtonGroup: Story = {
  args: {
    spacing: 15,
    children: (
      <>
        <Button label="Button"></Button>
        <Button label="Button"></Button>
        <Button label="Button"></Button>
      </>
    ),
  },
};

export const OutLinedButtonGroup: Story = {
  args: {
    spacing: 15,
    outline: true,
    fill: '#e5e7eb',
    children: (
      <>
        <Button label="Button"></Button>
        <Button label="Button"></Button>
        <Button label="Button"></Button>
      </>
    ),
  },
};
