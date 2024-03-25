import { useEffect, useRef } from 'react';

export default function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  const timeOutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const id = setTimeout(callbackRef.current, delay);
    timeOutRef.current = id;
    return () => clearTimeout(id);
  }, [delay]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
}
