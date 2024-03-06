import { useRecoilValue } from 'recoil';

import { themeAtom } from '@/app/Providers/Recoil/globalAtom';

export default function useIsDarkMode() {
  const isDarkMode = useRecoilValue(themeAtom);

  return {
    isDarkMode: isDarkMode === 'dark' ? true : false,
  };
}
