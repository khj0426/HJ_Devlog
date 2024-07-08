import { ChangeEvent } from 'react';

import { Meta } from '@storybook/react';

import { useQueryString } from '@/hooks/useQueryString';

const meta: Meta = {
  title: 'hooks/useQueryString',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Component = () => {
  const { queryObject, setQueryObject, queryString } = useQueryString();
  console.log(queryObject);

  const updateKeywords = (newKeywords: string[]) => {
    setQueryObject({ ...queryObject, keywords: newKeywords });
  };

  return (
    <div>
      <h1>Current Query String: {queryString}</h1>
      <button onClick={() => console.log(queryString)}>Click!</button>
      <button onClick={() => updateKeywords(['page=1&keywords=react'])}>
        Update Keywords
      </button>
    </div>
  );
};
