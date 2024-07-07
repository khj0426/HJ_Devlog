import type { Meta, StoryObj } from '@storybook/react';

import BlogHomeLoading from './HomeLoading';

const meta: Meta<typeof BlogHomeLoading> = {
  title: '메인 페이지 로딩화면',
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
