import Image from 'next/image';
import { useRecoilState } from 'recoil';

import { postSearchModalState } from '@/app/Providers/Recoil/globalAtom';

import PostSearchModal from './PostSearchModal';

// eslint-disable-next-line import/no-unresolved
import SearchPostImage from '/public/images/search.webp';

export default function SearchPostButton() {
  const [isModalOpen, setModalOpen] = useRecoilState(postSearchModalState);

  const togglePostSearchModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Image
        alt="블로그 글 검색 이미지"
        width={32}
        placeholder="blur"
        height={32}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        src={SearchPostImage}
        onClick={togglePostSearchModal}
      ></Image>
      {isModalOpen && <PostSearchModal onCloseModal={togglePostSearchModal} />}
    </>
  );
}
