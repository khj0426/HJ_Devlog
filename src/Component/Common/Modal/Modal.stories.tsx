import type { Meta, StoryObj } from '@storybook/react';

import CloseButton from '@/Component/Common/CloseButton/CloseButton';
import Modal from '@/Component/Common/Modal/Modal';
import ModalCloseButton from '@/Component/Common/Modal/ModalCloseButton';
import ModalContent from '@/Component/Common/Modal/ModalContent';
import ModalFooter from '@/Component/Common/Modal/ModalFooter';
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
        <ModalContent
          closeOutSideClick={closeModal}
          width={'350px'}
          height={'500px'}
        >
          <ModalCloseButton onClick={closeModal} />
          <ModalHeader as="h3">이곳은 헤더입니다.</ModalHeader>
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
        onClick={() => console.log(modal.id)}
      >
        <ModalContent
          closeOutSideClick={closeModal}
          width={'350px'}
          height={'600px'}
        >
          <ModalHeader as="h3">이곳은 헤더입니다.</ModalHeader>
          <section>
            이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다.
            이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다.
            이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다.
          </section>
          <ModalFooter>
            <ModalCloseButton
              onClick={closeModal}
              style={{
                background: '#ededed',
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export const ExampleModalWithCloseAfterTransition = () => {
  const { openModal, modal, closeModal } = useModal('ExampleModalThird');

  return (
    <div>
      <button onClick={openModal}>Click</button>
      <Modal
        id="ExampleModalThird"
        disabledPortal
        transitionTime={3000}
        closeAfterTransition
        onClick={() => console.log(modal.id)}
      >
        <ModalContent
          closeOutSideClick={closeModal}
          width={'350px'}
          height={'600px'}
        >
          <ModalCloseButton onClick={closeModal} />
          <ModalHeader as="h3">이곳은 헤더입니다.</ModalHeader>
          이곳은 컨텐츠입니다.
        </ModalContent>
      </Modal>
    </div>
  );
};
