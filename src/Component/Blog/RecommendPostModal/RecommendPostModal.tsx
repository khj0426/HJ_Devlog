'use client';

import type { Item } from '@/@types/postItem';

import Link from 'next/link';

import Modal from '@/Component/Common/Modal/Modal';
import ModalCloseButton from '@/Component/Common/Modal/ModalCloseButton';
import ModalContent from '@/Component/Common/Modal/ModalContent';
import ModalFooter from '@/Component/Common/Modal/ModalFooter';
import ModalHeader from '@/Component/Common/Modal/ModalHeader';
import PostItem from '@/Component/Post/PostItem';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useModal from '@/hooks/useModal';

export default function RecommendPostModal({
  randomPosts,
}: {
  randomPosts: Item[];
}) {
  const { modal, closeModal, setModal, openModal } = useModal(
    'RECOMMEND_POST_MODAL'
  );
  const { target } = useIntersectionObserver({
    threshold: 1,
    callback: () => openModal(),
  });
  return (
    <>
      <Modal id={modal.id} disabledPortal>
        <ModalContent
          closeOutSideClick={closeModal}
          width={'300px'}
          height={'400px'}
        >
          <ModalHeader as="h4">🥰읽어주셔서 감사합니다</ModalHeader>
          🧡이런글은 어떠신가요?
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
                <Link key={post.title} href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              );
            })}
          </div>
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
      <div ref={target}></div>
    </>
  );
}
