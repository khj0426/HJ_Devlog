import { useState, useEffect } from 'react';

export default function useScroll({
  target,
  options,
}: {
  target: HTMLElement | null;
  options: IntersectionObserverInit;
}) {
  const [isFetching, setIsFetching] = useState(false);
  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsFetching(true);
      }
    });
  };

  useEffect(() => {
    let observer;
    if (target instanceof HTMLElement) {
      observer = new IntersectionObserver(intersectionCallback, options);
      observer.observe(target);
    }
  }, [options, target]);

  return { isFetching };
}
