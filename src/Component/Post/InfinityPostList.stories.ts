import type { Meta, StoryObj } from '@storybook/react';

import InfinityPostList from '@/Component/Post/InfinityPostList';

const meta: Meta<typeof InfinityPostList> = {
  title: '무한스크롤 포스트 아이템 리스트',
  component: InfinityPostList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof InfinityPostList>;

export const DefaultPostList: Story = {
  args: {
    data: {
      pageParams: [],
      pages: [
        {
          page: 1,
          posts: [
            {
              title: '2023 7월 회고',
              excerpt: '나는 무엇을 했나!',
              date: '2023-08-07',
              slug: '김효중',
              category: '회고',
              image: '/images/postImg/reflection.jpg',
            },
            {
              title: '2023 7월 회고',
              excerpt: '나는 무엇을 했나!',
              date: '2023-08-07',
              category: '회고',
              image: '/images/postImg/reflection.jpg',
              slug: 'asdasds',
            },
            {
              title: '2023 7월 회고',
              excerpt: '나는 무엇을 했나!',
              date: '2023-08-07',
              slug: 'asdadasd',
              category: '회고',
              image: '/images/postImg/reflection.jpg',
            },
          ],
        },
        {
          page: 2,
          posts: [
            {
              title: '2023 7월 회고',
              excerpt: '나는 무엇을 했나!',
              date: '2023-08-07',
              slug: '김효중',
              category: '회고',
              image: '/images/postImg/reflection.jpg',
            },
            {
              title: '2023 7월 회고',
              excerpt: '나는 무엇을 했나!',
              date: '2023-08-07',
              category: '회고',
              image: '/images/postImg/reflection.jpg',
              slug: 'asdasds',
            },
            {
              title: '2023 7월 회고',
              excerpt: '나는 무엇을 했나!',
              date: '2023-08-07',
              slug: 'asdadasd',
              category: '회고',
              image: '/images/postImg/reflection.jpg',
            },
          ],
        },
      ],
    },
  },
};
