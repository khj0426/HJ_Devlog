import { CSSProperties, ComponentPropsWithRef } from 'react';

interface ModalHeaderProps
  extends ComponentPropsWithRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function ModalHeader({
  width,
  height,
  as: Tag,
  ...rest
}: ModalHeaderProps) {
  const style = { width, height, ...rest.style };
  return (
    <Tag {...rest} style={style} tabIndex={0}>
      {rest.children}
    </Tag>
  );
}
