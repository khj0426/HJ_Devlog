import type { Meta, StoryObj } from '@storybook/react';

import BackOfficeLoading from './loading';

const meta: Meta<typeof BackOfficeLoading> = {
  title: '백오피스 페이지 로딩화면',
  component: BackOfficeLoading,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'Desktop Extra Large',
    },
  },
};
export default meta;

export const BackOfficePageLoadingExample = () => {
  return <BackOfficeLoading></BackOfficeLoading>;
};
