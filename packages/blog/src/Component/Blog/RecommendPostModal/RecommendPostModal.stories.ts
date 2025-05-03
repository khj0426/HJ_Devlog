import type { Meta, StoryObj } from '@storybook/react';

import RecommentPostModal from './RecommendPostModal';

const meta: Meta<typeof RecommentPostModal> = {
  title: 'Component/Blog/RecommendModal',
  component: RecommentPostModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    randomPosts: [
      {
        title: '2023 7월 회고',
        excerpt: '나는 무엇을 했나!',
        date: '2023-08-07',
        author: '김효중',
        category: '회고',
        image: '/images/postImg/reflection.jpg',
        content: '내용내용',
      },
      {
        title: '2023 123월 회고',
        excerpt: '나는 무엇을 했나!',
        date: '2023-08-07',
        author: '김효중',
        category: '회고',
        image: '/images/postImg/reflection.jpg',
        content: '내용내용',
      },
      {
        title: '2023 123월 회고',
        excerpt: '나는 무엇을 했나!',
        date: '2023-08-07',
        author: '김효중',
        category: '회고',
        image: '/images/postImg/reflection.jpg',
        content: '내용내용',
      },
      {
        title: '2023 1월 회고',
        excerpt: '나는 무엇을 했나!',
        date: '2023-08-07',
        author: '김효중',
        category: '회고',
        image: '/images/postImg/reflection.jpg',
        content: '내용내용',
      },
      {
        title: '2023 2월 회고',
        excerpt: '나는 무엇을 했나!',
        date: '2023-08-07',
        author: '김효중',
        category: '회고',
        image: '/images/postImg/reflection.jpg',
        content: '내용내용',
      },
    ],
  },
  argTypes: {
    randomPosts: {
      description: '랜덤한 글의 목록이 필요합니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecommentPostModal>;

export const BasicRecommentPostModal: Story = {
  args: {},
};
