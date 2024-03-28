import { ReactNode } from 'react';

import { SearchNormal } from 'iconic-react';

import PostSearchModal from '@/Component/Blog/PostSerachModal/PostSearchModal';
import useModal from '@/hooks/useModal';

export default function SearchPostButton({
  children,
}: {
  children?: ReactNode;
}) {
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
      {children}
      {modal.isOpen && <PostSearchModal />}
    </>
  );
}
