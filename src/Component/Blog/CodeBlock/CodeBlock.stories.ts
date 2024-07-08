import type { Meta, StoryObj } from '@storybook/react';

import CodeBlock from '@/Component/Blog/CodeBlock/CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Component/Blog/CodeBlock',
  component: CodeBlock,
  args: {
    children: 'const hello = 안녕',
    lang: 'ts',
  },
  argTypes: {
    lang: {
      description:
        '코드블록 컴포넌트입니다. js,ts,tsx,jsx,bash,json형식이 가능합니다',
      control: {
        type: 'radio',
      },
      options: ['js', 'ts', 'tsx', 'jsx', 'bash', 'json'],
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const BaseCodeBlock: Story = {
  args: {
    lang: 'ts',
    children: 'const hello = 안녕',
  },
};

export const LongCodeBlock: Story = {
  args: {
    lang: 'ts',
    children: `
      function greet(name) {
        console.log("안녕하세요, " + name + "님!");
      }
      
      function calculateSum(a, b) {
        return a + b;
      }
      
      const numbers = [1, 2, 3, 4, 5];
      const sum = calculateSum(numbers[0], numbers[1]);
    `,
  },
};

export const LongCodeBlockWithTs: Story = {
  args: {
    lang: 'ts',
    children: `
      function greet(name) {
        console.log("안녕하세요, " + name + "님!");
      }
      
      function calculateSum(a, b) {
        return a + b;
      }
      
      const numbers = [1, 2, 3, 4, 5];
      const sum = calculateSum(numbers[0], numbers[1]);
    `,
  },
};
