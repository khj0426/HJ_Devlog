import type { Meta, StoryObj } from '@storybook/react';

import ItemList from './ItemList';

const data = [
  {
    id: 1,
    text: '항목1',
  },
  {
    id: 2,
    text: '항목2',
  },
  {
    id: 3,
    text: '항목3',
  },
];

const renderItem = (item: any) => (
  <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>{item.text}</div>
);

const meta: Meta<typeof ItemList> = {
  title: 'Component/ItemList',
  component: ItemList,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    direction: {
      description: '가로로 렌더링할건지, 세로로 렌더링할지 여부',
      defaultValue: 'column',
    },
    hasDivider: {
      defaultValue: false,
      description: '구분선이 있는지 여부',
    },
    data: {
      description: '렌더링 할 데이터 배열',
      defaultValue: data,
    },
    renderItem: {
      description: '각 데이터 항목을 어떻게 렌더링할지 정의하는 함수',
      defaultValue: renderItem,
    },
  },
};
export default meta;
type Story = StoryObj<typeof ItemList>;

export const RowItemListWithoutDivider: Story = {
  args: {
    direction: 'row',
    gap: '25px',
    justifyContent: 'center',
    alignItems: 'center',
    data,
    renderItem,
  },
};

export const ColumnItemListWithDivider: Story = {
  args: {
    direction: 'column',
    gap: '25px',
    justifyContent: 'center',
    alignItems: 'center',
    hasDivider: true,
    margin: '0 auto',
    data,
    renderItem,
  },
};

export const ColumnItemListWithOutDivider: Story = {
  args: {
    direction: 'column',
    gap: '25px',
    justifyContent: 'center',
    alignItems: 'center',
    data,
    renderItem,
  },
};

export const RowItemListWithDivider: Story = {
  args: {
    direction: 'row',
    gap: '25px',
    justifyContent: 'center',
    alignItems: 'center',
    hasDivider: true,
    data,
    renderItem,
  },
};
