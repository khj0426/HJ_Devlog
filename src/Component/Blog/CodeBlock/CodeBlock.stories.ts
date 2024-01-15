import type { Meta, StoryObj } from '@storybook/react';

import CodeBlock from '@/Component/Blog/CodeBlock/CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: '코드블록 컴포넌트',
  component: CodeBlock,
  args: {
    children: 'const hello = 안녕',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const BaseCodeBlock: Story = {
  args: {
    children: 'const hello = 안녕',
  },
};

export const LongCodeBlock: Story = {
  args: {
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
