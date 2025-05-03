import type { Meta, StoryObj } from '@storybook/react';

import CategoryLoading from './loading';

const meta: Meta<typeof CategoryLoading> = {
  title: 'Loading/CategoryPage',
  component: CategoryLoading,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof CategoryLoading>;

export const AboutPageLoadingExample: Story = {
  args: {},
};
