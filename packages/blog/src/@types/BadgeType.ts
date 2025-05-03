import { ComponentPropsWithoutRef } from 'react';

export type BadgeSize = 'default' | 'small';

export type BadgeVariant =
  | 'negative'
  | 'positive'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'primary-filled';

export interface BadgeProps extends ComponentPropsWithoutRef<'button'> {
  size?: BadgeSize;
  variant?: BadgeVariant;
}
