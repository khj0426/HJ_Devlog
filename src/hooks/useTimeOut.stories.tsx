import { Meta } from '@storybook/react';

import useTimeout from '@/hooks/useTimeout';

export const ExampleWithTimeoutHook = () => {
  const handleClick = () => alert('CLick');
  useTimeout(handleClick, 5000);
  return <button onClick={handleClick}>Click!</button>;
};

const meta: Meta = {
  title: 'hooks/useTimeOut',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
