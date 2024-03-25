import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styled from 'styled-components';

import './index.css';
import CloseButton from '@/Component/Common/CloseButton/CloseButton';
import ModalPortal from '@/Component/Common/Modal/ModalPortal';
import { Input, InputBox } from '@/Component/Input';
import PostList from '@/Component/Post/PostList';
import useSearchPostQuery from '@/hooks/queries/useSearchPostQuery';
import useClickAway from '@/hooks/useClickAway';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';

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
  max-height: 450px;
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
  const {
    onChange,
    value: keyword,
    error,
  } = useInput('', (e) => e.target.value.length <= 150);
  const { modal, closeModal } = useModal('POST_SEARCH_MODAL_STATE');

  const modalRef = useRef(null);
  const { data: posts } = useSearchPostQuery(keyword);
  useClickAway(modalRef, closeModal);

  return (
    <ModalPortal>
      <CSSTransition
        in={modal.isOpen}
        appear
        mountOnEnter
        classNames="modal"
        timeout={300}
        onExited={closeModal}
      >
        <StyledPostSearchModalWrapper>
          <div ref={modalRef}>
            <StyledPostSearchModal>
              <CloseButton color="white" onClick={closeModal} />
              <InputBox color="rgb(38, 41, 43)">
                <Input autoFocus onChange={onChange} />
              </InputBox>
              {error && (
                <p style={{ color: '#db4455' }}>
                  최대 150자까지 입력 가능합니다!
                </p>
              )}
              <PostList posts={posts} />
            </StyledPostSearchModal>
          </div>
        </StyledPostSearchModalWrapper>
      </CSSTransition>
    </ModalPortal>
  );
}

export default PostSearchModal;
