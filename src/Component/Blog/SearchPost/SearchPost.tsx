import { SearchNormal } from 'iconic-react';

import PostSearchModal from '@/Component/Blog/PostSerachModal/PostSearchModal';
import useModal from '@/hooks/useModal';

export default function SearchPostButton() {
  const { modal, openModal } = useModal('POST_SEARCH_MODAL_STATE');

  return (
    <>
      <SearchNormal
        size="32"
        onClick={openModal}
        style={{
          cursor: 'pointer',
        }}
        color="#FF8A65"
      />
      {modal.isOpen && <PostSearchModal />}
    </>
  );
}
