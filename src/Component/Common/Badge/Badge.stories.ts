import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: '기본적인 뱃지 컴포넌트',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const PrimaryBadge: Story = {
  args: {
    variant: 'primary',
    children: '뱃지',
  },
};
export const SecondaryBadge: Story = {
  args: {
    variant: 'secondary',
    children: '뱃지',
  },
};

export const PositiveBadge: Story = {
  args: {
    variant: 'positive',
    children: '뱃지',
  },
};

export const NegativeBadge: Story = {
  args: {
    variant: 'negative',
    children: '뱃지',
  },
};

export const SmallBadge: Story = {
  args: {
    size: 'small',
    children: '뱃지',
  },
};

export const MediumBadge: Story = {
  args: {
    size: 'default',
    children: '뱃지',
  },
};
