import { ReactNode, useEffect } from 'react';

import styled from 'styled-components';

import useModal from '@/hooks/useModal';

const StyledBackDrop = styled.div`
  z-index: 555;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function ModalOverlay({
  id,
  children,
  isOpen,
}: {
  id: string;
  children: ReactNode;
  isOpen: boolean;
}) {
  const { closeModal } = useModal(id);
  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    const handleBackdropClick = (event: MouseEvent) => {
      event.stopPropagation();
      closeModal();
    };
    window.addEventListener('keyup', handleEscapeClick);
    window.addEventListener('click', handleBackdropClick);
    return () => {
      window.removeEventListener('keyup', handleEscapeClick);
      window.removeEventListener('click', handleBackdropClick);
    };
  }, [closeModal]);

  return isOpen ? <StyledBackDrop>{children}</StyledBackDrop> : null;
}
