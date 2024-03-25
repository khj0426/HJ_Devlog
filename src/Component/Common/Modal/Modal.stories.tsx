import type { Meta, StoryObj } from '@storybook/react';

import CloseButton from '@/Component/Common/CloseButton/CloseButton';
import Modal from '@/Component/Common/Modal/Modal';
import ModalContent from '@/Component/Common/Modal/ModalContent';
import ModalHeader from '@/Component/Common/Modal/ModalHeader';
import useModal from '@/hooks/useModal';
const meta: Meta<typeof Modal> = {
  title: '모달 컴포넌트 예시',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
export const ExampleModal = () => {
  const { openModal, modal, closeModal } = useModal('ExampleModal');

  return (
    <div>
      <button onClick={openModal}>Click</button>
      <Modal id="ExampleModal" disabledPortal>
        <ModalHeader as="h3">이곳은 헤더입니다.</ModalHeader>
        <CloseButton onClick={closeModal} />
        <ModalContent closeOutSideClick={closeModal}>
          이곳은 컨텐츠입니다.
        </ModalContent>
      </Modal>
    </div>
  );
};

export const ExampleModalWithTransition = () => {
  const { openModal, modal, closeModal } = useModal('ExampleModalSecond');

  return (
    <div>
      <button onClick={openModal}>Click</button>
      <Modal
        id="ExampleModalSecond"
        disabledPortal
        transitionTime={3000}
        closeAfterTransition
      >
        <ModalHeader as="h3">이곳은 헤더입니다.</ModalHeader>
        <CloseButton onClick={closeModal} />
        <ModalContent closeOutSideClick={closeModal}>
          이곳은 컨텐츠입니다.
        </ModalContent>
      </Modal>
    </div>
  );
};
