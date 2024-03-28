import { ReactNode } from 'react';

import { Moon, Sun1 } from 'iconic-react';
import { useRecoilState } from 'recoil';

import { themeAtom } from '@/app/Providers/Recoil/globalAtom';
import Flex from '@/Component/Common/Flex/Flex';

export default function ToggleDarkModeButton({
  children,
}: {
  children?: ReactNode;
}) {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeAtom);

  const handleClickToggleImage = () => {
    if (currentTheme === 'light') {
      setCurrentTheme('dark');
      sessionStorage.setItem('theme', 'dark');
      return;
    }
    sessionStorage.setItem('theme', 'light');
    setCurrentTheme('light');
  };
  return (
    <Flex onClick={handleClickToggleImage}>
      {currentTheme === 'light' ? (
        <Moon
          tabIndex={0}
          size="32"
          variant="Bold"
          color="#FF8A65"
          style={{
            cursor: 'pointer',
          }}
        />
      ) : (
        <Sun1
          tabIndex={0}
          variant="Bold"
          size="32"
          color="#FF8A65"
          style={{
            cursor: 'pointer',
          }}
        />
      )}
    </Flex>
  );
}
