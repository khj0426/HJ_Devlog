import Button from '../Common/Button';
import { useRecoilState } from 'recoil';
import { themeState } from '@/app/globalAtom';
import Image from 'next/image';
import darkModeImage from '../../../public/images/darkmode.webp';
import lightModeImage from '../../../public/images/lightmode.webp';

export default function ToggleDarkModeButton() {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);

  return (
    <Button
      style={{
        background: 'none',
      }}
      onClick={() =>
        setCurrentTheme((prevTheme) => {
          if (prevTheme === 'light') {
            return 'dark';
          }
          return 'light';
        })
      }
      icon={
        currentTheme === 'light' ? (
          <Image
            src={darkModeImage}
            alt="다크모드로 바꾸는 이미지"
            width={50}
            height={50}
          />
        ) : (
          <Image
            src={lightModeImage}
            alt="기본모드로 바꾸는 이미지"
            width={50}
            height={50}
          />
        )
      }
    />
  );
}
