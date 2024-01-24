import type { ThemeType } from '@/@types/ThemeType';

import { atom, atomFamily, selectorFamily } from 'recoil';

import { POST_CONSTANT } from '@/constants/POST';

export const themeAtom = atom<ThemeType>({
  key: 'THEME_STATE',
  default: 'light',
});

export const postSearchModalAtom = atom<boolean>({
  key: 'POST_SEARCH_MODAL_STATE',
  default: false,
});

export const postCurPageNumberAtom = atom<number>({
  key: 'POST_PAGE_STATE',
  default: POST_CONSTANT.end,
});

export const modalState = atomFamily({
  key: 'MODAL_STATE',
  default: (id: string) => ({
    id,
    title: '',
    isOpen: false,
  }),
});

export const modalIdAtom = atom<string[]>({
  key: 'MODAL_ID_STATE',
  default: [],
});

export const modalSelectorFamily = selectorFamily({
  key: 'MODAL_STATE_FAMILY',
  get:
    (modalId: string) =>
    ({ get }) =>
      get(modalState(modalId)),

  set:
    (modalId: string) =>
    ({ set }, newModalInfo) => {
      set(modalState(modalId), newModalInfo);
      if ('id' in newModalInfo) {
        set(modalIdAtom, (prev) => Array.from([...prev, newModalInfo.id]));
      }
    },
});
