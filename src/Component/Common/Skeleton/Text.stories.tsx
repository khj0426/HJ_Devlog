import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonText } from '@/Component/Common/Skeleton/Text';

const meta: Meta<typeof SkeletonText> = {
  title: '스켈레톤 텍스트',
  component: SkeletonText,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonText>;

export const BaseSkeletonText: Story = {
  args: {
    width: 350,
    height: 50,
    onClick: () => alert('click!'),
  },
};

export const SmallSkeletonText: Story = {
  args: {
    width: 150,
    height: 50,
    onClick: () => alert('click!'),
  },
};

export const SkeletonWithRounded: Story = {
  args: {
    width: 350,
    height: 50,
    variant: 'rounded',
  },
};

export const SkeletonWithCircle: Story = {
  args: {
    width: 40,
    height: 40,
    variant: 'circular',
  },
};

export const SkeletonWithRectangular: Story = {
  args: {
    width: 350,
    height: 50,
    variant: 'rectangular',
  },
};
