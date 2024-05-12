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
  argTypes: {
    variant: {
      defaultValue: 'primary',
      description: '다양한 뱃지 형식을 선택할 수 있습니다.',
      control: {
        type: 'radio',
      },

      options: ['primary', 'negative', 'secondary', 'positive', ''],
    },

    size: {
      defaultValue: 'small',
      description: '뱃지의 크기를 선택할 수 있습니다.',
      control: {
        type: 'radio',
      },
      options: ['small', 'default'],
    },
  },
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
