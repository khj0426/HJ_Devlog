import type { Meta, StoryObj } from '@storybook/react';

import Tab from '@/Component/Common/Tabs/Tab';
import TabList from '@/Component/Common/Tabs/TabList';
import TabPanel from '@/Component/Common/Tabs/TabPanel';
import TabPanels from '@/Component/Common/Tabs/TabPanels';
import Tabs from '@/Component/Common/Tabs/Tabs';
const ExampleTab = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Tab First</Tab>
        <Tab>Tab Second</Tab>
        <Tab>Tab Third</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab First Content</TabPanel>
        <TabPanel>Tab Second Content</TabPanel>
        <TabPanel>Tab Third Content</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const meta: Meta<typeof Tabs> = {
  title: '텝 컴포넌트 예시',
  component: ExampleTab,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ExampleTab>;

export const BaseExampleTab: Story = {
  args: {},
};
