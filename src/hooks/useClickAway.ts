import { useEffect, useRef, useCallback } from 'react';

export default function useClickAway(callback: () => void, deps?: any[]) {
  const ref = useRef(null);

  const handleClickAway = useCallback(
    (e: MouseEvent) => {
      if (!ref || !ref.current) {
        return;
      }
      if (!(e.target as Node).contains(ref.current)) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.body.addEventListener('click', handleClickAway);
    return () => document.body.removeEventListener('click', handleClickAway);
  }, [deps, handleClickAway]);

  return { ref };
}
