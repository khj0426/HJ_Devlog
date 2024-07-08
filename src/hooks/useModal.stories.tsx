import { uuid4 } from '@sentry/utils';
import { Meta } from '@storybook/react';

import useModal from '@/hooks/useModal';

const meta: Meta = {
  title: 'hooks/useModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const SimpleModal = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? <div>{uuid4()}</div> : <div></div>;
};
export const ModalWithCustomHook = () => {
  const ModalWrapper = () => {
    const { modal: firstModal, toggleModal: toggleFirstModal } =
      useModal('firstModal');
    const { modal: secondModal, toggleModal: toggleSecondModal } =
      useModal('secondModal');
    const { modal: thirdModal, toggleModal: toggleThirdModal } =
      useModal('thirdModal');

    return (
      <div>
        <SimpleModal isOpen={firstModal.isOpen} />
        <SimpleModal isOpen={secondModal.isOpen} />
        <SimpleModal isOpen={thirdModal.isOpen} />
        <button type="button" onClick={toggleFirstModal}>
          firstModal!
        </button>
        <button onClick={toggleSecondModal}>secondModal!</button>
        <button onClick={toggleThirdModal}>thirdModal!</button>
      </div>
    );
  };

  return <ModalWrapper />;
};
