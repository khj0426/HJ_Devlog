import { Meta, Story } from '@storybook/react';
import { RecoilRoot, useRecoilState } from 'recoil';

import ToggleDarkModeButton from '@/Component/DarkMode/ToggoeButton';

type ToggleDarkModeButtonProps = React.ComponentProps<
  typeof ToggleDarkModeButton
>;

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
