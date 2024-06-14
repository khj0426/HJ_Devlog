import type { Meta, StoryObj } from '@storybook/react';

import BigQueryForm from '@/Component/Blog/BigQueryCreateForm/BigQueryCreateForm';
const meta: Meta<typeof BigQueryForm> = {
  title: 'GA 데이터 보고서 생성 폼',
  component: BigQueryForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BigQueryForm>;

export const BasicBigQueryForm: Story = {};
