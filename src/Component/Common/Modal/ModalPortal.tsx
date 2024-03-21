import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
export default function ModalPortal({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  if (typeof window !== 'undefined') {
    return createPortal(
      children,
      document.getElementById('modal') as HTMLElement
    );
  }
}
