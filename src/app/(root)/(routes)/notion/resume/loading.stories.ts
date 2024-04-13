import type { Meta, StoryObj } from '@storybook/react';

import NotionResumeLoading from './loading';

const meta: Meta<typeof NotionResumeLoading> = {
  title: '노션 이력서 로딩 페이지',
  component: NotionResumeLoading,

  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof NotionResumeLoading>;

export const NotionResumePageLoadingExample: Story = {
  args: {},
};
