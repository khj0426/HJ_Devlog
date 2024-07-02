import type { TabProps } from './tabs';

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface TabContextValue {
  defaultSelected?: TabProps['defaultSelected'];
  onChange: TabProps['onChange'];
  selected?: number | undefined;
  setSelected?: Dispatch<SetStateAction<number | undefined>>;
}

const TabsContext = createContext<TabContextValue>({
  defaultSelected: 0,
  onChange: () => {},
  selected: 0,
  setSelected: () => {},
});

const TabContext = createContext<{ index: number }>({
  index: 0,
});

const TabPanelContext = createContext<{
  isActive?: boolean;
  index?: number;
}>({
  index: 0,
  isActive: false,
});
export const TabsContextProvider = ({
  children,
  defaultSelected = 0,
  onChange,
}: PropsWithChildren<TabContextValue>) => {
  const [selected, setSelected] = useState<number | undefined>(defaultSelected);

  const value = useMemo(
    () => ({
      selected,
      setSelected,
      onChange,
    }),
    [selected, onChange]
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export const TabProvider = ({
  children,
  index,
}: PropsWithChildren<{ index: number }>) => {
  const value = useMemo(() => ({ index }), [index]);

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export const useTabs = () => useContext(TabsContext);
export const useTab = () => useContext(TabContext);
export const usePanel = () => useContext(TabPanelContext);
