import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonCard } from "./Card";

const meta: Meta<typeof SkeletonCard> = {
  title: "Component/SkeletonCard",
  component: SkeletonCard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonCard>;

export const BaseSkeletonCard: Story = {
  args: {
    imgSrc: "https://source.unsplash.com/random/?seoul",
  },
};
