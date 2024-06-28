import { CSSProperties } from 'react';

export interface Tab {
  label: React.ReactNode;
  children: React.ReactNode;
}

export interface TabProps {
  defaultSelected?: number;
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
  onChange?: (_idx?: number) => void | Promise<void>;
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
}
