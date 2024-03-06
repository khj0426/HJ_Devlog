import type { Meta, Story } from '@storybook/react';

import Flex from '@/Component/Common/Flex/Flex';

export default {
  title: 'Flex 컴포넌트',
  component: Flex,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => (
  <Flex {...args}>
    <div>a</div>
    <div>b</div>
  </Flex>
);

export const BaseFlex = Template.bind({});

export const RowFlex = Template.bind({});
RowFlex.args = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  width: '100px',
  height: '100px',
};

export const ColumnFlex = Template.bind({});
ColumnFlex.args = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '10px',
  width: '100px',
  height: '100px',
};

export const JustifySpaceBetweenFlex = Template.bind({});
JustifySpaceBetweenFlex.args = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  width: '100px',
  height: '100px',
};

export const AlignItemsFlexEndFlex = Template.bind({});
AlignItemsFlexEndFlex.args = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  gap: '10px',
  width: '100px',
  height: '100px',
};
