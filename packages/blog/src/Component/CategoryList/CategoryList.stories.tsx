import type { Meta, StoryObj } from '@storybook/react';

import CategoryList from '@/Component/CategoryList/CategoryList';

const meta: Meta<typeof CategoryList> = {
  title: 'Component/Blog/CategoryList',
  component: CategoryList,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof CategoryList>;

export const BaseCategoryList: Story = {
  args: {
    category: [
      {
        category: 'js',
        categoryCount: '1',
      },
      {
        category: 'react',
        categoryCount: '2',
      },
    ],
  },
};
