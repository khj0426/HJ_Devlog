import { ActionButton } from '@seed-design/react';
import { Moon, Sun1 } from 'iconic-react';
import { useRecoilState } from 'recoil';

import { themeAtom } from '@/app/Providers/Recoil/globalAtom';

export default function ToggleDarkModeButton() {
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
    <ActionButton
      variant="ghost"
      size="small"
      onClick={handleClickToggleImage}
      aria-label={currentTheme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
    >
      {currentTheme === 'light' ? (
        <Moon
          size="22"
          variant="Bold"
          color="currentColor"
        />
      ) : (
        <Sun1
          variant="Bold"
          size="22"
          color="currentColor"
        />
      )}
      <span style={{ marginLeft: 6 }}>테마</span>
    </ActionButton>
  );
}
