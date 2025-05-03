import type { Meta, StoryObj } from "@storybook/react";

import BigQueryForm from "~/packages/blog/src/Component/Blog/BigQueryCreateForm/BigQueryCreateForm";
const meta: Meta<typeof BigQueryForm> = {
  title: "Component/Blog/BigQueryForm",
  component: BigQueryForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BigQueryForm>;

export const BasicBigQueryForm: Story = {};
