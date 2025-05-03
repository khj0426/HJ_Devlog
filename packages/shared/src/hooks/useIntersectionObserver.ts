import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

interface observerProps {
  rootMargin?: string;
  threshold?: number;
  callback?: () => void;
}

export default function useIntersectionObserver({
  rootMargin,
  threshold,
  callback,
}: observerProps) {
  const target = useRef<HTMLDivElement | null>(null);
  const observerCallback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && callback) {
          callback();
        }
      });
    },
    []
  );

  useEffect(() => {
    if (!target || !target.current) {
      return;
    }
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin,
      threshold,
    });

    observer.observe(target.current);
    return () => observer.disconnect();
  }, [observerCallback, rootMargin, threshold]);
  return { target };
}
