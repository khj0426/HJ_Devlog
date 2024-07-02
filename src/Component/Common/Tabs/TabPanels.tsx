import { Children, ReactNode, isValidElement } from 'react';

import { useTabs, TabPanelContext } from '@/Component/Common/Tabs/TabContext';

const TabPanels = ({ children }: { children: ReactNode }) => {
  const { selected } = useTabs();

  return (
    <div>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return null;
        return (
          <TabPanelContext.Provider
            value={{ isActive: selected === index }}
            key={index}
          >
            {child}
          </TabPanelContext.Provider>
        );
      })}
    </div>
  );
};

export default TabPanels;
