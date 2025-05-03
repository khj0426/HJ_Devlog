import type { Meta, StoryObj } from "@storybook/react";

import Example from "~/packages/shared/src/components/Toast/Example";

const meta: Meta<typeof Example> = {
  title: "Component/Toast",
  component: Example,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const BaseToast: Story = {};
