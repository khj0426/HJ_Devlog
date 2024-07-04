import type { TabProps } from './tabProps';

import Flex from '@/Component/Common/Flex/Flex';

import { TabsContextProvider } from './TabContext';
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
