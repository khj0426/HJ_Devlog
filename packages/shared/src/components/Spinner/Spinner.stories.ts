import type { Meta, StoryObj } from "@storybook/react";

import Spinner from "~/packages/shared/src/components/Spinner/Spinner";
const meta: Meta<typeof Spinner> = {
  title: "Component/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {
    size: 50,
  },
};

export const RedPrimary: Story = {
  args: {
    size: 50,
    color: "red",
  },
};

export const BluePrimary: Story = {
  args: {
    size: 50,
    color: "blue",
  },
};

export const FastTimePrimary: Story = {
  args: {
    timing: 1,
  },
};

export const SlowTimePrimary: Story = {
  args: {
    timing: 5,
  },
};
