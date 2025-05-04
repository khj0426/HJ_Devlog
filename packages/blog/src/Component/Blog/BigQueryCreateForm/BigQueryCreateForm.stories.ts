import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BigQuery> = {
  title: "Component/Blog/BigQueryForm",
  component: BigQuery,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BigQuery>;

export const BasicBigQueryForm: Story = {};
