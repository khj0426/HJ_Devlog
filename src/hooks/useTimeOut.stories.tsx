import { Meta } from '@storybook/react';

import useTimeout from '@/hooks/useTimeout';

export const ExampleWithTimeoutHook = () => {
  const handleClick = () => alert('CLick');
  useTimeout(handleClick, 5000);
  return <button onClick={handleClick}>Click!</button>;
};

const meta: Meta = {
  title: '지정된 타이머 후 콜백을 실행하는 useTimeout훅',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
