import type { ButtonProps } from '@/@types/ButtonType';

import type {
  CSSProperties,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

export type CardElement = 'a' | 'article' | 'button' | 'div' | 'fieldset';

export type BaseCardDragHandleProps = {
  withDragHandle?: boolean;
  isDragging?: boolean;

  dragHandleRender?: (props: {
    idDragging?: boolean;
    drag?: React.ReactElement;
  }) => ReactElement;
};

export type BaseCardProps = {
  className?: string;
  style?: CSSProperties;
  actions?: ReactNode[];
  as?: CardElement;
  ariaLabel?: string;
  badge?: ReactElement;
  customActionButton?: ReactElement;
  href?: string;
  children?: ReactNode;
  header?: ReactElement;
  icon?: ReactElement;
  actionButtonProps?: Partial<ButtonProps>;
  onClick?: MouseEventHandler<HTMLElement>;
  isHovered?: boolean;
  isSelected?: boolean;
  title?: string;
  type?: string;
  isLoading?: boolean;
};
