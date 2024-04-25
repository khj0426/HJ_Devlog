import type { Meta, StoryObj } from '@storybook/react';

import DateSelectDropDown from '@/Component/BackOffice/DateSelectDropDown/DateSelectDropDown';

const meta: Meta<typeof DateSelectDropDown> = {
  title: '날짜를 선택하는 드롭다운',
  component: DateSelectDropDown,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DateSelectDropDown>;

export const DefaultPostItem: Story = {
  args: {},
};
