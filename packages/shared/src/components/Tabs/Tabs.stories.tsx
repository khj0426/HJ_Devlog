import type { Meta, StoryObj } from "@storybook/react";

import Tab from "~/packages/shared/src/components/Tabs/Tab";
import TabList from "~/packages/shared/src/components/Tabs/TabList";
import TabPanel from "~/packages/shared/src/components/Tabs/TabPanel";
import TabPanels from "~/packages/shared/src/components/Tabs/TabPanels";
import Tabs from "~/packages/shared/src/components/Tabs/Tabs";
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
  title: "Component/Tabs",
  component: ExampleTab,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ExampleTab>;

export const BaseExampleTab: Story = {
  args: {},
};
