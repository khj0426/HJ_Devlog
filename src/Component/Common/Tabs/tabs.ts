import { ReactElement, ReactNode } from 'react';

type Props = {
  label?: ReactNode;
  children?: ReactNode;
};

export type TabProps = {
  defaultSelected?: number;
  onChange?: (_index?: number) => void | Promise<void>;
  children: ReactElement<Props[]> | ReactElement<Props>;
};
