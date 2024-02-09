import type { Meta, StoryObj } from '@storybook/react';

import PostItem from '@/Component/Post/PostItem';

const meta: Meta<typeof PostItem> = {
  title: '포스트 아이템',
  component: PostItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PostItem>;

export const DefaultPostItem: Story = {
  args: {
    post:{
        title: '2023 7월 회고',
        excerpt: '나는 무엇을 했나!',
        date: '2023-08-07',
        author: '김효중',
        category: '회고',
        image: '/images/postImg/reflection.jpg',
        content: '내용내용'
    }
  },
};

