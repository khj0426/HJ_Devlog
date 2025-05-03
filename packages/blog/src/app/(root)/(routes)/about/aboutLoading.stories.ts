import type { Meta, StoryObj } from '@storybook/react';

import AboutPageLoading from './loading';

const meta: Meta<typeof AboutPageLoading> = {
  title: 'Loading/AboutPage',
  component: AboutPageLoading,
  parameters: {
    layout: 'fullscreen',
    componentSubTitle: 'About페이지에 진입 전 표시되는 컴포넌트입니다.',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AboutPageLoading>;

export const AboutPageLoadingExample: Story = {
  args: {},
};
