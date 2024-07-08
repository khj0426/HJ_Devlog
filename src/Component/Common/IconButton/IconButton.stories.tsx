import { Meta, StoryObj } from '@storybook/react';
import { EmojiHappy } from 'iconic-react';

import IconButton from '@/Component/Common/IconButton/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Component/IconButton',
  component: IconButton,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const DefaultIconButton: StoryObj<typeof IconButton> = {
  args: {
    label: 'Happy',
    icon: <EmojiHappy />,
  },
};

export const PrimaryIconButton: StoryObj<typeof IconButton> = {
  args: {
    label: 'Happy',
    variant: 'primary',
    icon: <EmojiHappy />,
  },
};

export const PositiveIconButton: StoryObj<typeof IconButton> = {
  args: {
    label: 'Happy',
    variant: 'positive',
    icon: <EmojiHappy />,
  },
};

export const SecondaryIconButton: StoryObj<typeof IconButton> = {
  args: {
    label: 'Happy',
    variant: 'secondary',
    icon: <EmojiHappy />,
  },
};
