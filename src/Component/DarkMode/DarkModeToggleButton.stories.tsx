import { Meta } from '@storybook/react';

import ToggleDarkModeButton from '@/Component/DarkMode/ToggoeButton';

const meta: Meta = {
  title: '다크모드 토글 버튼',
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
