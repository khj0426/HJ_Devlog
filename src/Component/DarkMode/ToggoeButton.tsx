import { useRecoilState } from 'recoil';
import { themeState } from '@/app/globalAtom';
import Image from 'next/image';
import darkModeImage from '../../../public/images/darkmode.webp';
import lightModeImage from '../../../public/images/lightmode.webp';

export default function ToggleDarkModeButton() {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);

  return (
    <>
      {currentTheme === 'light' && (
        <Image
          style={{
            cursor: 'pointer',
          }}
          src={darkModeImage}
          alt="다크모드로 바꾸는 이미지"
          width={50}
          height={50}
          priority
          onClick={() => setCurrentTheme('dark')}
        />
      )}

      {currentTheme === 'dark' && (
        <Image
          style={{
            cursor: 'pointer',
          }}
          src={lightModeImage}
          alt="기본모드로 바꾸는 이미지"
          width={50}
          height={50}
          priority
          onClick={() => setCurrentTheme('light')}
        />
      )}
    </>
  );
}
