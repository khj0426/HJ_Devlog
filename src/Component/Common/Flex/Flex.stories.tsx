import type { Meta, Story } from '@storybook/react';

import Divider from '@/Component/Common/Divider/Divider';
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

export const FlexWithDivider = () => {
  return (
    <Flex justifyContent="center" alignItems="center" gap={'20px'}>
      {Array.from({ length: 15 }).map((_, index) => (
        <>
          <span>{index}</span>
          <Divider
            key={index}
            orientation="vertical"
            length="20px" // 글자 크기를 가정하여 길이 조정
            thickness="2px"
            margin="10px 0"
          />
        </>
      ))}
    </Flex>
  );
};
