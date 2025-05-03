import { useEffect, MutableRefObject } from 'react';

export default function useClickAway<T extends MutableRefObject<any>>(
  ref: T,
  callback?: () => void,
  deps?: any[]
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback && callback();
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, callback, deps && [...deps]]);
}
