import { ReactNode, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import './Modal.css';
import styled from 'styled-components';

import useModal from '@/hooks/useModal';

const StyledBackDrop = styled.div`
  z-index: 555;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 100vw;
  min-height: 100vh;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function ModalOverlay({
  id,
  children,
  disabledAutoFocus,
  closeAfterTransition,
  transitionTime,
}: {
  id: string;
  children: ReactNode;
  disabledAutoFocus?: boolean;
  closeAfterTransition?: boolean;
  transitionTime?: number;
}) {
  const { closeModal, modal } = useModal(id);

  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keyup', handleEscapeClick);

    return () => {
      window.removeEventListener('keyup', handleEscapeClick);
    };
  }, [closeModal]);

  const transitionDelay = closeAfterTransition && transitionTime;

  return (
    <>
      {transitionDelay ? (
        <CSSTransition
          in={modal.isOpen}
          appear
          unmountOnExit
          mountOnEnter
          classNames="modal"
          timeout={transitionDelay}
          onExited={closeModal}
        >
          <StyledBackDrop>
            {modal.isOpen ? <>{children}</> : null}
          </StyledBackDrop>
        </CSSTransition>
      ) : (
        <>{modal.isOpen ? <StyledBackDrop>{children}</StyledBackDrop> : null}</>
      )}
    </>
  );
}
