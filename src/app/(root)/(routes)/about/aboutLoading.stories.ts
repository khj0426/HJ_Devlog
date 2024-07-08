import type { Meta, StoryObj } from '@storybook/react';

import AboutPageLoading from './loading';

const meta: Meta<typeof AboutPageLoading> = {
  title: 'Loading/AboutPage',
  component: AboutPageLoading,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof AboutPageLoading>;

export const AboutPageLoadingExample: Story = {
  args: {},
};
