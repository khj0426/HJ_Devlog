import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonImage } from '@/Component/Common/Skeleton/Image';

const meta: Meta<typeof SkeletonImage> = {
  title: 'Component/SkeletonImage',
  component: SkeletonImage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonImage>;

export const BaseSkeletonImage: Story = {
  args: {
    width: 350,
    height: 350,
    src: 'https://source.unsplash.com/random/?seoul',
    style: {
      objectFit: 'cover',
    },
    alt: '랜덤 이미지',
    onClick: () => console.log('이미지클릭!'),
  },
};

export const SmallSkeletonImage: Story = {
  args: {
    width: 150,
    height: 150,
    src: 'https://source.unsplash.com/random/?seoul',
    style: {
      objectFit: 'cover',
    },
    alt: '랜덤 이미지',
    onClick: () => console.log('작은 이미지클릭!'),
  },
};
