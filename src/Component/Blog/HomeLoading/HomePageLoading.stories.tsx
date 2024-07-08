import type { Meta, StoryObj } from '@storybook/react';

import BlogHomeLoading from './HomeLoading';

const meta: Meta<typeof BlogHomeLoading> = {
  title: 'Loading/HomePage',
  component: BlogHomeLoading,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'Desktop Extra Large',
    },
  },
};
export default meta;

export const HomePageLoadingExample = () => {
  return (
    <main>
      <BlogHomeLoading />
    </main>
  );
};
