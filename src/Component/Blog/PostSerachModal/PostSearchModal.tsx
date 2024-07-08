'use client';

import styled from 'styled-components';

import './index.css';

import { Modal } from '@/Component/Common/Modal';
import { Input, InputBox } from '@/Component/Input';
import PostList from '@/Component/Post/PostList';
import useSearchPostQuery from '@/hooks/queries/useSearchPostQuery';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';
import { useQueryString } from '@/hooks/useQueryString';

const StyledPostSearchModal = styled.div`
  width: 350px;
  min-height: 450px;
  max-height: 450px;
  font-size: 14px;
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
  overflow: hidden;
`;

function PostSearchModal() {
  const { onChange, error } = useInput('', (e) => e.target.value.length <= 150);
  const { modal, closeModal } = useModal('POST_SEARCH_MODAL_STATE');
  const { setQueryObject, queryObject } = useQueryString();
  const { data: posts } = useSearchPostQuery(queryObject['keyword']);

  return (
    <Modal.ModalContainer id={modal.id}>
      <Modal.ModalContent
        width={'350px'}
        height={'500px'}
        closeOutSideClick={closeModal}
        backgroundColor="rgb(38,41,43)"
      >
        <StyledPostSearchModal>
          <Modal.ModalCloseButton onClick={closeModal} />
          <InputBox color="rgb(38, 41, 43)">
            <Input
              autoFocus
              onChange={(e) => {
                onChange(e);
                setQueryObject({ keyword: e.target.value });
              }}
            />
          </InputBox>
          {error && (
            <p style={{ color: '#db4455' }}>최대 150자까지 입력 가능합니다!</p>
          )}
          <PostList posts={posts} />
        </StyledPostSearchModal>
      </Modal.ModalContent>
    </Modal.ModalContainer>
  );
}

export default PostSearchModal;
