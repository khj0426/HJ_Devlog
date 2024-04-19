import type { Meta, StoryObj } from '@storybook/react';

import CloseButton from '@/Component/Common/CloseButton/CloseButton';
import { Modal } from '@/Component/Common/Modal';
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
      <Modal.ModalContainer id="ExampleModal" disabledPortal>
        <Modal.ModalContent
          closeOutSideClick={closeModal}
          width={'350px'}
          height={'500px'}
        >
          <Modal.ModalCloseButton onClick={closeModal} />
          <Modal.ModalHeader as="h3">이곳은 헤더입니다.</Modal.ModalHeader>
          이곳은 컨텐츠입니다.
        </Modal.ModalContent>
      </Modal.ModalContainer>
    </div>
  );
};

export const ExampleModalWithTransition = () => {
  const { openModal, modal, closeModal } = useModal('ExampleModalSecond');

  return (
    <div>
      <button onClick={openModal}>Click</button>
      <Modal.ModalContainer
        id="ExampleModalSecond"
        disabledPortal
        transitionTime={3000}
        onClick={() => console.log(modal.id)}
        onTransitionEnd={() => console.log('나 사라짐')}
        onTransitionEnter={() => console.log('나 등장')}
        onDrag={() => console.log('드래그 시작ㅋ')}
      >
        <Modal.ModalContent
          closeOutSideClick={closeModal}
          width={'350px'}
          height={'600px'}
        >
          <Modal.ModalHeader as="h3">이곳은 헤더입니다.</Modal.ModalHeader>
          <section>
            이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다.
            이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다.
            이곳은 컨텐츠입니다. 이곳은 컨텐츠입니다.
          </section>
          <Modal.ModalFooter>
            <Modal.ModalCloseButton
              onClick={closeModal}
              style={{
                background: '#ededed',
              }}
            />
          </Modal.ModalFooter>
        </Modal.ModalContent>
      </Modal.ModalContainer>
    </div>
  );
};

export const ExampleModalWithCloseAfterTransition = () => {
  const { openModal, modal, closeModal } = useModal('ExampleModalThird');

  return (
    <div>
      <button onClick={openModal}>Click</button>
      <Modal.ModalContainer
        id="ExampleModalThird"
        disabledPortal
        transitionTime={3000}
        closeAfterTransition
        onClick={() => console.log(modal.id)}
      >
        <Modal.ModalContent
          closeOutSideClick={closeModal}
          width={'350px'}
          height={'600px'}
        >
          <Modal.ModalCloseButton onClick={closeModal} />
          <Modal.ModalHeader as="h3">이곳은 헤더입니다.</Modal.ModalHeader>
          이곳은 컨텐츠입니다.
        </Modal.ModalContent>
      </Modal.ModalContainer>
    </div>
  );
};
