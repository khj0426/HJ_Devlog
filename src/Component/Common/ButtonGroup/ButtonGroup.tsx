import { CSSProperties, ComponentPropsWithoutRef } from 'react';

import Flex from '@/Component/Common/Flex/Flex';

interface ButtonGroupProps extends ComponentPropsWithoutRef<'div'> {
  direction?: 'column' | 'row';
  spacing?: number;
  outline?: boolean;
  fill?: CSSProperties['backgroundColor'];
}

export default function ButtonGroup({
  direction = 'row',
  spacing,
  outline = false,
  children,
  fill,
  ...rest
}: ButtonGroupProps) {
  const hasOutline = outline ? '1px solid #e5e7eb' : 'none';

  return (
    <Flex
      flexDirection={direction}
      gap={spacing}
      {...rest}
      style={{
        border: hasOutline,
        backgroundColor: fill,
        ...rest.style,
      }}
    >
      {children}
    </Flex>
  );
}
