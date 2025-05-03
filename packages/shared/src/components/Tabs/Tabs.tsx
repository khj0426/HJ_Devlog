import type { TabProps } from "./tabProps";

import Flex from "~/packages/shared/src/components/Flex/Flex";

import { TabsContextProvider } from "./TabContext";
const Tabs = (props: TabProps) => {
  return (
    <TabsContextProvider
      defaultSelected={props.defaultSelected}
      onChange={props.onChange}
    >
      <Flex flexDirection="column">{props.children}</Flex>
    </TabsContextProvider>
  );
};

export default Tabs;
