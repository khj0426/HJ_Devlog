import { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import styled from 'styled-components';

import './index.css';
import PostSearchModalContent from '@/Component/Blog/PostSerachModal/PostSearchModalContent';
import { Input, InputBox } from '@/Component/Input';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';

const StyledInput = styled.input<{ textAlign?: string; color?: string }>`
  width: 100%;
  height: 100%;
  border: none;
  background: none;

  font-weight: 600;
  font-size: 18px;

  outline: none;
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  color: ${({ color }) => color ?? 'inherit'};
`;

const StyledPostSearchModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(1px);
  width: 100%;
  min-height: 100%;
`;

const StyledPostSearchModal = styled.div`
  width: 350px;
  min-height: 450px;
  max-height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  position: absolute;
  background-color: rgb(38, 41, 43);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  color: rgb(236, 237, 238);
  box-shadow: 0 15px 30px 0 rgba(#000, 0.25);
  border-radius: 15px;
  overflow: auto;
`;

function PostSearchModal() {
  const { modal, closeModal } = useModal('POST_SEARCH_MODAL_STATE');
  const [keyword, setKeyWord] = useState('');

  return createPortal(
    <CSSTransition
      in={modal.isOpen}
      appear
      mountOnEnter
      classNames="modal"
      timeout={300}
      onExited={closeModal}
    >
      <StyledPostSearchModalWrapper onClick={closeModal}>
        <StyledPostSearchModal>
          <p
            onClick={closeModal}
            style={{
              cursor: 'pointer',
            }}
          >
            X
          </p>
          <InputBox color="rgb(38, 41, 43)">
            <StyledInput
              onChange={(e) => setKeyWord(e.target.value)}
              autoFocus
              color="white"
            />
          </InputBox>
          <PostSearchModalContent keyword={keyword} />
        </StyledPostSearchModal>
      </StyledPostSearchModalWrapper>
    </CSSTransition>,
    document.getElementById('modal') as HTMLElement
  );
}

export default PostSearchModal;
