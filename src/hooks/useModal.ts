import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import { modalSelectorFamily } from '@/app/Providers/Recoil/globalAtom';

const useModal = (modalId: string) => {
  const [modal, setModal] = useRecoilState(modalSelectorFamily(modalId));

  const openModal = useCallback(() => {
    setModal(({ id, title }) => {
      return {
        isOpen: true,
        id,
        title,
      };
    });
  }, [setModal]);

  const closeModal = useCallback(() => {
    setModal(({ id, title }) => {
      return {
        isOpen: false,
        id,
        title,
      };
    });
  }, [setModal]);

  const toggleModal = useCallback(() => {
    if (modal.isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [closeModal, openModal, modal.isOpen]);

  return {
    modal,
    setModal,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
