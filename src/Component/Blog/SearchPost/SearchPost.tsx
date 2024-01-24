import Image from 'next/image';

import PostSearchModal from '@/Component/Blog/PostSerachModal/PostSearchModal';
import useModal from '@/hooks/useModal';

// eslint-disable-next-line import/no-unresolved
import SearchPostImage from '/public/images/search.webp';

export default function SearchPostButton() {
  const { modal, toggleModal } = useModal('POST_SEARCH_MODAL_STATE');

  return (
    <>
      <Image
        alt="블로그 글 검색 이미지"
        width={28}
        placeholder="blur"
        height={28}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        src={SearchPostImage}
        onClick={toggleModal}
      />
      {modal.isOpen && (
        <PostSearchModal isOpen={modal.isOpen} onCloseModal={toggleModal} />
      )}
    </>
  );
}
