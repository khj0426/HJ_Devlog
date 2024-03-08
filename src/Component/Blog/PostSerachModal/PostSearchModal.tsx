import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Link from 'next/link';
import styled from 'styled-components';
import './index.css';

import Spinner from '@/Component/Common/Spinner/Spinner';
import { Input, InputBox } from '@/Component/Input';
import useSearchPostQuery from '@/hooks/queries/useSearchPostQuery';
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

export default function PostSearchModal() {
  const { modal, closeModal } = useModal('POST_SEARCH_MODAL_STATE');

  const postSearchInput = useInput('', (e) => e.target.value.length < 150);

  const { data: posts, isFetching } = useSearchPostQuery(postSearchInput.value);

  return createPortal(
    <CSSTransition
      in={modal.isOpen}
      appear
      mountOnEnter
      classNames="modal"
      timeout={300}
      onExited={closeModal}
    >
      <StyledPostSearchModalWrapper onClick={closeModal} key={'modal'}>
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
            <Input {...postSearchInput} autoFocus color="white" />
          </InputBox>
          {postSearchInput.error && <p>🗯 최대 150자까지 입력해주세요</p>}

          {isFetching ? (
            <Spinner timing={1} />
          ) : (
            posts?.map((post) => (
              <Link
                key={post.title}
                href={`/blog/${post.slug}`}
                onClick={() => closeModal()}
                style={{
                  color: 'inherit',
                }}
              >
                {post.title}
              </Link>
            ))
          )}
        </StyledPostSearchModal>
      </StyledPostSearchModalWrapper>
    </CSSTransition>,
    document.getElementById('modal') as HTMLElement
  );
}
