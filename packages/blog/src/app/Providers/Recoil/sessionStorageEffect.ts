import type { AtomEffect } from 'recoil';

export const sessionStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const savedValue = sessionStorage.getItem(key);

      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        if (isReset) {
          sessionStorage.removeItem(key);
        } else {
          sessionStorage.setItem(key, JSON.stringify(newValue));
        }
      });
    }
  };
