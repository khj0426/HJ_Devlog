'use client';

import type { Item } from '@/@types/postItem';

import { useEffect } from 'react';

import Link from 'next/link';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { postRecommendModalClose } from '@/app/Providers/Recoil/globalAtom';
import Modal from '@/Component/Common/Modal/Modal';
import ModalCloseButton from '@/Component/Common/Modal/ModalCloseButton';
import ModalContent from '@/Component/Common/Modal/ModalContent';
import ModalFooter from '@/Component/Common/Modal/ModalFooter';
import ModalHeader from '@/Component/Common/Modal/ModalHeader';
import PostItem from '@/Component/Post/PostItem';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useModal from '@/hooks/useModal';

const StyledRecommendPostModalWrapper = styled.div`
  color: ${({ theme }) => theme.currentTheme.text};
  background-color: ${({ theme }) => theme.currentTheme.backgroundPost};
`;
export default function RecommendPostModal({
  randomPosts,
}: {
  randomPosts: Item[];
}) {
  const [close, setClose] = useRecoilState(postRecommendModalClose);
  const { modal, closeModal, openModal } = useModal('RECOMMEND_POST_MODAL');
  const { target } = useIntersectionObserver({
    threshold: 1,
    callback: () => openModal(),
  });
  useEffect(() => {
    closeModal();
  }, []);
  return (
    <>
      {!close && (
        <StyledRecommendPostModalWrapper>
          <Modal id={modal.id} disabledPortal>
            <ModalContent
              closeOutSideClick={closeModal}
              width={'300px'}
              height={'400px'}
            >
              <ModalHeader
                as="h4"
                style={{
                  color: '#495057',
                }}
              >
                🥰읽어주셔서 감사합니다
              </ModalHeader>
              <p
                style={{
                  color: '#495057',
                }}
              >
                🧡이런글은 어떠신가요?
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '16px',
                  justifyContent: 'space-between',
                }}
              >
                {randomPosts.map((post) => {
                  return (
                    <Link
                      key={post.title}
                      href={`/blog/${post.slug}`}
                      style={{
                        color: '#495057',
                      }}
                    >
                      {post.title}
                    </Link>
                  );
                })}
              </div>
              <ModalFooter>
                <ModalCloseButton
                  onClick={() => {
                    closeModal();
                    setClose(true);
                  }}
                  style={{
                    background: '#ededed',
                  }}
                />
              </ModalFooter>
            </ModalContent>
          </Modal>
        </StyledRecommendPostModalWrapper>
      )}

      <div ref={target}></div>
    </>
  );
}
