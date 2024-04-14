import { ComponentPropsWithoutRef, CSSProperties, useRef } from 'react';

import CloseButton from '@/Component/Common/CloseButton/CloseButton';

interface ModalCloseButtonProps extends ComponentPropsWithoutRef<'button'> {
  fill?: CSSProperties['color'];
}

export default function ModalCloseButton({
  onClick,
  fill,
  ...rest
}: ModalCloseButtonProps) {
  const modalCloseButtonRef = useRef<null | HTMLButtonElement>(null);
  return (
    <CloseButton
      ref={modalCloseButtonRef}
      darkMode
      onClick={onClick}
      fill={fill ?? '#425262'}
      style={{ ...rest.style }}
    />
  );
}
