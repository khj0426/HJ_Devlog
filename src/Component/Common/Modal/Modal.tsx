import { ComponentPropsWithRef } from 'react';

import ModalOverlay from '@/Component/Common/Modal/ModalOverlay';
import ModalPortal from '@/Component/Common/Modal/ModalPortal';
import useModal from '@/hooks/useModal';

interface ModalProps extends ComponentPropsWithRef<'div'> {
  closeAfterTransition?: boolean;
  transitionTime?: number;
  disableAutoFocus?: boolean;
  id: string;
  disabledPortal?: boolean;
  withOutOverlay?: boolean;
  onTransitionEnter?: () => void;
  onTransitionEnd?: () => void;
}

export default function Modal({
  id,
  transitionTime,
  disableAutoFocus,
  closeAfterTransition,
  children,
  disabledPortal,
  withOutOverlay,
  onTransitionEnd,
  onTransitionEnter,
  ...rest
}: ModalProps) {
  const { openModal, modal, closeModal, toggleModal } = useModal(id);

  return disabledPortal ? (
    <div {...rest}>
      <ModalOverlay
        id={modal.id}
        disabledAutoFocus={disableAutoFocus}
        closeAfterTransition={closeAfterTransition}
        transitionTime={transitionTime}
        onTransitionEnd={onTransitionEnd}
        onTransitionEnter={onTransitionEnter}
      >
        {children}
      </ModalOverlay>
    </div>
  ) : (
    <div {...rest}>
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
    </div>
  );
}
