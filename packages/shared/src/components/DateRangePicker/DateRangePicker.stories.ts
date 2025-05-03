import type { Meta, StoryObj } from "@storybook/react";

import DateRangePicker from "~/packages/shared/src/components/DateRangePicker/DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Component/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const BaseDateRangePickerCalendar: Story = {};
