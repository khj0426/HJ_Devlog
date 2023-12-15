import Image from 'next/image';
import { useRecoilState } from 'recoil';

import { themeState } from '@/app/globalAtom';

import darkModeImage from '../../../public/images/darkmode.webp';
import lightModeImage from '../../../public/images/lightmode.webp';

export default function ToggleDarkModeButton() {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);

  return (
    <>
      <Image
        style={{
          cursor: 'pointer',
          display: currentTheme === 'light' ? 'block' : 'none',
        }}
        src={darkModeImage}
        alt="다크모드로 바꾸는 이미지"
        width={50}
        height={50}
        priority
        onClick={() => setCurrentTheme('dark')}
      />

      <Image
        style={{
          cursor: 'pointer',
          display: currentTheme === 'dark' ? 'block' : 'none',
        }}
        src={lightModeImage}
        alt="기본모드로 바꾸는 이미지"
        width={50}
        height={50}
        priority
        onClick={() => setCurrentTheme('light')}
      />
    </>
  );
}
