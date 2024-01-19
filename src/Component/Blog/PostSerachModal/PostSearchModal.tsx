import { ChangeEvent, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Link from 'next/link';
import styled from 'styled-components';

import Spinner from '@/Component/Common/Spinner/Spinner';
import useSearchPostQuery from '@/hooks/queries/useSearchPostQuery';

import './index.css';
const StyledPostSearchModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(1px);
  width: 100%;
  height: 100%;
`;

const StyledPostSearchInput = styled.input`
  padding: 14px 24px;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: inherit;
  color: rgb(255, 255, 255);
  font-family: inherit;
`;

const StyledPostSearchModal = styled.div`
  width: 350px;
  min-height: 450px;
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

export default function PostSearchModal({
  onCloseModal,
  isOpen,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
}) {
  const [querySearch, setQuerySearch] = useState<string>('');
  const { data: posts, isFetching } = useSearchPostQuery(querySearch);

  const handleChangeQuerySearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      return;
    }

    setQuerySearch(e.target.value);
  };

  return (
    <CSSTransition
      in={isOpen}
      appear
      mountOnEnter
      classNames="modal"
      timeout={300}
      onExited={onCloseModal}
    >
      <StyledPostSearchModalWrapper onClick={onCloseModal} key={'modal'}>
        <StyledPostSearchModal onClick={(e) => e.stopPropagation()}>
          <p
            onClick={onCloseModal}
            style={{
              cursor: 'pointer',
            }}
          >
            X
          </p>
          <StyledPostSearchInput
            autoFocus
            placeholder="검색할 내용을 입력해주세요."
            onChange={handleChangeQuerySearch}
          />
          {isFetching && <Spinner timing={1} />}
          {!isFetching &&
            posts &&
            posts?.map((post) => (
              <Link
                key={post.title}
                href={`/blog/${post.slug}`}
                onClick={() => onCloseModal()}
                style={{
                  color: 'inherit',
                }}
              >
                {post.title}
              </Link>
            ))}
        </StyledPostSearchModal>
      </StyledPostSearchModalWrapper>
    </CSSTransition>
  );
}