import type { Meta, StoryObj } from '@storybook/react';

import NotionResumeLoading from './loading';

const meta: Meta<typeof NotionResumeLoading> = {
  title: 'Loading/NotionResumePage',
  component: NotionResumeLoading,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
          **NotionResumeLoading** 컴포넌트는 이력서 페이지 로딩 상태를 나타내는 컴포넌트입니다.
          이 컴포넌트는 사용자가 페이지를 로드하는 동안 보여지는 스피너나 로딩 애니메이션을 포함합니다.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof NotionResumeLoading>;

export const NotionResumePageLoadingExample: Story = {
  args: {},
};
