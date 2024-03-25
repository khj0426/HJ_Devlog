import { ComponentPropsWithoutRef } from 'react';

import ModalOverlay from '@/Component/Common/Modal/ModalOverlay';
import ModalPortal from '@/Component/Common/Modal/ModalPortal';
import useModal from '@/hooks/useModal';

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  closeAfterTransition?: boolean;
  transitionTime?: number;
  disableAutoFocus?: boolean;
  id: string;
  disabledPortal?: boolean;
}

export default function Modal({
  id,
  transitionTime,
  disableAutoFocus,
  closeAfterTransition,
  children,
  disabledPortal,
}: ModalProps) {
  const { openModal, modal, closeModal, toggleModal } = useModal(id);

  return disabledPortal ? (
    <ModalOverlay
      id={modal.id}
      disabledAutoFocus={disableAutoFocus}
      closeAfterTransition={closeAfterTransition}
      transitionTime={transitionTime}
    >
      {children}
    </ModalOverlay>
  ) : (
    <ModalPortal>
      <ModalOverlay
        id={modal.id}
        disabledAutoFocus={disableAutoFocus}
        closeAfterTransition={closeAfterTransition}
        transitionTime={transitionTime}
      >
        {children}
      </ModalOverlay>
    </ModalPortal>
  );
}
