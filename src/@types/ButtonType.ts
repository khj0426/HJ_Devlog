import { CSSProperties, ComponentPropsWithoutRef } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonVariant =
  | 'negative'
  | 'secondary'
  | 'positive'
  | 'primary'
  | 'outlined'
  | 'transparent';

export type ButtonStylesProps = {
  variant: ButtonVariant;
  size: ButtonSize;
  isActive: boolean;
  isDisabled: boolean;
};

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  label?: React.ReactNode;
}
