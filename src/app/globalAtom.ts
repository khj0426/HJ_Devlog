import { atom } from 'recoil';
import type { ThemeType } from '@/@types/ThemeType';

export const themeState = atom<ThemeType>({
  key: 'THEME_STATE',
  default: 'light',
});

export const postSearchModalState = atom<boolean>({
  key: 'POST_SEARCH_MODAL_STATE',
  default: false,
});
