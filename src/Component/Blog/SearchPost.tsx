import SearchImage from '../../.././public/images/search.webp';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { postSearchModalState } from '@/app/globalAtom';

export default function SearchPostButton() {
  const [postSearchModal, setPostSearchModal] =
    useRecoilState(postSearchModalState);

  return (
    <Image
      alt="블로그 글 검색 이미지"
      width={32}
      height={32}
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      src={SearchImage}
      onClick={() => {
        setPostSearchModal(!postSearchModal);
      }}
    ></Image>
  );
}
