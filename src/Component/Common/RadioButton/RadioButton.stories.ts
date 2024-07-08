import type { Meta, StoryObj } from '@storybook/react';

import RadioButton from '@/Component/Common/RadioButton/RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Component/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    value: {
      defaultValue: '라디오버튼',
      description: '라디오버튼에 들어갈 값입니다. 숫자나 문자열이 들어갑니다.',
      control: {
        type: 'text',
      },
    },
    colorScheme: {
      description: '라디오 버튼의 색상 스킴입니다.',
      control: {
        type: 'color',
      },
    },
    buttonSize: {
      description: '라디오 버튼의 크기를 설정합니다.',
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
    },
    isDisabled: {
      description: '라디오 버튼을 비활성화할지 여부입니다.',
      control: {
        type: 'boolean',
      },
    },
    isInValid: {
      description: '라디오 버튼이 유효한지 여부를 나타냅니다.',
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const BaseRadioButton: Story = {};
