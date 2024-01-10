import Image from 'next/image';
import { useRecoilState } from 'recoil';

import { postSearchModalAtom } from '@/app/Providers/Recoil/globalAtom';

import PostSearchModal from './PostSerachModal/PostSearchModal';

// eslint-disable-next-line import/no-unresolved
import SearchPostImage from '/public/images/search.webp';

export default function SearchPostButton() {
  const [isModalOpen, setModalOpen] = useRecoilState(postSearchModalAtom);

  const togglePostSearchModal = () => {
    setModalOpen(!isModalOpen);
  };

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
        onClick={togglePostSearchModal}
      />
      {isModalOpen && <PostSearchModal onCloseModal={togglePostSearchModal} />}
    </>
  );
}
