import type { Meta, StoryObj } from "@storybook/react";

import ViewCountButton from "./ViewCountButton";

const meta: Meta<typeof ViewCountButton> = {
  title: "Component/Blog/ViewCountButton",
  component: ViewCountButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    viewCount: 5,
  },
  argTypes: {
    viewCount: {
      description: "방문한 사용자의 조회 수 ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ViewCountButton>;

export const BasicViewCountButton: Story = {
  args: {
    viewCount: 100,
  },
};
