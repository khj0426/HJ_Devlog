import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonCard } from '@/Component/Common/Skeleton/Card';

const meta: Meta<typeof SkeletonCard> = {
  title: '스켈레톤 카드',
  component: SkeletonCard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonCard>;

export const BaseSkeletonCard: Story = {
  args: {
    imgSrc: 'https://source.unsplash.com/random/?seoul',
  },
};
