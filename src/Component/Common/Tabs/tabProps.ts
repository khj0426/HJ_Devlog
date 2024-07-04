import { ReactNode } from 'react';
export type TabProps = {
  defaultSelected?: number;
  onChange?: (_index?: number) => void | Promise<void>;
  children: ReactNode;
};
