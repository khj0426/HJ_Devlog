import { Meta } from '@storybook/react';

import ToggleDarkModeButton from '@/Component/DarkMode/ToggoeButton';

const meta: Meta = {
  title: 'Component/DarkModeButton',
  component: ToggleDarkModeButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const ToggleDarkModeButtonPrimary = (args: any) => (
  <ToggleDarkModeButton {...args} />
);
