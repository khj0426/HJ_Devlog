import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Component/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
};
export const SecondaryButton: Story = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
};

export const PositiveButton: Story = {
  args: {
    variant: 'positive',
    label: 'Button',
  },
};

export const NegativeButton: Story = {
  args: {
    variant: 'negative',
    label: 'Button',
  },
};

export const TransparentButton: Story = {
  args: {
    variant: 'transparent',
    label: 'Button',
  },
};

export const SmallButton: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const MediumButton: Story = {
  args: {
    size: 'medium',
    label: 'Button',
  },
};

export const LargetButton: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const DisabledButton: Story = {
  args: {
    size: 'small',
    isDisabled: true,
  },
};
