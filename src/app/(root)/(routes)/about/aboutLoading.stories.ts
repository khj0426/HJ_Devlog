import type { Meta, StoryObj } from '@storybook/react';

import AboutPageLoading from './loading'

const meta: Meta<typeof AboutPageLoading> = {
  title: 'About 페이지 로딩 시 컴포넌트',
  component: AboutPageLoading,
  
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof AboutPageLoading>;

export const AboutPageLoadingExample: Story = {
  args: {
  },
};

