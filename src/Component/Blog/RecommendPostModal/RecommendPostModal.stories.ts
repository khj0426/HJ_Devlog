import type { Meta, StoryObj } from '@storybook/react';

import RecommentPostModal from './RecommendPostModal';

const meta: Meta<typeof RecommentPostModal> = {
  title: '랜덤 글 추천 모달',
  component: RecommentPostModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RecommentPostModal>;

export const BasicRecommentPostModal: Story = {
  args: {},
};
