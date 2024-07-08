import type { Meta, StoryObj } from '@storybook/react';

import Calendar from '@/Component/Common/Calendar/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Component/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const BaseCalendar: Story = {};
